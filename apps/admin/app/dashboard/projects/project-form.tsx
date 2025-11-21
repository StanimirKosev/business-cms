"use client";

import { Button } from "@repo/ui/components/button";
import { Input } from "@repo/ui/components/input";
import { Label } from "@repo/ui/components/label";
import { X, Upload } from "lucide-react";
import type { Project, Category, Client } from "@repo/database/client";
import { ProjectCoordinatePicker } from "./project-coordinate-picker";
import { DraggableImageItem } from "./draggable-image-item";
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
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";

interface SelectedImage {
  file: File;
  preview: string;
  cloudinaryId?: string;
}

interface ProjectFormProps {
  mode: "create" | "edit";
  formData: Partial<Project>;
  setFormData: (data: Partial<Project>) => void;
  selectedImages: SelectedImage[];
  existingImages: Array<{
    id: string;
    cloudinaryPublicId: string;
    order: number;
  }>;
  categories: Category[];
  clients: Client[];
  uploading: boolean;
  fileInputRef: React.RefObject<HTMLInputElement | null>;
  onGalleryImageSelect: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onRemoveImage: (index: number) => void;
  onRemoveExistingImage: (imageId: string) => void;
  onReorderExistingImages: (fromIndex: number, toIndex: number) => void;
  onReorderSelectedImages: (fromIndex: number, toIndex: number) => void;
  onSubmit: (e: React.FormEvent) => void;
  onCancel: () => void;
  regionNames: Record<string, string>;
  submitButtonText: string;
  submitButtonLoadingText: string;
  title: string;
}

