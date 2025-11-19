"use client";

import { useState, useRef } from "react";
import { Button } from "@repo/ui/components/button";
import { toast } from "sonner";
import { Plus, Trash2, Edit2, X } from "lucide-react";
import type { Project, Category, Client } from "@repo/database/client";
import { isRecordProtected } from "@/lib/constants";
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
  categorizedProjects: Array<{
    category: Category;
    projects: (Project & {
      images?: Array<{ id: string; cloudinaryPublicId: string; order: number }>;
      category?: Category;
      client?: Client | null;
    })[];
  }>;
  initialCategories: Category[];
  initialClients: Client[];
}

export function ProjectsPageClient({
  categorizedProjects,
  initialCategories,
  initialClients,
}: ProjectsPageClientProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [projects, setProjects] = useState<typeof categorizedProjects>(
    categorizedProjects
  );
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
    order: 0,
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
    try {
      const files = Array.from(e.target.files || []);
      if (files.length === 0) return;

      if (!formData.titleEn?.trim()) {
        toast.error("Моля, попълнете заглавието на английски първо");
        // Reset file input so onChange fires again on next attempt
        if (fileInputRef.current) {
          fileInputRef.current.value = "";
        }
        return;
      }

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

  const moveProject = async (
    projectId: string,
    direction: "up" | "down",
    categoryId: string
  ) => {
    // Find the category group
    const categoryGroupIndex = projects.findIndex(
      (cg) => cg.category.id === categoryId
    );
    if (categoryGroupIndex === -1) return;

    const categoryGroup = projects[categoryGroupIndex];
    const projectIndex = categoryGroup.projects.findIndex(
      (p) => p.id === projectId
    );
    if (projectIndex === -1) return;

    const toIndex = direction === "up" ? projectIndex - 1 : projectIndex + 1;
    if (toIndex < 0 || toIndex >= categoryGroup.projects.length) return;

    // Keep original state for potential revert
    const originalProjects = projects;

    // Swap the projects locally
    const updated = [...projects];
    const updatedProjects = [...categoryGroup.projects];
    [updatedProjects[projectIndex], updatedProjects[toIndex]] = [
      updatedProjects[toIndex],
      updatedProjects[projectIndex],
    ];

    // Update order values
    const updates = [
      { id: updatedProjects[projectIndex].id, order: projectIndex },
      { id: updatedProjects[toIndex].id, order: toIndex },
    ];

    updated[categoryGroupIndex] = {
      ...categoryGroup,
      projects: updatedProjects,
    };

    setProjects(updated);

    // Send to API
    try {
      const response = await fetch("/api/projects/reorder", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ updates }),
      });

      if (!response.ok) {
        throw new Error("Failed to reorder projects");
      }
    } catch (error) {
      console.error("Error reordering:", error);
      toast.error("Грешка при преместване на проект");
      // Revert changes using original state
      setProjects(originalProjects);
    }
  };

  const uploadGalleryImages = async (): Promise<string[]> => {
    if (!formData.titleEn?.trim()) {
      throw new Error("Моля, попълнете заглавието на английски първо");
    }

    if (selectedImages.length === 0) {
      return [];
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

    if (formData.titleBg.trim().length < 5) {
      toast.error("Заглавие (БГ) трябва да е поне 5 символа");
      return;
    }

    if (formData.titleEn.trim().length < 5) {
      toast.error("Заглавие (EN) трябва да е поне 5 символа");
      return;
    }

    if (!formData.workNatureBg?.trim()) {
      toast.error("Характер на дейностите (БГ) е задължителен");
      return;
    }

    if (!formData.workNatureEn?.trim()) {
      toast.error("Характер на дейностите (EN) е задължителен");
      return;
    }

    if (formData.workNatureBg?.trim() && !formData.workNatureEn?.trim()) {
      toast.error(
        "Характер на дейностите (EN) е задължителен, когато е попълнено (БГ)"
      );
      return;
    }

    if (formData.workNatureEn?.trim() && !formData.workNatureBg?.trim()) {
      toast.error(
        "Характер на дейностите (БГ) е задължителен, когато е попълнено (EN)"
      );
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
      (formData.mapX !== undefined && formData.mapX !== null) ||
      (formData.mapY !== undefined && formData.mapY !== null);

    if (hasMapData) {
      if (!formData.region?.trim()) {
        toast.error("Област е задължителен, когато има географски данни");
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
      if (formData.mapX === undefined || formData.mapX === null) {
        toast.error("Координат X е задължителна, когато има географски данни");
        return;
      }
      if (formData.mapY === undefined || formData.mapY === null) {
        toast.error("Координат Y е задължителна, когато има географски данни");
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

      // Determine hero image: prioritize in order
      // 1. First uploaded image (if new images added)
      // 2. First existing image (if reordering existing images)
      // 3. Keep current hero image (if neither uploaded nor reordered)
      // If no images at all, hero image becomes undefined
      let heroImageUrl: string | undefined;
      if (uploadedImageIds.length > 0) {
        heroImageUrl = uploadedImageIds[0];
      } else if (existingImages.length > 0) {
        heroImageUrl = existingImages[0].cloudinaryPublicId;
      } else {
        heroImageUrl = formData.heroImageUrl || undefined;
      }

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
        published: formData.published,
        order: formData.order || 0,
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

      if (editingId && projects.length > 0) {
        let originalProject;
        for (const categoryGroup of projects) {
          const found = categoryGroup.projects.find((p) => p.id === editingId);
          if (found) {
            originalProject = found;
            break;
          }
        }

        if (originalProject && originalProject.images) {
          const originalImageIds = new Set(
            originalProject.images.map(
              (img: { id: string; cloudinaryPublicId: string; order: number }) =>
                img.id
            )
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
              (img: { id: string; cloudinaryPublicId: string; order: number }) =>
                img.id === existingImage.id
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
          const allProjects = await projectsResponse.json();

          // Regroup projects by category
          const projectsByCategory = allProjects.reduce(
            (acc: Record<string, typeof allProjects>, project: typeof allProjects[0]) => {
              const categoryId = project.categoryId;
              if (!acc[categoryId]) {
                acc[categoryId] = [];
              }
              acc[categoryId].push(project);
              return acc;
            },
            {}
          );

          const regrouped = categories.map((category) => ({
            category,
            projects: (projectsByCategory[category.id] || []).sort(
              (a: typeof allProjects[0], b: typeof allProjects[0]) => a.order - b.order
            ),
          }));
          setProjects(regrouped);
        }
      } catch (error) {
        console.error("Error refetching projects:", error);
        // Fallback: update the project in the existing structure
        if (editingId) {
          setProjects(
            projects.map((categoryGroup) => ({
              ...categoryGroup,
              projects: categoryGroup.projects.map((p) =>
                p.id === editingId ? savedProject : p
              ),
            }))
          );
        } else {
          // Add to appropriate category
          setProjects(
            projects.map((categoryGroup) => {
              if (categoryGroup.category.id === savedProject.categoryId) {
                return {
                  ...categoryGroup,
                  projects: [savedProject, ...categoryGroup.projects],
                };
              }
              return categoryGroup;
            })
          );
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

  const handleEdit = (
    project: (typeof projects)[0]["projects"][0]
  ) => {
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
      order: 0,
    });
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Сигурни ли сте?")) return;

    try {
      const response = await fetch(`/api/projects/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) throw new Error("Failed to delete");

      setProjects(
        projects.map((categoryGroup) => ({
          ...categoryGroup,
          projects: categoryGroup.projects.filter((p) => p.id !== id),
        }))
      );
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

      <div className="space-y-8 mb-8">
        {projects.map((categoryGroup) => (
          <div key={categoryGroup.category.id}>
            <h3 className="text-xl font-bold text-gray-900 mb-4 pb-2 border-b border-gray-300">
              {categoryGroup.category.titleBg}
            </h3>

            {categoryGroup.projects.length === 0 ? (
              <div className="text-center py-6 text-gray-500 bg-gray-50 rounded-lg">
                Няма проекти в тази категория
              </div>
            ) : (
              <div className="space-y-2">
                {categoryGroup.projects.map((project, projectIndex) => (
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
                        <div className="flex flex-wrap gap-2 mt-2">
                          {project.featured && (
                            <span className="inline-block px-2 py-1 bg-red-100 text-red-800 text-xs rounded">
                              Показан в начална страница - &quot;Нашите проекти&quot;
                            </span>
                          )}
                          {project.published === false && (
                            <span className="inline-block px-2 py-1 bg-gray-200 text-gray-800 text-xs rounded">
                              Скрит от публичния сайт
                            </span>
                          )}
                        </div>
                      </div>
                      <div className="flex gap-2">
                        {/* Reorder arrows */}
                        <Button
                          onClick={() =>
                            moveProject(project.id, "up", categoryGroup.category.id)
                          }
                          size="sm"
                          variant="outline"
                          disabled={projectIndex === 0}
                          title="Премести нагоре"
                          className="gap-1"
                        >
                          ↑
                        </Button>
                        <Button
                          onClick={() =>
                            moveProject(
                              project.id,
                              "down",
                              categoryGroup.category.id
                            )
                          }
                          size="sm"
                          variant="outline"
                          disabled={
                            projectIndex === categoryGroup.projects.length - 1
                          }
                          title="Премести надолу"
                          className="gap-1"
                        >
                          ↓
                        </Button>

                        {editingId === project.id ? (
                          <Button
                            onClick={() => {
                              setEditingId(null);
                              resetForm();
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
                            onClick={() => handleEdit(project)}
                            size="sm"
                            variant="outline"
                            className="gap-1"
                          >
                            <Edit2 size={14} />
                            Редактирай
                          </Button>
                        )}
                        {!isRecordProtected(project.createdAt) && (
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
              </div>
            )}
          </div>
        ))}

        {projects.every((cg) => cg.projects.length === 0) && (
          <div className="text-center py-8 text-gray-500">
            Няма проекти. Добавете първи проект.
          </div>
        )}
      </div>
    </div>
  );
}
