"use client";

import { useState, useRef } from "react";
import { Button } from "@repo/ui/components/button";
import { toast } from "sonner";
import { Plus, Trash2, Edit2, X } from "lucide-react";
import type { Project, Category, Client } from "@repo/database/client";
import { ProjectForm } from "./project-form";

const REGION_NAMES: Record<string, string> = {
  Sofia: "София",
  Plovdiv: "Пловдив",
  Varna: "Варна",
  Burgas: "Бургас",
  Ruse: "Русе",
  "Stara Zagora": "Стара Загора",
  Pleven: "Плевен",
  Sliven: "Сливен",
  Shumen: "Шумен",
  Haskovo: "Хасково",
  Yambol: "Ямбол",
  Gabrovo: "Габрово",
  Smolyan: "Смолян",
  Pernik: "Перник",
  Vidin: "Видин",
  Montana: "Монтана",
  Kyustendil: "Кюстендил",
  Blagoevgrad: "Благоевград",
  Silistra: "Силистра",
  Dobrich: "Добрич",
  Vratsa: "Враца",
  "Veliko Tarnovo": "Велико Търново",
  Kardzhali: "Кърджали",
  Pazardzhik: "Пазарджик",
  Lovech: "Ловеч",
  Razgrad: "Разград",
  Targovishte: "Търговище",
  "Sofia-City": "София-град",
};

interface SelectedImage {
  file: File;
  preview: string;
  cloudinaryId?: string;
}

interface ProjectsPageClientProps {
  initialProjects: (Project & {
    images?: Array<{ id: string; cloudinaryPublicId: string; order: number }>;
    category?: Category;
    client?: Client | null;
  })[];
  initialCategories: Category[];
  initialClients: Client[];
  projectsCutoffDate: Date;
}

