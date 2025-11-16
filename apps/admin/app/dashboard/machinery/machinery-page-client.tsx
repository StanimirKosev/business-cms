"use client";

import { useState, useRef } from "react";
import { Button } from "@repo/ui/components/button";
import { Input } from "@repo/ui/components/input";
import { Label } from "@repo/ui/components/label";
import { toast } from "sonner";
import { Plus, Trash2, X, ChevronDown, ChevronUp, Upload } from "lucide-react";
import type { MachineryCategory, MachineryModel } from "@repo/database/client";
import { isRecordProtected } from "@/lib/constants";

interface MachineryPageClientProps {
  initialCategories: (MachineryCategory & { models: MachineryModel[] })[];
}

interface SelectedImage {
  file: File;
  preview: string;
}

export function MachineryPageClient({
  initialCategories,
}: MachineryPageClientProps) {
  const [categories, setCategories] = useState(initialCategories);
  const [editingCategoryId, setEditingCategoryId] = useState<string | null>(
    null
  );
  const [editingModelId, setEditingModelId] = useState<string | null>(null);
  const [showCategoryForm, setShowCategoryForm] = useState(false);
  const [showModelForm, setShowModelForm] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const [expandedCategories, setExpandedCategories] = useState<
    Set<string>
  >(new Set());
  const [selectedImage, setSelectedImage] = useState<SelectedImage | null>(
    null
  );
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [categoryFormData, setCategoryFormData] = useState<
    Partial<MachineryCategory>
  >({
    nameBg: "",
    nameEn: "",
    count: 0,
    imageUrl: "",
  });

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

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      setSelectedImage({
        file,
        preview: event.target?.result as string,
      });
    };
    reader.readAsDataURL(file);

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const uploadImageToCloudinary = async () => {
    if (!selectedImage) return categoryFormData.imageUrl;

    const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
    const MAX_FILE_SIZE = 10 * 1024 * 1024;

    if (selectedImage.file.size > MAX_FILE_SIZE) {
      throw new Error(
        `Файлът "${selectedImage.file.name}" е твърде голям. Максимален размер е 10MB.`
      );
    }

    const formDataToUpload = new FormData();
    formDataToUpload.append("file", selectedImage.file);
    formDataToUpload.append("upload_preset", "business_cms_projects");
    formDataToUpload.append(
      "public_id",
      `machinery/${Date.now()}-${selectedImage.file.name.split(".")[0]}`
    );

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
        `Upload failed for ${selectedImage.file.name}: ${
          errorData.error?.message || "Unknown error"
        }`
      );
    }

    const data = await response.json();
    return data.public_id as string;
  };

  const handleCategorySubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (
      !categoryFormData.nameBg ||
      !categoryFormData.nameEn ||
      categoryFormData.count === undefined ||
      (!categoryFormData.imageUrl && !selectedImage)
    ) {
      toast.error("Попълнете всички необходими полета");
      return;
    }

    setUploading(true);
    try {
      let uploadedImageUrl = categoryFormData.imageUrl;

      if (selectedImage) {
        uploadedImageUrl = await uploadImageToCloudinary();
      }

      const url = editingCategoryId
        ? `/api/machinery/${editingCategoryId}`
        : "/api/machinery";
      const method = editingCategoryId ? "PUT" : "POST";

      let newOrder = categoryFormData.order;
      if (!editingCategoryId) {
        const maxOrder = categories.length > 0
          ? Math.max(...categories.map((c) => c.order ?? 0))
          : -1;
        newOrder = maxOrder + 1;
      }

      const dataToSubmit = {
        nameBg: categoryFormData.nameBg,
        nameEn: categoryFormData.nameEn,
        count: categoryFormData.count,
        imageUrl: uploadedImageUrl,
        order: newOrder,
      };

      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(dataToSubmit),
      });

      if (!response.ok) throw new Error("Failed to save");

      const savedCategory = await response.json();

      if (editingCategoryId) {
        setCategories(
          categories.map((c) =>
            c.id === editingCategoryId
              ? { ...savedCategory, models: c.models }
              : c
          )
        );
        toast.success("Категория актуализирана");
      } else {
        setCategories([
          { ...savedCategory, models: [] },
          ...categories,
        ]);
        toast.success("Категория създадена");
      }

      setEditingCategoryId(null);
      setShowCategoryForm(false);
      resetCategoryForm();
    } catch (error) {
      console.error("Error:", error);
      toast.error("Грешка при запазване");
    } finally {
      setUploading(false);
    }
  };

  const handleModelSubmit = async (e: React.FormEvent, categoryId: string) => {
    e.preventDefault();

    if (!modelFormData.nameBg || !modelFormData.nameEn || !modelFormData.count) {
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
        const maxModelOrder = models.length > 0
          ? Math.max(...models.map((m) => m.order ?? 0))
          : -1;
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

  const handleEditCategory = (category: MachineryCategory) => {
    setCategoryFormData(category);
    setEditingCategoryId(category.id);
    setShowCategoryForm(true);
    setSelectedImage(null);
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
      imageUrl: "",
    });
    setSelectedImage(null);
  };

  const resetModelForm = () => {
    setModelFormData({
      nameBg: "",
      nameEn: "",
      count: 0,
      unit: "PIECES",
    });
  };

  const removeSelectedImage = () => {
    setSelectedImage(null);
  };

  const removeCurrentImage = () => {
    setCategoryFormData({ ...categoryFormData, imageUrl: "" });
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

      {(showCategoryForm || editingCategoryId) && (
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 mb-8">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-semibold">
              {editingCategoryId
                ? "Редактирай категория"
                : "Нова категория"}
            </h3>
            <button
              onClick={() => {
                setShowCategoryForm(false);
                setEditingCategoryId(null);
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
                Снимка <span className="text-red-500">*</span>
              </Label>
              <div className="mt-1 space-y-3">
                <label className="flex items-center justify-center px-4 py-3 border-2 border-dashed border-gray-300 rounded-md cursor-pointer hover:border-gray-400 transition">
                  <div className="flex items-center gap-2">
                    <Upload size={18} className="text-gray-500" />
                    <span className="text-sm text-gray-600">
                      {uploading ? "Качване..." : "Кликни за избор на снимка"}
                    </span>
                  </div>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleImageSelect}
                    disabled={uploading}
                    className="hidden"
                  />
                </label>

                {selectedImage && (
                  <div className="flex items-center gap-3 p-2 bg-gray-50 rounded-md">
                    <div className="w-16 h-16 flex-shrink-0 rounded-md overflow-hidden bg-white flex items-center justify-center">
                      <img
                        src={selectedImage.preview}
                        alt="Image preview"
                        className="w-full h-full object-contain"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-gray-700 truncate">
                        {selectedImage.file.name}
                      </p>
                      <p className="text-xs text-gray-500">
                        {(selectedImage.file.size / 1024).toFixed(1)} KB
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={removeSelectedImage}
                      className="p-1 text-red-500 hover:text-red-700 flex-shrink-0"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                )}

                {categoryFormData.imageUrl && !selectedImage && (
                  <div className="flex items-center gap-3 p-2 bg-blue-50 rounded-md border border-blue-200">
                    <div className="w-16 h-16 flex-shrink-0 rounded-md overflow-hidden bg-white flex items-center justify-center">
                      <img
                        src={`https://res.cloudinary.com/dn7bynzv7/image/upload/${categoryFormData.imageUrl}`}
                        alt="Current image"
                        className="w-full h-full object-contain"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-gray-700">Текуща снимка</p>
                    </div>
                    <button
                      type="button"
                      onClick={removeCurrentImage}
                      className="p-1 text-red-500 hover:text-red-700 flex-shrink-0"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                )}
              </div>
            </div>

            <Button type="submit" disabled={uploading} className="w-full">
              {uploading
                ? "Запазване..."
                : editingCategoryId
                  ? "Актуализирай"
                  : "Създай"}
            </Button>
          </form>
        </div>
      )}

      <div className="space-y-4">
        {categories.map((category) => (
          <div
            key={category.id}
            className="bg-white rounded-lg shadow-sm border border-gray-200"
          >
            <div className="p-4 flex justify-between items-start">
              <div className="flex-1">
                <h3 className="font-semibold text-gray-900">
                  {category.nameBg}
                </h3>
                <p className="text-sm text-gray-600">{category.nameEn}</p>
                <p className="text-xs text-gray-500 mt-1">
                  Брой: {category.count} • Модели: {category.models.length}
                </p>
              </div>
              <div className="flex gap-2">
                <Button
                  onClick={() => toggleCategory(category.id)}
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
                    onClick={() => handleEditCategory(category)}
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
              <div className="border-t border-gray-200 p-4 space-y-4 bg-gray-50">
                <div className="flex justify-between items-center">
                  <h4 className="font-semibold text-gray-800">Модели</h4>
                  <Button
                    onClick={() => {
                      setShowModelForm(category.id);
                      setEditingModelId(null);
                      resetModelForm();
                    }}
                    size="sm"
                    className="gap-1"
                  >
                    <Plus size={14} />
                    Добави модел
                  </Button>
                </div>

                {showModelForm === category.id && (
                  <div className="bg-white p-4 rounded border border-gray-300">
                    <div className="flex justify-between items-center mb-4">
                      <h5 className="font-semibold">
                        {editingModelId ? "Редактирай модел" : "Нов модел"}
                      </h5>
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
                          <Label className="text-sm font-semibold">Брой</Label>
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
                        {uploading
                          ? "Запазване..."
                          : editingModelId
                            ? "Актуализирай"
                            : "Създай"}
                      </Button>
                    </form>
                  </div>
                )}

                <div className="space-y-2">
                  {category.models.length === 0 ? (
                    <p className="text-sm text-gray-500">
                      Няма модели. Добавете първи модел.
                    </p>
                  ) : (
                    category.models.map((model) => (
                      <div
                        key={model.id}
                        className="bg-white p-3 rounded border border-gray-200 flex justify-between items-start"
                      >
                        <div className="flex-1">
                          <h5 className="font-semibold text-sm">
                            {model.nameBg}
                          </h5>
                          <p className="text-xs text-gray-600">
                            {model.nameEn}
                          </p>
                          <p className="text-xs text-gray-500 mt-1">
                            {model.count}{" "}
                            {model.unit === "PIECES" ? "бр." : "м²"}
                          </p>
                        </div>
                        <div className="flex gap-1">
                          {editingModelId === model.id ? (
                            <Button
                              onClick={() => {
                                setEditingModelId(null);
                                setShowModelForm(category.id);
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
                    ))
                  )}
                </div>
              </div>
            )}
          </div>
        ))}

        {categories.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            Няма категории. Добавете първа категория.
          </div>
        )}
      </div>
    </div>
  );
}
