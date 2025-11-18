"use client";

import Image from "next/image";
import { Button } from "@repo/ui/components/button";
import { Input } from "@repo/ui/components/input";
import { Label } from "@repo/ui/components/label";
import { X, Upload, Trash2 } from "lucide-react";
import type { Project, Category, Client } from "@repo/database/client";
import { ProjectCoordinatePicker } from "./project-coordinate-picker";

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
  onMoveImage: (index: number, direction: "up" | "down") => void;
  onRemoveImage: (index: number) => void;
  onMoveExistingImage: (imageId: string, direction: "up" | "down") => void;
  onRemoveExistingImage: (imageId: string) => void;
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
  onMoveImage,
  onRemoveImage,
  onMoveExistingImage,
  onRemoveExistingImage,
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
                <div className="space-y-2">
                  {existingImages.map((image) => (
                    <div
                      key={image.id}
                      className="flex items-center gap-3 p-2 bg-blue-50 rounded-md border border-blue-200"
                    >
                      <div className="relative w-16 h-16 flex-shrink-0">
                        <Image
                          src={`https://res.cloudinary.com/dn7bynzv7/image/upload/${image.cloudinaryPublicId}`}
                          alt="Existing image"
                          fill
                          className="object-cover rounded-md"
                        />
                        {image.order === 0 && (
                          <div className="absolute top-1 left-1 bg-red-600 text-white text-xs px-2 py-1 rounded">
                            Корица
                          </div>
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm text-gray-700 truncate">
                          {image.cloudinaryPublicId.split("/").pop()}
                        </p>
                        <p className="text-xs text-gray-500">
                          Ред: {image.order}
                        </p>
                      </div>
                      <div className="flex items-center gap-1 flex-shrink-0">
                        {image.order > 0 && (
                          <button
                            type="button"
                            onClick={() => onMoveExistingImage(image.id, "up")}
                            className="p-1 text-gray-500 hover:text-gray-700"
                            title="Преместване нагоре"
                          >
                            ↑
                          </button>
                        )}
                        {image.order < existingImages.length - 1 && (
                          <button
                            type="button"
                            onClick={() =>
                              onMoveExistingImage(image.id, "down")
                            }
                            className="p-1 text-gray-500 hover:text-gray-700"
                            title="Преместване надолу"
                          >
                            ↓
                          </button>
                        )}
                        <button
                          type="button"
                          onClick={() => onRemoveExistingImage(image.id)}
                          className="p-1 text-red-500 hover:text-red-700"
                          title="Премахване"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {selectedImages.length > 0 && (
              <div className="space-y-2">
                <p className="text-xs text-gray-600 font-semibold">
                  Нови снимки ({selectedImages.length})
                </p>
                <div className="space-y-2">
                  {selectedImages.map((image, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-3 p-2 bg-gray-50 rounded-md"
                    >
                      <div className="relative w-16 h-16 flex-shrink-0">
                        <Image
                          src={image.preview}
                          alt={`Preview ${index + 1}`}
                          fill
                          className="object-cover rounded-md"
                        />
                        {index === 0 && existingImages.length === 0 && (
                          <div className="absolute top-1 left-1 bg-red-600 text-white text-xs px-2 py-1 rounded">
                            Корица
                          </div>
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm text-gray-700 truncate">
                          {image.file.name}
                        </p>
                        <p className="text-xs text-gray-500">
                          {(image.file.size / 1024).toFixed(1)} KB
                        </p>
                      </div>
                      <div className="flex items-center gap-1 flex-shrink-0">
                        {index > 0 && (
                          <button
                            type="button"
                            onClick={() => onMoveImage(index, "up")}
                            className="p-1 text-gray-500 hover:text-gray-700"
                            title="Преместване нагоре"
                          >
                            ↑
                          </button>
                        )}
                        {index < selectedImages.length - 1 && (
                          <button
                            type="button"
                            onClick={() => onMoveImage(index, "down")}
                            className="p-1 text-gray-500 hover:text-gray-700"
                            title="Преместване надолу"
                          >
                            ↓
                          </button>
                        )}
                        <button
                          type="button"
                          onClick={() => onRemoveImage(index)}
                          className="p-1 text-red-500 hover:text-red-700"
                          title="Премахване"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
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

        <Button type="submit" className="w-full" disabled={uploading}>
          {uploading ? submitButtonLoadingText : submitButtonText}
        </Button>
      </form>
    </div>
  );
}
