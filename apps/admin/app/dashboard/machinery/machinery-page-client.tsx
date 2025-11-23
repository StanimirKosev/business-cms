"use client";

import React, { useState, useRef } from "react";
import { Button } from "@repo/ui/components/button";
import { Input } from "@repo/ui/components/input";
import { Label } from "@repo/ui/components/label";
import { toast } from "sonner";
import { Plus, Trash2, X, ChevronDown, ChevronUp, Upload } from "lucide-react";
import type {
  MachineryCategory,
  MachineryModel,
  MachineryImage,
} from "@repo/database/client";
import { isRecordProtected } from "@/lib/constants";
import { DraggableMachineryImageItem } from "./draggable-machinery-image-item";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { DraggableItem } from "@/app/components/DraggableItem";

interface MachineryPageClientProps {
  initialCategories: (MachineryCategory & {
    models: MachineryModel[];
    images: MachineryImage[];
  })[];
}

interface SelectedImage {
  file: File;
  preview: string;
  cloudinaryId?: string;
}

export function MachineryPageClient({
  initialCategories,
}: MachineryPageClientProps) {
  const [categories, setCategories] = useState(
    initialCategories.sort(
      (a: (typeof initialCategories)[0], b: (typeof initialCategories)[0]) =>
        a.order - b.order
    )
  );
  const [editingCategoryId, setEditingCategoryId] = useState<string | null>(
    null
  );
  const [editingModelId, setEditingModelId] = useState<string | null>(null);
  const [showCategoryForm, setShowCategoryForm] = useState(false);
  const [showModelForm, setShowModelForm] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const [expandedCategories, setExpandedCategories] = useState<Set<string>>(
    new Set()
  );
  const fileInputRef = useRef<HTMLInputElement>(null);

  // dnd-kit sensors
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const [categoryFormData, setCategoryFormData] = useState<
    Partial<MachineryCategory>
  >({
    nameBg: "",
    nameEn: "",
    count: 0,
  });

  const [selectedImages, setSelectedImages] = useState<SelectedImage[]>([]);
  const [existingImages, setExistingImages] = useState<
    Array<{ id: string; cloudinaryPublicId: string; order: number }>
  >([]);

  const [modelFormData, setModelFormData] = useState<Partial<MachineryModel>>({
    nameBg: "",
    nameEn: "",
    count: 0,
    unit: "PIECES",
  });

  const toggleCategory = (id: string) => {
    const newExpanded = new Set(expandedCategories);
    if (newExpanded.has(id)) {
      newExpanded.delete(id);
    } else {
      newExpanded.add(id);
    }
    setExpandedCategories(newExpanded);
  };

  // Handle drag end for categories and models
  const handleDragEnd = async (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    const isModel =
      typeof active.id === "string" && active.id.startsWith("model-");

    if (isModel) {
      // Handle model reordering
      const activeParts = (active.id as string).split("-");
      const categoryId = activeParts.slice(1, -1).join("-");
      const modelId = activeParts[activeParts.length - 1];

      const overParts = (over.id as string).split("-");
      const overCategoryId = overParts.slice(1, -1).join("-");
      const overModelId = overParts[overParts.length - 1];

      // Only allow reordering within the same category
      if (categoryId !== overCategoryId) return;

      const categoryIndex = categories.findIndex((c) => c.id === categoryId);
      if (categoryIndex === -1) return;

      const category = categories[categoryIndex];
      const activeIndex = category.models.findIndex((m) => m.id === modelId);
      const overIndex = category.models.findIndex((m) => m.id === overModelId);

      if (activeIndex === -1 || overIndex === -1) return;

      // Store original state for rollback
      const originalCategories = categories;

      const newModels = arrayMove(category.models, activeIndex, overIndex);
      // Update the order field in each model
      const modelsWithUpdatedOrder = newModels.map((model, idx) => ({
        ...model,
        order: idx,
      }));
      const newCategories = categories.map((c) =>
        c.id === categoryId ? { ...c, models: modelsWithUpdatedOrder } : c
      );
      setCategories(newCategories);

      // Update order indices for models (for API call)
      const updates = modelsWithUpdatedOrder.map((model) => ({
        id: model.id,
        order: model.order,
      }));

      try {
        const response = await fetch(
          `/api/machinery/${categoryId}/models/reorder`,
          {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ updates }),
          }
        );

        if (!response.ok) {
          throw new Error("Failed to reorder models");
        }

        toast.success("Модел преместен");
      } catch (error) {
        console.error("Error reordering models:", error);
        toast.error("Грешка при преместване на модел");
        setCategories(originalCategories);
      }
    } else {
      // Handle category reordering
      const activeIndex = categories.findIndex((c) => c.id === active.id);
      const overIndex = categories.findIndex((c) => c.id === over.id);

      if (activeIndex === -1 || overIndex === -1) return;

      const newCategories = arrayMove(categories, activeIndex, overIndex);
      setCategories(newCategories);

      // Update order indices
      const updates = newCategories.map((category, idx) => ({
        id: category.id,
        order: idx,
      }));

      try {
        const response = await fetch("/api/machinery/reorder", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ updates }),
        });

        if (!response.ok) {
          throw new Error("Failed to reorder categories");
        }

        toast.success("Категория преместена");
      } catch (error) {
        console.error("Error reordering:", error);
        toast.error("Грешка при преместване на категория");
        setCategories(categories);
      }
    }
  };

  const handleGalleryImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    try {
      const files = Array.from(e.target.files || []);
      if (files.length === 0) return;

      const newImages: SelectedImage[] = files.map((file) => ({
        file,
        preview: URL.createObjectURL(file),
      }));

      setSelectedImages((prev) => [...prev, ...newImages]);
      toast.success(`${files.length} снимки избрани`);
    } catch (error) {
      console.error("Error selecting images:", error);
      toast.error("Грешка при избор на снимки");
    }
  };

  const removeImage = (index: number) => {
    setSelectedImages((prev) => {
      const updated = prev.filter((_, i) => i !== index);
      URL.revokeObjectURL(prev[index].preview);
      return updated;
    });

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const removeExistingImage = (imageId: string) => {
    setExistingImages((prev) => prev.filter((img) => img.id !== imageId));
  };

  const reorderExistingImages = (fromIndex: number, toIndex: number) => {
    setExistingImages((prev) => {
      const updated = arrayMove(prev, fromIndex, toIndex);
      return updated.map((img, i) => ({ ...img, order: i }));
    });
  };

  const reorderSelectedImages = (fromIndex: number, toIndex: number) => {
    setSelectedImages((prev) => arrayMove(prev, fromIndex, toIndex));
  };

  const uploadGalleryImages = async (): Promise<string[]> => {
    if (selectedImages.length === 0) {
      return [];
    }

    const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
    if (!cloudName) {
      throw new Error("Cloudinary configuration is missing");
    }

    const MAX_FILE_SIZE = 10 * 1024 * 1024;

    const uploadPromises = selectedImages.map(async (image) => {
      if (image.cloudinaryId) {
        return image.cloudinaryId;
      }

      if (image.file.size > MAX_FILE_SIZE) {
        throw new Error(
          `Файлът "${image.file.name}" е твърде голям. Максимален размер е 10MB.`
        );
      }

      const formDataToUpload = new FormData();
      formDataToUpload.append("file", image.file);
      formDataToUpload.append("upload_preset", "business_cms_projects");
      formDataToUpload.append("folder", `machinery/${Date.now()}`);

      const response = await fetch(
        `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
        {
          method: "POST",
          body: formDataToUpload,
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          `Грешка при качване на ${image.file.name}: ${errorData.error?.message || "Неизвестна грешка"}`
        );
      }

      const data = await response.json();
      return data.public_id as string;
    });

    const uploadedIds = await Promise.all(uploadPromises);
    return uploadedIds;
  };

  const handleCategorySubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (
      !categoryFormData.nameBg ||
      !categoryFormData.nameEn ||
      categoryFormData.count === undefined
    ) {
      toast.error("Попълнете всички необходими полета");
      return;
    }

    try {
      setUploading(true);

      let uploadedImageIds: string[] = [];
      if (selectedImages.length > 0) {
        uploadedImageIds = await uploadGalleryImages();
        if (uploadedImageIds.length === 0) {
          throw new Error("Грешка при качване на снимки");
        }
      }

      // Check: must have either existing images OR newly uploaded images
      const hasExistingImages = existingImages.length > 0;
      const hasNewImages = uploadedImageIds.length > 0;

      if (!hasExistingImages && !hasNewImages) {
        throw new Error("Необходима е поне една снимка");
      }

      const url = editingCategoryId
        ? `/api/machinery/${editingCategoryId}`
        : "/api/machinery";
      const method = editingCategoryId ? "PUT" : "POST";

      const dataToSubmit = {
        nameBg: categoryFormData.nameBg,
        nameEn: categoryFormData.nameEn,
        count: categoryFormData.count,
        order: categoryFormData.order ?? getSuggestedOrder(),
      };

      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(dataToSubmit),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to save");
      }

      const savedCategory = await response.json();
      const categoryId = savedCategory.id;

      // Handle image deletion for editing
      if (editingCategoryId && categories.length > 0) {
        const originalCategory = categories.find(
          (c) => c.id === editingCategoryId
        );
        if (originalCategory && originalCategory.images) {
          const originalImageIds = new Set(
            originalCategory.images.map((img) => img.id)
          );
          const currentImageIds = new Set(existingImages.map((img) => img.id));

          for (const imageId of originalImageIds) {
            if (!currentImageIds.has(imageId)) {
              try {
                const deleteResponse = await fetch(
                  `/api/machinery/${categoryId}/images`,
                  {
                    method: "DELETE",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ imageId }),
                  }
                );

                if (!deleteResponse.ok) {
                  const errorData = await deleteResponse.json();
                  throw new Error(errorData.error || "Failed to delete image");
                }
              } catch (error) {
                console.error("Error deleting image:", error);
                throw error;
              }
            }
          }

          const reorderedImages = existingImages.filter((existingImage) => {
            const originalImage = originalCategory.images?.find(
              (img) => img.id === existingImage.id
            );
            return originalImage && originalImage.order !== existingImage.order;
          });

          if (reorderedImages.length > 0) {
            const reorderResponse = await fetch(
              `/api/machinery/${categoryId}/images`,
              {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                  images: existingImages.map((img) => ({
                    id: img.id,
                    order: img.order,
                  })),
                }),
              }
            );

            if (!reorderResponse.ok) {
              const reorderErrorData = await reorderResponse.json();
              throw new Error(
                reorderErrorData.error || "Failed to update image order"
              );
            }
          }
        }
      }

      // Save new images
      if (uploadedImageIds.length > 0) {
        const baseOrder = existingImages.length;
        for (let i = 0; i < uploadedImageIds.length; i++) {
          const imgResponse = await fetch(
            `/api/machinery/${categoryId}/images`,
            {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                cloudinaryPublicId: uploadedImageIds[i],
                order: baseOrder + i,
              }),
            }
          );

          if (!imgResponse.ok) {
            const imgErrorData = await imgResponse.json();
            throw new Error(
              imgErrorData.error || `Failed to save image ${i + 1}`
            );
          }
        }
      }

      try {
        const categoriesResponse = await fetch("/api/machinery");
        if (categoriesResponse.ok) {
          const allCategories = await categoriesResponse.json();
          setCategories(
            allCategories.sort(
              (a: (typeof categories)[0], b: (typeof categories)[0]) =>
                a.order - b.order
            )
          );
        }
      } catch (error) {
        console.error("Error refetching categories:", error);
      }

      if (editingCategoryId) {
        toast.success("Категория актуализирана");
      } else {
        toast.success("Категория създадена");
      }

      setEditingCategoryId(null);
      setShowCategoryForm(false);
      resetCategoryForm();
    } catch (error) {
      console.error("Error:", error);
      const errorMessage =
        error instanceof Error ? error.message : "Грешка при запазване";
      toast.error(errorMessage);
    } finally {
      setUploading(false);
    }
  };

  const handleModelSubmit = async (e: React.FormEvent, categoryId: string) => {
    e.preventDefault();

    if (
      !modelFormData.nameBg ||
      !modelFormData.nameEn ||
      !modelFormData.count
    ) {
      toast.error("Попълнете всички необходими полета");
      return;
    }

    setUploading(true);
    try {
      const url = editingModelId
        ? `/api/machinery/${categoryId}/models/${editingModelId}`
        : `/api/machinery/${categoryId}/models`;
      const method = editingModelId ? "PUT" : "POST";

      // Find current category to get max order of models
      const currentCategory = categories.find((c) => c.id === categoryId);
      let newModelOrder = modelFormData.order;
      if (!editingModelId) {
        const models = currentCategory?.models || [];
        const maxModelOrder =
          models.length > 0 ? Math.max(...models.map((m) => m.order ?? 0)) : -1;
        newModelOrder = maxModelOrder + 1;
      }

      const dataToSubmit = {
        ...modelFormData,
        order: newModelOrder,
      };

      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(dataToSubmit),
      });

      if (!response.ok) throw new Error("Failed to save");

      const savedModel = await response.json();

      setCategories(
        categories.map((c) => {
          if (c.id === categoryId) {
            if (editingModelId) {
              return {
                ...c,
                models: c.models.map((m) =>
                  m.id === editingModelId ? savedModel : m
                ),
              };
            } else {
              return {
                ...c,
                models: [savedModel, ...c.models],
              };
            }
          }
          return c;
        })
      );

      if (editingModelId) {
        toast.success("Модел актуализиран");
      } else {
        toast.success("Модел създаден");
      }

      setEditingModelId(null);
      setShowModelForm(null);
      resetModelForm();
    } catch (error) {
      console.error("Error:", error);
      toast.error("Грешка при запазване");
    } finally {
      setUploading(false);
    }
  };

  const handleEditCategory = (
    category: MachineryCategory & { images: MachineryImage[] }
  ) => {
    setCategoryFormData(category);
    setEditingCategoryId(category.id);
    setShowCategoryForm(true);
    setSelectedImages([]);
    if (category.images && Array.isArray(category.images)) {
      setExistingImages(
        category.images.map((img) => ({
          id: img.id,
          cloudinaryPublicId: img.cloudinaryPublicId,
          order: img.order,
        }))
      );
    } else {
      setExistingImages([]);
    }
  };

  const handleEditModel = (model: MachineryModel) => {
    setModelFormData(model);
    setEditingModelId(model.id);
    setShowModelForm(null);
  };

  const handleDeleteCategory = async (id: string) => {
    if (!confirm("Сигурни ли сте?")) return;

    try {
      const response = await fetch(`/api/machinery/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) throw new Error("Failed to delete");

      setCategories(categories.filter((c) => c.id !== id));
      toast.success("Категория изтрита");
    } catch (error) {
      console.error("Error:", error);
      toast.error("Грешка при изтриване");
    }
  };

  const handleDeleteModel = async (categoryId: string, modelId: string) => {
    if (!confirm("Сигурни ли сте?")) return;

    try {
      const response = await fetch(
        `/api/machinery/${categoryId}/models/${modelId}`,
        {
          method: "DELETE",
        }
      );

      if (!response.ok) throw new Error("Failed to delete");

      setCategories(
        categories.map((c) =>
          c.id === categoryId
            ? {
                ...c,
                models: c.models.filter((m) => m.id !== modelId),
              }
            : c
        )
      );
      toast.success("Модел изтрит");
    } catch (error) {
      console.error("Error:", error);
      toast.error("Грешка при изтриване");
    }
  };

  const resetCategoryForm = () => {
    setCategoryFormData({
      nameBg: "",
      nameEn: "",
      count: 0,
    });
    setSelectedImages([]);
    setExistingImages([]);
  };

  const resetModelForm = () => {
    setModelFormData({
      nameBg: "",
      nameEn: "",
      count: 0,
      unit: "PIECES",
    });
  };

  const getSuggestedOrder = (): number => {
    if (categories.length === 0) return 0;
    const maxOrder = Math.max(...categories.map((c) => c.order ?? 0));
    return maxOrder + 1;
  };

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900">Механизация</h2>
        <Button
          onClick={() => {
            if (editingCategoryId) {
              setEditingCategoryId(null);
              setShowCategoryForm(true);
              resetCategoryForm();
            } else {
              setShowCategoryForm(!showCategoryForm);
              if (showCategoryForm) resetCategoryForm();
            }
          }}
          className="gap-2"
        >
          {showCategoryForm && !editingCategoryId ? (
            <X size={16} />
          ) : (
            <Plus size={16} />
          )}
          {showCategoryForm && !editingCategoryId
            ? "Отмени"
            : "Добави категория"}
        </Button>
      </div>

      {showCategoryForm && !editingCategoryId && (
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 mb-8">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-semibold">Нова категория</h3>
            <button
              onClick={() => {
                setShowCategoryForm(false);
                resetCategoryForm();
              }}
              className="text-gray-500 hover:text-gray-700"
            >
              <X size={20} />
            </button>
          </div>

          <form onSubmit={handleCategorySubmit} className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label className="text-sm font-semibold">
                  Име (БГ) <span className="text-red-500">*</span>
                </Label>
                <Input
                  value={categoryFormData.nameBg || ""}
                  onChange={(e) =>
                    setCategoryFormData({
                      ...categoryFormData,
                      nameBg: e.target.value,
                    })
                  }
                  placeholder="Име на български"
                  className="mt-1"
                  required
                />
              </div>
              <div>
                <Label className="text-sm font-semibold">
                  Име (EN) <span className="text-red-500">*</span>
                </Label>
                <Input
                  value={categoryFormData.nameEn || ""}
                  onChange={(e) =>
                    setCategoryFormData({
                      ...categoryFormData,
                      nameEn: e.target.value,
                    })
                  }
                  placeholder="Name in English"
                  className="mt-1"
                  required
                />
              </div>
            </div>

            <div>
              <Label className="text-sm font-semibold">
                Брой <span className="text-red-500">*</span>
              </Label>
              <Input
                type="number"
                value={categoryFormData.count ?? ""}
                onChange={(e) =>
                  setCategoryFormData({
                    ...categoryFormData,
                    count: e.target.value === "" ? 0 : parseInt(e.target.value),
                  })
                }
                className="mt-1"
                required
              />
            </div>

            <div>
              <Label className="text-sm font-semibold">
                Галерия снимки <span className="text-red-500">*</span>
              </Label>
              <div className="mt-1 space-y-3">
                <label className="flex items-center justify-center px-4 py-3 border-2 border-dashed border-gray-300 rounded-md cursor-pointer hover:border-gray-400 transition">
                  <div className="flex items-center gap-2">
                    <Upload size={18} className="text-gray-500" />
                    <span className="text-sm text-gray-600">
                      {uploading ? "Качване..." : "Кликни за избор на снимки"}
                    </span>
                  </div>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={handleGalleryImageSelect}
                    disabled={uploading}
                    className="hidden"
                  />
                </label>

                {existingImages.length > 0 && (
                  <div className="space-y-2">
                    <p className="text-xs text-gray-600 font-semibold">
                      Текущи снимки ({existingImages.length})
                    </p>
                    <DndContext
                      sensors={sensors}
                      collisionDetection={closestCenter}
                      onDragEnd={(event) => {
                        const { active, over } = event;
                        if (!over || active.id === over.id) return;

                        const activeIndex = existingImages.findIndex(
                          (img) => img.id === active.id
                        );
                        const overIndex = existingImages.findIndex(
                          (img) => img.id === over.id
                        );

                        if (activeIndex === -1 || overIndex === -1) return;
                        reorderExistingImages(activeIndex, overIndex);
                      }}
                    >
                      <SortableContext
                        items={existingImages.map((img) => img.id)}
                        strategy={verticalListSortingStrategy}
                      >
                        <div className="space-y-2">
                          {existingImages.map((image) => (
                            <DraggableMachineryImageItem
                              key={image.id}
                              id={image.id}
                              imageUrl={`https://res.cloudinary.com/dn7bynzv7/image/upload/${image.cloudinaryPublicId}`}
                              fileName={
                                image.cloudinaryPublicId.split("/").pop() ||
                                "image"
                              }
                              order={image.order}
                              onRemove={() => removeExistingImage(image.id)}
                            />
                          ))}
                        </div>
                      </SortableContext>
                    </DndContext>
                  </div>
                )}

                {selectedImages.length > 0 && (
                  <div className="space-y-2">
                    <p className="text-xs text-gray-600 font-semibold">
                      Нови снимки ({selectedImages.length})
                    </p>
                    <DndContext
                      sensors={sensors}
                      collisionDetection={closestCenter}
                      onDragEnd={(event) => {
                        const { active, over } = event;
                        if (!over || active.id === over.id) return;

                        const activeIndex = selectedImages.findIndex(
                          (_, idx) => idx.toString() === active.id
                        );
                        const overIndex = selectedImages.findIndex(
                          (_, idx) => idx.toString() === over.id
                        );

                        if (activeIndex === -1 || overIndex === -1) return;
                        reorderSelectedImages(activeIndex, overIndex);
                      }}
                    >
                      <SortableContext
                        items={selectedImages.map((_, idx) => idx.toString())}
                        strategy={verticalListSortingStrategy}
                      >
                        <div className="space-y-2">
                          {selectedImages.map((image, index) => (
                            <DraggableMachineryImageItem
                              key={index}
                              id={index.toString()}
                              imageUrl={image.preview}
                              fileName={image.file.name}
                              order={index}
                              onRemove={() => removeImage(index)}
                            />
                          ))}
                        </div>
                      </SortableContext>
                    </DndContext>
                  </div>
                )}
              </div>
            </div>

            <Button type="submit" disabled={uploading} className="w-full">
              {uploading ? "Запазване..." : "Създай"}
            </Button>
          </form>
        </div>
      )}

      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <SortableContext
          items={[
            ...categories.map((c) => c.id),
            ...categories.flatMap((c) =>
              c.models.map((m) => `model-${c.id}-${m.id}`)
            ),
          ]}
          strategy={verticalListSortingStrategy}
        >
          <div className="space-y-4">
            {categories.map((category) => (
              <DraggableItem
                key={category.id}
                id={category.id}
                isSelected={editingCategoryId === category.id}
              >
                <div className="flex justify-between items-start gap-4">
                  <div>
                    <h3 className="font-semibold text-gray-900">
                      {category.nameBg}
                    </h3>
                    <p className="text-sm text-gray-600">{category.nameEn}</p>
                    <p className="text-xs text-gray-500 mt-1">
                      Брой: {category.count} • Модели: {category.models.length}
                    </p>
                  </div>
                  <div className="flex gap-2 flex-shrink-0">
                    <Button
                      onClick={() => {
                        toggleCategory(category.id);
                        // Close edit form when opening show
                        if (
                          expandedCategories.has(category.id) &&
                          editingCategoryId === category.id
                        ) {
                          setEditingCategoryId(null);
                          setShowCategoryForm(false);
                          resetCategoryForm();
                        }
                      }}
                      size="sm"
                      variant="outline"
                      className="gap-1"
                    >
                      {expandedCategories.has(category.id) ? (
                        <ChevronUp size={14} />
                      ) : (
                        <ChevronDown size={14} />
                      )}
                      {expandedCategories.has(category.id) ? "Скрий" : "Покажи"}
                    </Button>
                    {editingCategoryId === category.id ? (
                      <Button
                        onClick={() => {
                          setEditingCategoryId(null);
                          setShowCategoryForm(false);
                          resetCategoryForm();
                          // Close everything
                          const newExpanded = new Set(expandedCategories);
                          newExpanded.delete(category.id);
                          setExpandedCategories(newExpanded);
                        }}
                        size="sm"
                        variant="outline"
                        className="gap-1"
                      >
                        <X size={14} />
                        Отмени
                      </Button>
                    ) : (
                      <Button
                        onClick={() => {
                          handleEditCategory(category);
                          // Close the models section when opening edit
                          const newExpanded = new Set(expandedCategories);
                          newExpanded.delete(category.id);
                          setExpandedCategories(newExpanded);
                        }}
                        size="sm"
                        variant="outline"
                        className="gap-1"
                      >
                        Редактирай
                      </Button>
                    )}
                    {!isRecordProtected(category.createdAt) && (
                      <Button
                        onClick={() => handleDeleteCategory(category.id)}
                        size="sm"
                        variant="outline"
                        className="gap-1 text-red-600 hover:text-red-700"
                      >
                        <Trash2 size={14} />
                        Изтрий
                      </Button>
                    )}
                  </div>
                </div>
                {expandedCategories.has(category.id) && (
                  <div className="mt-3 border-t border-gray-200 pt-4 space-y-4 bg-gray-50 -mx-4 -mb-4 px-4 pb-4">
                    <div className="flex justify-between items-center pb-3 border-b border-gray-200">
                      <h4 className="font-semibold text-gray-900 text-base">
                        Модели
                      </h4>
                      <Button
                        onClick={() => {
                          setEditingModelId(null);
                          setShowModelForm(
                            showModelForm === category.id ? null : category.id
                          );
                          if (showModelForm === category.id) {
                            resetModelForm();
                          } else {
                            resetModelForm();
                          }
                        }}
                        size="sm"
                        className="gap-1"
                      >
                        {showModelForm === category.id && !editingModelId ? (
                          <>
                            <X size={14} />
                            Откажи
                          </>
                        ) : (
                          <>
                            <Plus size={14} />
                            Добави модел
                          </>
                        )}
                      </Button>
                    </div>

                    {showModelForm === category.id && !editingModelId && (
                      <div className="bg-white p-4 rounded border border-gray-300 mt-2">
                        <div className="flex justify-between items-center mb-4">
                          <h5 className="font-semibold">Нов модел</h5>
                          <button
                            onClick={() => {
                              setShowModelForm(null);
                              setEditingModelId(null);
                              resetModelForm();
                            }}
                            className="text-gray-500 hover:text-gray-700"
                          >
                            <X size={16} />
                          </button>
                        </div>

                        <form
                          onSubmit={(e) => handleModelSubmit(e, category.id)}
                          className="space-y-4"
                        >
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <Label className="text-sm font-semibold">
                                Име (БГ)
                              </Label>
                              <Input
                                value={modelFormData.nameBg || ""}
                                onChange={(e) =>
                                  setModelFormData({
                                    ...modelFormData,
                                    nameBg: e.target.value,
                                  })
                                }
                                placeholder="Име на български"
                                className="mt-1"
                              />
                            </div>
                            <div>
                              <Label className="text-sm font-semibold">
                                Име (EN)
                              </Label>
                              <Input
                                value={modelFormData.nameEn || ""}
                                onChange={(e) =>
                                  setModelFormData({
                                    ...modelFormData,
                                    nameEn: e.target.value,
                                  })
                                }
                                placeholder="Name in English"
                                className="mt-1"
                              />
                            </div>
                          </div>

                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <Label className="text-sm font-semibold">
                                Брой
                              </Label>
                              <Input
                                type="number"
                                value={modelFormData.count || 0}
                                onChange={(e) =>
                                  setModelFormData({
                                    ...modelFormData,
                                    count: parseInt(e.target.value),
                                  })
                                }
                                className="mt-1"
                              />
                            </div>
                            <div>
                              <Label className="text-sm font-semibold">
                                Мерна единица
                              </Label>
                              <select
                                value={modelFormData.unit || "PIECES"}
                                onChange={(e) =>
                                  setModelFormData({
                                    ...modelFormData,
                                    unit: e.target.value as
                                      | "PIECES"
                                      | "SQUARE_METERS",
                                  })
                                }
                                className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md text-sm"
                              >
                                <option value="PIECES">бр. (Pieces)</option>
                                <option value="SQUARE_METERS">
                                  м² (Square Meters)
                                </option>
                              </select>
                            </div>
                          </div>

                          <Button
                            type="submit"
                            disabled={uploading}
                            className="w-full"
                          >
                            {uploading ? "Запазване..." : "Създай"}
                          </Button>
                        </form>
                      </div>
                    )}

                    <div className="space-y-3 mt-3">
                      {category.models.length === 0 ? (
                        <p className="text-sm text-gray-500 py-4 text-center">
                          Няма модели. Добавете първи модел.
                        </p>
                      ) : (
                        category.models
                          .sort(
                            (a: MachineryModel, b: MachineryModel) =>
                              a.order - b.order
                          )
                          .map((model) => (
                            <DraggableItem
                              key={model.id}
                              id={`model-${category.id}-${model.id}`}
                              isSelected={editingModelId === model.id}
                            >
                              <div className="flex justify-between items-start gap-2">
                                <div className="flex-1">
                                  <h5 className="font-semibold text-sm">
                                    {model.nameBg}
                                  </h5>
                                  <p className="text-xs text-gray-600">
                                    {model.nameEn}
                                  </p>
                                  <p className="text-xs text-gray-500 mt-1">
                                    {model.count}{" "}
                                    {model.unit === "PIECES" ? "бр." : "м²"} •
                                    Ред:{" "}
                                    <span className="text-gray-400">
                                      {model.order + 1}
                                    </span>
                                  </p>
                                </div>
                                <div className="flex gap-1">
                                  {editingModelId === model.id ? (
                                    <Button
                                      onClick={() => {
                                        setEditingModelId(null);
                                        setShowModelForm(null);
                                        resetModelForm();
                                      }}
                                      size="sm"
                                      variant="outline"
                                      className="gap-1"
                                    >
                                      <X size={12} />
                                    </Button>
                                  ) : (
                                    <Button
                                      onClick={() => {
                                        handleEditModel(model);
                                        setShowModelForm(category.id);
                                      }}
                                      size="sm"
                                      variant="outline"
                                      className="gap-1"
                                    >
                                      Редактирай
                                    </Button>
                                  )}
                                  <Button
                                    onClick={() =>
                                      handleDeleteModel(category.id, model.id)
                                    }
                                    size="sm"
                                    variant="outline"
                                    className="text-red-600 hover:text-red-700"
                                  >
                                    <Trash2 size={12} />
                                  </Button>
                                </div>
                              </div>

                              {editingModelId === model.id && (
                                <div className="bg-gray-100 p-4 rounded border border-gray-300 border-t-0 rounded-t-none">
                                  <div className="flex justify-between items-center mb-4">
                                    <h5 className="font-semibold">
                                      Редактирай модел
                                    </h5>
                                    <Button
                                      onClick={() => {
                                        setEditingModelId(null);
                                        setShowModelForm(null);
                                        resetModelForm();
                                      }}
                                      size="sm"
                                      variant="outline"
                                      className="gap-1"
                                    >
                                      <X size={12} />
                                      Откажи
                                    </Button>
                                  </div>

                                  <form
                                    onSubmit={(e) =>
                                      handleModelSubmit(e, category.id)
                                    }
                                    className="space-y-4"
                                  >
                                    <div className="grid grid-cols-2 gap-4">
                                      <div>
                                        <Label className="text-sm font-semibold">
                                          Име (БГ)
                                        </Label>
                                        <Input
                                          value={modelFormData.nameBg || ""}
                                          onChange={(e) =>
                                            setModelFormData({
                                              ...modelFormData,
                                              nameBg: e.target.value,
                                            })
                                          }
                                          placeholder="Име на български"
                                          className="mt-1"
                                        />
                                      </div>
                                      <div>
                                        <Label className="text-sm font-semibold">
                                          Име (EN)
                                        </Label>
                                        <Input
                                          value={modelFormData.nameEn || ""}
                                          onChange={(e) =>
                                            setModelFormData({
                                              ...modelFormData,
                                              nameEn: e.target.value,
                                            })
                                          }
                                          placeholder="Name in English"
                                          className="mt-1"
                                        />
                                      </div>
                                    </div>

                                    <div className="grid grid-cols-2 gap-4">
                                      <div>
                                        <Label className="text-sm font-semibold">
                                          Брой
                                        </Label>
                                        <Input
                                          type="number"
                                          value={modelFormData.count || 0}
                                          onChange={(e) =>
                                            setModelFormData({
                                              ...modelFormData,
                                              count: parseInt(e.target.value),
                                            })
                                          }
                                          className="mt-1"
                                        />
                                      </div>
                                      <div>
                                        <Label className="text-sm font-semibold">
                                          Мерна единица
                                        </Label>
                                        <select
                                          value={modelFormData.unit || "PIECES"}
                                          onChange={(e) =>
                                            setModelFormData({
                                              ...modelFormData,
                                              unit: e.target.value as
                                                | "PIECES"
                                                | "SQUARE_METERS",
                                            })
                                          }
                                          className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md text-sm"
                                        >
                                          <option value="PIECES">
                                            бр. (Pieces)
                                          </option>
                                          <option value="SQUARE_METERS">
                                            м² (Square Meters)
                                          </option>
                                        </select>
                                      </div>
                                    </div>

                                    <Button
                                      type="submit"
                                      disabled={uploading}
                                      className="w-full"
                                    >
                                      {uploading
                                        ? "Запазване..."
                                        : "Актуализирай"}
                                    </Button>
                                  </form>
                                </div>
                              )}
                            </DraggableItem>
                          ))
                      )}
                    </div>
                  </div>
                )}

                {editingCategoryId === category.id && (
                  <div className="bg-blue-50 p-6 rounded-lg shadow-sm border border-blue-200 border-t-0 rounded-t-none">
                    <div className="flex justify-between items-center mb-6">
                      <h3 className="text-xl font-semibold">
                        Редактирай категория
                      </h3>
                      <button
                        onClick={() => {
                          setEditingCategoryId(null);
                          setShowCategoryForm(false);
                          resetCategoryForm();
                        }}
                        className="text-gray-500 hover:text-gray-700"
                      >
                        <X size={20} />
                      </button>
                    </div>

                    <form onSubmit={handleCategorySubmit} className="space-y-6">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label className="text-sm font-semibold">
                            Име (БГ) <span className="text-red-500">*</span>
                          </Label>
                          <Input
                            value={categoryFormData.nameBg || ""}
                            onChange={(e) =>
                              setCategoryFormData({
                                ...categoryFormData,
                                nameBg: e.target.value,
                              })
                            }
                            placeholder="Име на български"
                            className="mt-1"
                            required
                          />
                        </div>
                        <div>
                          <Label className="text-sm font-semibold">
                            Име (EN) <span className="text-red-500">*</span>
                          </Label>
                          <Input
                            value={categoryFormData.nameEn || ""}
                            onChange={(e) =>
                              setCategoryFormData({
                                ...categoryFormData,
                                nameEn: e.target.value,
                              })
                            }
                            placeholder="Name in English"
                            className="mt-1"
                            required
                          />
                        </div>
                      </div>

                      <div>
                        <Label className="text-sm font-semibold">
                          Брой <span className="text-red-500">*</span>
                        </Label>
                        <Input
                          type="number"
                          value={categoryFormData.count ?? ""}
                          onChange={(e) =>
                            setCategoryFormData({
                              ...categoryFormData,
                              count:
                                e.target.value === ""
                                  ? 0
                                  : parseInt(e.target.value),
                            })
                          }
                          className="mt-1"
                          required
                        />
                      </div>

                      <div>
                        <Label className="text-sm font-semibold">
                          Галерия снимки
                        </Label>
                        <div className="mt-1 space-y-3">
                          <label className="flex items-center justify-center px-4 py-3 border-2 border-dashed border-gray-300 rounded-md cursor-pointer hover:border-gray-400 transition">
                            <div className="flex items-center gap-2">
                              <Upload size={18} className="text-gray-500" />
                              <span className="text-sm text-gray-600">
                                {uploading
                                  ? "Качване..."
                                  : "Кликни за избор на снимки"}
                              </span>
                            </div>
                            <input
                              ref={fileInputRef}
                              type="file"
                              accept="image/*"
                              multiple
                              onChange={handleGalleryImageSelect}
                              disabled={uploading}
                              className="hidden"
                            />
                          </label>

                          {existingImages.length > 0 && (
                            <div className="space-y-2">
                              <p className="text-xs text-gray-600 font-semibold">
                                Текущи снимки ({existingImages.length})
                              </p>
                              <DndContext
                                sensors={sensors}
                                collisionDetection={closestCenter}
                                onDragEnd={(event) => {
                                  const { active, over } = event;
                                  if (!over || active.id === over.id) return;

                                  const activeIndex = existingImages.findIndex(
                                    (img) => img.id === active.id
                                  );
                                  const overIndex = existingImages.findIndex(
                                    (img) => img.id === over.id
                                  );

                                  if (activeIndex === -1 || overIndex === -1)
                                    return;
                                  reorderExistingImages(activeIndex, overIndex);
                                }}
                              >
                                <SortableContext
                                  items={existingImages.map((img) => img.id)}
                                  strategy={verticalListSortingStrategy}
                                >
                                  <div className="space-y-2">
                                    {existingImages.map((image) => (
                                      <DraggableMachineryImageItem
                                        key={image.id}
                                        id={image.id}
                                        imageUrl={`https://res.cloudinary.com/dn7bynzv7/image/upload/${image.cloudinaryPublicId}`}
                                        fileName={
                                          image.cloudinaryPublicId
                                            .split("/")
                                            .pop() || "image"
                                        }
                                        order={image.order}
                                        onRemove={() =>
                                          removeExistingImage(image.id)
                                        }
                                      />
                                    ))}
                                  </div>
                                </SortableContext>
                              </DndContext>
                            </div>
                          )}

                          {selectedImages.length > 0 && (
                            <div className="space-y-2">
                              <p className="text-xs text-gray-600 font-semibold">
                                Нови снимки ({selectedImages.length})
                              </p>
                              <DndContext
                                sensors={sensors}
                                collisionDetection={closestCenter}
                                onDragEnd={(event) => {
                                  const { active, over } = event;
                                  if (!over || active.id === over.id) return;

                                  const activeIndex = selectedImages.findIndex(
                                    (_, idx) => idx.toString() === active.id
                                  );
                                  const overIndex = selectedImages.findIndex(
                                    (_, idx) => idx.toString() === over.id
                                  );

                                  if (activeIndex === -1 || overIndex === -1)
                                    return;
                                  reorderSelectedImages(activeIndex, overIndex);
                                }}
                              >
                                <SortableContext
                                  items={selectedImages.map((_, idx) =>
                                    idx.toString()
                                  )}
                                  strategy={verticalListSortingStrategy}
                                >
                                  <div className="space-y-2">
                                    {selectedImages.map((image, index) => (
                                      <DraggableMachineryImageItem
                                        key={index}
                                        id={index.toString()}
                                        imageUrl={image.preview}
                                        fileName={image.file.name}
                                        order={index}
                                        onRemove={() => removeImage(index)}
                                      />
                                    ))}
                                  </div>
                                </SortableContext>
                              </DndContext>
                            </div>
                          )}
                        </div>
                      </div>

                      <Button
                        type="submit"
                        disabled={uploading}
                        className="w-full"
                      >
                        {uploading ? "Запазване..." : "Актуализирай"}
                      </Button>
                    </form>
                  </div>
                )}
              </DraggableItem>
            ))}

            {categories.length === 0 && (
              <div className="text-center py-8 text-gray-500">
                Няма категории. Добавете първа категория.
              </div>
            )}
          </div>
        </SortableContext>
      </DndContext>
    </div>
  );
}