export function ProjectsPageClient({
  initialProjects,
  initialCategories,
  initialClients,
  projectsCutoffDate,
}: ProjectsPageClientProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [projects, setProjects] = useState(initialProjects);
  const [categories] = useState(initialCategories);
  const [clients] = useState(initialClients);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState<Partial<Project>>({
    titleBg: "",
    titleEn: "",
    descriptionBg: "",
    descriptionEn: "",
    locationBg: "",
    locationEn: "",
    workNatureBg: "",
    workNatureEn: "",
    specificationsBg: "",
    specificationsEn: "",
    categoryId: "",
    clientId: "",
    heroImageUrl: "",
    region: "",
    mapX: undefined,
    mapY: undefined,
    featured: false,
  });
  const [selectedImages, setSelectedImages] = useState<SelectedImage[]>([]);
  const [uploading, setUploading] = useState(false);
  const [existingImages, setExistingImages] = useState<
    Array<{ id: string; cloudinaryPublicId: string; order: number }>
  >([]);

  const sanitizeFolderName = (name: string): string => {
    return name
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9\s-]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-")
      .replace(/^-|-$/g, "");
  };

  const generateSlug = (title: string): string => {
    const sanitized = sanitizeFolderName(title);
    const timestamp = Date.now().toString().slice(-6);
    return `${sanitized}-${timestamp}`;
  };

  const handleGalleryImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length === 0) return;

    if (!formData.titleEn?.trim()) {
      toast.error("Моля, попълнете заглавието на английски първо");
      return;
    }

    const newImages: SelectedImage[] = files.map((file) => ({
      file,
      preview: URL.createObjectURL(file),
    }));

    setSelectedImages([...selectedImages, ...newImages]);
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

  const moveExistingImage = (imageId: string, direction: "up" | "down") => {
    setExistingImages((prev) => {
      const index = prev.findIndex((img) => img.id === imageId);
      if (index === -1) return prev;

      const toIndex = direction === "up" ? index - 1 : index + 1;
      if (toIndex < 0 || toIndex >= prev.length) return prev;

      const updated = [...prev];
      [updated[index], updated[toIndex]] = [updated[toIndex], updated[index]];
      return updated.map((img, i) => ({ ...img, order: i }));
    });
  };

  const moveImage = (fromIndex: number, direction: "up" | "down") => {
    const toIndex = direction === "up" ? fromIndex - 1 : fromIndex + 1;
    if (toIndex < 0 || toIndex >= selectedImages.length) return;

    setSelectedImages((prev) => {
      const updated = [...prev];
      [updated[fromIndex], updated[toIndex]] = [
        updated[toIndex],
        updated[fromIndex],
      ];
      return updated;
    });
  };

  const uploadGalleryImages = async (): Promise<string[]> => {
    if (selectedImages.length === 0) {
      throw new Error("Трябва да изберете поне една снимка");
    }

    if (!formData.titleEn?.trim()) {
      throw new Error("Моля, попълнете заглавието на английски първо");
    }

    const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
    const folderName = sanitizeFolderName(formData.titleEn);
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
      formDataToUpload.append("folder", `projects/${folderName}`);

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
          `Upload failed for ${image.file.name}: ${errorData.error?.message || "Unknown error"}`
        );
      }

      const data = await response.json();
      return data.public_id as string;
    });

    const uploadedIds = await Promise.all(uploadPromises);
    return uploadedIds;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.titleBg?.trim()) {
      toast.error("Заглавие (БГ) е задължително");
      return;
    }

    if (!formData.titleEn?.trim()) {
      toast.error("Заглавие (EN) е задължително");
      return;
    }

    if (formData.titleBg?.trim() && !formData.titleEn?.trim()) {
      toast.error(
        "Заглавие (EN) е задължително, когато е попълнено заглавие (БГ)"
      );
      return;
    }

    if (formData.titleEn?.trim() && !formData.titleBg?.trim()) {
      toast.error(
        "Заглавие (БГ) е задължително, когато е попълнено заглавие (EN)"
      );
      return;
    }

    if (!formData.categoryId) {
      toast.error("Категория е задължителна");
      return;
    }

    if (selectedImages.length === 0 && !editingId) {
      toast.error("Трябва да изберете поне една снимка");
      return;
    }

    if (formData.titleBg.trim().length < 5) {
      toast.error("Заглавие (БГ) трябва да е поне 5 символа");
      return;
    }

    if (formData.titleEn.trim().length < 5) {
      toast.error("Заглавие (EN) трябва да е поне 5 символа");
      return;
    }

    if (!formData.workNatureBg?.trim()) {
      toast.error("Обект (БГ) е задължителен");
      return;
    }

    if (!formData.workNatureEn?.trim()) {
      toast.error("Site (EN) е задължителен");
      return;
    }

    if (formData.workNatureBg?.trim() && !formData.workNatureEn?.trim()) {
      toast.error("Site (EN) е задължителен, когато е попълнено (БГ)");
      return;
    }

    if (formData.workNatureEn?.trim() && !formData.workNatureBg?.trim()) {
      toast.error("Обект (БГ) е задължителен, когато е попълнено (EN)");
      return;
    }

    if (formData.descriptionBg?.trim() && !formData.descriptionEn?.trim()) {
      toast.error(
        "Подзаглавие (EN) е задължително, когато е попълнено подзаглавие (БГ)"
      );
      return;
    }

    if (formData.descriptionEn?.trim() && !formData.descriptionBg?.trim()) {
      toast.error(
        "Подзаглавие (БГ) е задължително, когато е попълнено подзаглавие (EN)"
      );
      return;
    }

    if (formData.locationBg?.trim() && !formData.locationEn?.trim()) {
      toast.error(
        "Локация (EN) е задължителна, когато е попълнена локация (БГ)"
      );
      return;
    }

    if (formData.locationEn?.trim() && !formData.locationBg?.trim()) {
      toast.error(
        "Локация (БГ) е задължителна, когато е попълнена локация (EN)"
      );
      return;
    }

    if (
      formData.specificationsBg?.trim() &&
      !formData.specificationsEn?.trim()
    ) {
      toast.error(
        "Технически характеристики (EN) е задължително, когато е попълнено в (БГ)"
      );
      return;
    }

    if (
      formData.specificationsEn?.trim() &&
      !formData.specificationsBg?.trim()
    ) {
      toast.error(
        "Технически характеристики (БГ) е задължително, когато е попълнено в (EN)"
      );
      return;
    }

    const hasMapData =
      formData.region?.trim() ||
      formData.locationBg?.trim() ||
      formData.locationEn?.trim() ||
      formData.mapX ||
      formData.mapY ||
      formData.clientId;

    if (hasMapData) {
      if (!formData.region?.trim()) {
        toast.error("Регион е задължителен, когато има географски данни");
        return;
      }
      if (!formData.locationBg?.trim()) {
        toast.error("Локация (БГ) е задължителна, когато има географски данни");
        return;
      }
      if (!formData.locationEn?.trim()) {
        toast.error("Локация (EN) е задължителна, когато има географски данни");
        return;
      }
      if (!formData.mapX) {
        toast.error("Координата X е задължителна, когато има географски данни");
        return;
      }
      if (!formData.mapY) {
        toast.error("Координата Y е задължителна, когато има географски данни");
        return;
      }
      if (!formData.clientId) {
        toast.error("Клиент е задължителен, когато има географски данни");
        return;
      }
    }

    try {
      setUploading(true);

      let uploadedImageIds: string[] = [];
      if (selectedImages.length > 0) {
        uploadedImageIds = await uploadGalleryImages();
      }

      const heroImageUrl = uploadedImageIds[0] || formData.heroImageUrl;

      const url = editingId ? `/api/projects/${editingId}` : "/api/projects";
      const method = editingId ? "PUT" : "POST";

      const slug = editingId
        ? formData.slug
        : generateSlug(formData.titleEn || "");

      const dataToSend = {
        titleBg: formData.titleBg,
        titleEn: formData.titleEn,
        slug,
        descriptionBg: formData.descriptionBg,
        descriptionEn: formData.descriptionEn,
        locationBg: formData.locationBg || null,
        locationEn: formData.locationEn || null,
        workNatureBg: formData.workNatureBg || null,
        workNatureEn: formData.workNatureEn || null,
        specificationsBg: formData.specificationsBg || null,
        specificationsEn: formData.specificationsEn || null,
        categoryId: formData.categoryId,
        clientId: formData.clientId || null,
        heroImageUrl,
        region: formData.region || undefined,
        mapX: formData.mapX || null,
        mapY: formData.mapY || null,
        featured: formData.featured,
      };

      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(dataToSend),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to save");
      }

      const savedProject = await response.json();
      const projectId = savedProject.id;

      if (editingId && projects) {
        const originalProject = projects.find((p) => p.id === editingId);
        if (originalProject && originalProject.images) {
          const originalImageIds = new Set(
            originalProject.images.map((img) => img.id)
          );
          const currentImageIds = new Set(existingImages.map((img) => img.id));

          for (const imageId of originalImageIds) {
            if (!currentImageIds.has(imageId)) {
              await fetch(`/api/projects/${projectId}/images`, {
                method: "DELETE",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ imageId }),
              });
            }
          }

          const reorderedImages = existingImages.filter((existingImage) => {
            const originalImage = originalProject.images?.find(
              (img) => img.id === existingImage.id
            );
            return originalImage && originalImage.order !== existingImage.order;
          });

          if (reorderedImages.length > 0) {
            const reorderResponse = await fetch(
              `/api/projects/${projectId}/images`,
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
                `Failed to update image order: ${reorderErrorData.details || reorderErrorData.error || "Unknown error"}`
              );
            }
          }
        }
      }

      if (uploadedImageIds.length > 0) {
        const baseOrder = existingImages.length;
        for (let i = 0; i < uploadedImageIds.length; i++) {
          const imgResponse = await fetch(`/api/projects/${projectId}/images`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              cloudinaryPublicId: uploadedImageIds[i],
              order: baseOrder + i,
            }),
          });

          if (!imgResponse.ok) {
            const imgErrorData = await imgResponse.json();
            throw new Error(
              `Failed to save image ${i + 1}: ${imgErrorData.details || imgErrorData.error || "Unknown error"}`
            );
          }
        }
      }

      try {
        const projectsResponse = await fetch("/api/projects");
        if (projectsResponse.ok) {
          const updatedProjects = await projectsResponse.json();
          setProjects(updatedProjects);
        }
      } catch (error) {
        console.error("Error refetching projects:", error);
        if (editingId) {
          setProjects(
            projects.map((p) => (p.id === editingId ? savedProject : p))
          );
        } else {
          setProjects([savedProject, ...projects]);
        }
      }

      if (editingId) {
        toast.success("Проект актуализиран");
      } else {
        toast.success("Проект създаден");
      }

      setEditingId(null);
      setShowForm(false);
      resetForm();
    } catch (error) {
      console.error("Error:", error);
      const errorMessage =
        error instanceof Error ? error.message : "Грешка при запазване";
      toast.error(errorMessage);
    } finally {
      setUploading(false);
    }
  };

  const handleEdit = (project: (typeof projects)[0]) => {
    setFormData(project);
    setEditingId(project.id);
    if (project.images && Array.isArray(project.images)) {
      setExistingImages(project.images);
    } else {
      setExistingImages([]);
    }
    setSelectedImages([]);
  };

  const resetForm = () => {
    setSelectedImages([]);
    setExistingImages([]);
    setFormData({
      titleBg: "",
      titleEn: "",
      descriptionBg: "",
      descriptionEn: "",
      locationBg: "",
      locationEn: "",
      workNatureBg: "",
      workNatureEn: "",
      specificationsBg: "",
      specificationsEn: "",
      categoryId: "",
      clientId: "",
      heroImageUrl: "",
      region: "",
      mapX: undefined,
      mapY: undefined,
      featured: false,
    });
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Сигурни ли сте?")) return;

    try {
      const response = await fetch(`/api/projects/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) throw new Error("Failed to delete");

      setProjects(projects.filter((p) => p.id !== id));
      toast.success("Проект изтрит");
    } catch (error) {
      console.error("Error:", error);
      toast.error("Грешка при изтриване");
    }
  };

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900">Проекти</h2>
        <Button
          onClick={() => {
            setEditingId(null);
            setShowForm(!showForm);
            if (showForm) {
              resetForm();
            }
          }}
          className="gap-2"
        >
          {showForm ? <X size={16} /> : <Plus size={16} />}
          {showForm ? "Отмени" : "Добави проект"}
        </Button>
      </div>

      {showForm && (
        <ProjectForm
          mode="create"
          formData={formData}
          setFormData={setFormData}
          selectedImages={selectedImages}
          existingImages={existingImages}
          categories={categories}
          clients={clients}
          uploading={uploading}
          fileInputRef={fileInputRef}
          onGalleryImageSelect={handleGalleryImageSelect}
          onMoveImage={moveImage}
          onRemoveImage={removeImage}
          onMoveExistingImage={moveExistingImage}
          onRemoveExistingImage={removeExistingImage}
          onSubmit={handleSubmit}
          onCancel={() => {
            setShowForm(false);
            resetForm();
          }}
          regionNames={REGION_NAMES}
          submitButtonText="Създай"
          submitButtonLoadingText="Зареждане..."
          title="Нов проект"
        />
      )}

      <div className="space-y-2 mb-8">
        {projects.map((project) => (
          <div key={project.id}>
            <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 flex justify-between items-start">
              <div className="flex-1">
                <h3 className="font-semibold text-gray-900">
                  {project.titleBg}
                </h3>
                <p className="text-sm text-gray-600">
                  Локация: {project.locationBg || "-"}
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  Код: {project.slug}
                </p>
                {project.featured && (
                  <span className="inline-block mt-2 px-2 py-1 bg-red-100 text-red-800 text-xs rounded">
                    Показан в начална страница - &quot;Нашите проекти&quot;
                  </span>
                )}
              </div>
              <div className="flex gap-2">
                <Button
                  onClick={() => handleEdit(project)}
                  size="sm"
                  variant="outline"
                  className="gap-1"
                >
                  <Edit2 size={14} />
                  Редактирай
                </Button>
                {new Date(project.createdAt) > projectsCutoffDate && (
                  <Button
                    onClick={() => handleDelete(project.id)}
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

            {editingId === project.id && (
              <ProjectForm
                mode="edit"
                formData={formData}
                setFormData={setFormData}
                selectedImages={selectedImages}
                existingImages={existingImages}
                categories={categories}
                clients={clients}
                uploading={uploading}
                fileInputRef={fileInputRef}
                onGalleryImageSelect={handleGalleryImageSelect}
                onMoveImage={moveImage}
                onRemoveImage={removeImage}
                onMoveExistingImage={moveExistingImage}
                onRemoveExistingImage={removeExistingImage}
                onSubmit={handleSubmit}
                onCancel={() => {
                  setEditingId(null);
                  resetForm();
                }}
                regionNames={REGION_NAMES}
                submitButtonText="Актуализирай"
                submitButtonLoadingText="Зареждане..."
                title="Редактирай проект"
              />
            )}
          </div>
        ))}

        {projects.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            Няма проекти. Добавете първи проект.
          </div>
        )}
      </div>
    </div>
  );
}