export function ProjectForm({
  mode,
  formData,
  setFormData,
  selectedImages,
  existingImages,
  categories,
  clients,
  uploading,
  fileInputRef,
  onGalleryImageSelect,
  onRemoveImage,
  onRemoveExistingImage,
  onReorderExistingImages,
  onReorderSelectedImages,
  onSubmit,
  onCancel,
  regionNames,
  submitButtonText,
  submitButtonLoadingText,
  title,
}: ProjectFormProps) {
  const bgColor = mode === "create" ? "bg-white" : "bg-blue-50";
  const borderColor = mode === "create" ? "border-gray-200" : "border-blue-200";
  const borderTop = mode === "create" ? "" : "border-t-0";

  // dnd-kit sensors for image reordering
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  // Handle drag end for existing images
  const handleDragEndExistingImages = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    const activeIndex = existingImages.findIndex((img) => img.id === active.id);
    const overIndex = existingImages.findIndex((img) => img.id === over.id);

    if (activeIndex === -1 || overIndex === -1) return;

    onReorderExistingImages(activeIndex, overIndex);
  };

  // Handle drag end for selected images
  const handleDragEndSelectedImages = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    const activeIndex = selectedImages.findIndex(
      (_, idx) => idx.toString() === active.id
    );
    const overIndex = selectedImages.findIndex(
      (_, idx) => idx.toString() === over.id
    );

    if (activeIndex === -1 || overIndex === -1) return;

    onReorderSelectedImages(activeIndex, overIndex);
  };

  return (
    <div
      className={`${bgColor} p-6 rounded-lg shadow-sm border ${borderColor} ${borderTop}`}
    >
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-xl font-semibold">{title}</h3>
        <button
          onClick={onCancel}
          className="text-gray-500 hover:text-gray-700"
        >
          <X size={20} />
        </button>
      </div>

      <form onSubmit={onSubmit} className="space-y-6">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label className="text-sm font-semibold">
              Заглавие (БГ) <span className="text-red-500">*</span>
            </Label>
            <Input
              value={formData.titleBg || ""}
              onChange={(e) =>
                setFormData({ ...formData, titleBg: e.target.value })
              }
              placeholder="Заглавие на български"
              className="mt-1"
            />
          </div>
          <div>
            <Label className="text-sm font-semibold">
              Заглавие (EN) <span className="text-red-500">*</span>
            </Label>
            <Input
              value={formData.titleEn || ""}
              onChange={(e) =>
                setFormData({ ...formData, titleEn: e.target.value })
              }
              placeholder="Title in English"
              className="mt-1"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label className="text-sm font-semibold">
              Категория <span className="text-red-500">*</span>
            </Label>
            <select
              value={formData.categoryId || ""}
              onChange={(e) =>
                setFormData({ ...formData, categoryId: e.target.value })
              }
              className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md text-sm"
            >
              <option value="">Изберете категория</option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.titleBg}
                </option>
              ))}
            </select>
          </div>
          <div>
            <Label className="text-sm font-semibold">Клиент</Label>
            <select
              value={formData.clientId || ""}
              onChange={(e) =>
                setFormData({ ...formData, clientId: e.target.value })
              }
              className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md text-sm"
            >
              <option value="">Без клиент</option>
              {clients.map((client) => (
                <option key={client.id} value={client.id}>
                  {client.nameBg}
                </option>
              ))}
            </select>
          </div>
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
                  {uploading ? "Качване..." : "Кликни за избор на снимки"}
                </span>
              </div>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                multiple
                onChange={onGalleryImageSelect}
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
                  onDragEnd={handleDragEndExistingImages}
                >
                  <SortableContext
                    items={existingImages.map((img) => img.id)}
                    strategy={verticalListSortingStrategy}
                  >
                    <div className="space-y-2">
                      {existingImages.map((image) => (
                        <DraggableImageItem
                          key={image.id}
                          id={image.id}
                          imageUrl={`https://res.cloudinary.com/dn7bynzv7/image/upload/${image.cloudinaryPublicId}`}
                          fileName={image.cloudinaryPublicId.split("/").pop() || "image"}
                          order={image.order}
                          isFirstImage={image.order === 0}
                          onRemove={() => onRemoveExistingImage(image.id)}
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
                  onDragEnd={handleDragEndSelectedImages}
                >
                  <SortableContext
                    items={selectedImages.map((_, idx) => idx.toString())}
                    strategy={verticalListSortingStrategy}
                  >
                    <div className="space-y-2">
                      {selectedImages.map((image, index) => (
                        <DraggableImageItem
                          key={index}
                          id={index.toString()}
                          imageUrl={image.preview}
                          fileName={image.file.name}
                          order={index}
                          isFirstImage={index === 0 && existingImages.length === 0}
                          onRemove={() => onRemoveImage(index)}
                        />
                      ))}
                    </div>
                  </SortableContext>
                </DndContext>
              </div>
            )}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label className="text-sm font-semibold">
              Подзаглавие (БГ) <span className="text-red-500">*</span>
            </Label>
            <textarea
              value={formData.descriptionBg || ""}
              onChange={(e) =>
                setFormData({ ...formData, descriptionBg: e.target.value })
              }
              placeholder="Подзаглавие на български"
              className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md text-sm"
              rows={3}
            />
          </div>
          <div>
            <Label className="text-sm font-semibold">
              Подзаглавие (EN) <span className="text-red-500">*</span>
            </Label>
            <textarea
              value={formData.descriptionEn || ""}
              onChange={(e) =>
                setFormData({ ...formData, descriptionEn: e.target.value })
              }
              placeholder="Subtitle in English"
              className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md text-sm"
              rows={3}
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label className="text-sm font-semibold">Локация (БГ)</Label>
            <Input
              value={formData.locationBg || ""}
              onChange={(e) =>
                setFormData({ ...formData, locationBg: e.target.value })
              }
              placeholder="гр. София"
              className="mt-1"
            />
          </div>
          <div>
            <Label className="text-sm font-semibold">Локация (EN)</Label>
            <Input
              value={formData.locationEn || ""}
              onChange={(e) =>
                setFormData({ ...formData, locationEn: e.target.value })
              }
              placeholder="Sofia"
              className="mt-1"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label className="text-sm font-semibold">
              Характер на дейностите (БГ){" "}
              <span className="text-red-500">*</span>
            </Label>
            <textarea
              value={formData.workNatureBg || ""}
              onChange={(e) =>
                setFormData({ ...formData, workNatureBg: e.target.value })
              }
              placeholder="Обект"
              className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md text-sm"
              rows={3}
            />
          </div>
          <div>
            <Label className="text-sm font-semibold">
              Характер на дейностите (EN){" "}
              <span className="text-red-500">*</span>
            </Label>
            <textarea
              value={formData.workNatureEn || ""}
              onChange={(e) =>
                setFormData({ ...formData, workNatureEn: e.target.value })
              }
              placeholder="Site"
              className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md text-sm"
              rows={3}
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label className="text-sm font-semibold">
              Технически характеристики (БГ)
            </Label>
            <textarea
              value={formData.specificationsBg || ""}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  specificationsBg: e.target.value,
                })
              }
              placeholder="Технически характеристики"
              className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md text-sm"
              rows={4}
            />
          </div>
          <div>
            <Label className="text-sm font-semibold">
              Технически характеристики (EN)
            </Label>
            <textarea
              value={formData.specificationsEn || ""}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  specificationsEn: e.target.value,
                })
              }
              placeholder="Technical Specifications"
              className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md text-sm"
              rows={4}
            />
          </div>
        </div>

        <div>
          <Label className="text-sm font-semibold">Област</Label>
          <select
            value={formData.region || ""}
            onChange={(e) =>
              setFormData({ ...formData, region: e.target.value })
            }
            className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md text-sm"
          >
            <option value="">Без област</option>
            {Object.keys(regionNames).map((regionKey) => (
              <option key={regionKey} value={regionKey}>
                {regionKey}
              </option>
            ))}
          </select>
        </div>

        <ProjectCoordinatePicker
          mapX={formData.mapX ?? undefined}
          mapY={formData.mapY ?? undefined}
          region={formData.region || ""}
          onCoordinatesChange={(x, y) =>
            setFormData({ ...formData, mapX: x, mapY: y })
          }
        />

        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={formData.featured || false}
              onChange={(e) =>
                setFormData({ ...formData, featured: e.target.checked })
              }
              id="featured"
            />
            <Label htmlFor="featured" className="text-sm font-semibold">
              Покажи на начална страница - &quot;Нашите проекти&quot;
            </Label>
          </div>

          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={formData.published !== false}
              onChange={(e) =>
                setFormData({ ...formData, published: e.target.checked })
              }
              id="published"
            />
            <Label htmlFor="published" className="text-sm font-semibold">
              Публикувай на публичния сайт
            </Label>
          </div>
        </div>

        <Button type="submit" className="w-full" disabled={uploading}>
          {uploading ? submitButtonLoadingText : submitButtonText}
        </Button>
      </form>
    </div>
  );
}
