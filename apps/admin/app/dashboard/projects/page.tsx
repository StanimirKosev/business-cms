"use client";

import { useEffect, useState, useRef } from "react";
import { Button } from "@repo/ui/components/button";
import { toast } from "sonner";
import { Plus, Trash2, Edit2, X } from "lucide-react";
import type { Project, Category, Client } from "@repo/database/client";
import { ProjectForm } from "./project-form";

// Cutoff date: projects created after this can be deleted by users
// Projects created before this are locked (created by you)
const PROJECTS_CUTOFF_DATE = new Date("2025-11-15T10:39:35.960Z");

// Region names (duplicated from @repo/website/lib/map-data for now)
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

export default function ProjectsPage() {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [projects, setProjects] = useState<Project[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [clients, setClients] = useState<Client[]>([]);
  const [loading, setLoading] = useState(true);
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

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [projectsRes, categoriesRes, clientsRes] = await Promise.all([
        fetch("/api/projects"),
        fetch("/api/categories"),
        fetch("/api/clients"),
      ]);

      if (projectsRes.ok) setProjects(await projectsRes.json());
      if (categoriesRes.ok) setCategories(await categoriesRes.json());
      if (clientsRes.ok) setClients(await clientsRes.json());
    } catch (error) {
      console.error("Error fetching data:", error);
      toast.error("Грешка при зареждане");
    } finally {
      setLoading(false);
    }
  };

  const sanitizeFolderName = (name: string): string => {
    return name
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9\s-]/g, "") // Remove special characters
      .replace(/\s+/g, "-") // Replace spaces with hyphens
      .replace(/-+/g, "-") // Replace multiple hyphens with single
      .replace(/^-|-$/g, ""); // Remove leading/trailing hyphens
  };

  const generateSlug = (title: string): string => {
    const sanitized = sanitizeFolderName(title);
    const timestamp = Date.now().toString().slice(-6); // Last 6 digits of timestamp
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
      // Clean up the preview URL
      URL.revokeObjectURL(prev[index].preview);
      return updated;
    });

    // Reset file input to allow re-selecting the same file
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
      // Update order numbers
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
    const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB limit

    const uploadPromises = selectedImages.map(async (image) => {
      if (image.cloudinaryId) {
        return image.cloudinaryId;
      }

      // Validate file size
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
        console.error(`Upload failed for ${image.file.name}:`, errorData);
        throw new Error(
          `Upload failed for ${image.file.name}: ${errorData.error?.message || "Unknown error"}`
        );
      }

      const data = await response.json();
      console.log(`Image uploaded:`, {
        public_id: data.public_id,
        secure_url: data.secure_url,
        url: data.url,
        path: data.path,
      });
      return data.public_id as string;
    });

    const uploadedIds = await Promise.all(uploadPromises);
    return uploadedIds;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate required fields
    if (!formData.titleBg?.trim()) {
      toast.error("Заглавие (БГ) е задължително");
      return;
    }

    if (!formData.titleEn?.trim()) {
      toast.error("Заглавие (EN) е задължително");
      return;
    }

    // Bilingual validation for title
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

    // Validate minimum length
    if (formData.titleBg.trim().length < 5) {
      toast.error("Заглавие (БГ) трябва да е поне 5 символа");
      return;
    }

    if (formData.titleEn.trim().length < 5) {
      toast.error("Заглавие (EN) трябва да е поне 5 символа");
      return;
    }

    // Validate workNature fields are mandatory
    if (!formData.workNatureBg?.trim()) {
      toast.error("Обект (БГ) е задължителен");
      return;
    }

    if (!formData.workNatureEn?.trim()) {
      toast.error("Site (EN) е задължителен");
      return;
    }

    // Bilingual validation for workNature
    if (formData.workNatureBg?.trim() && !formData.workNatureEn?.trim()) {
      toast.error("Site (EN) е задължителен, когато е попълнено (БГ)");
      return;
    }

    if (formData.workNatureEn?.trim() && !formData.workNatureBg?.trim()) {
      toast.error("Обект (БГ) е задължителен, когато е попълнено (EN)");
      return;
    }

    // Bilingual field validation: if one language is filled, the other must be filled too
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

    // Smart validation: if any map-related field is provided, all must be provided
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

      // Upload gallery images and get their public IDs
      let uploadedImageIds: string[] = [];
      if (selectedImages.length > 0) {
        uploadedImageIds = await uploadGalleryImages();
      }

      // First image becomes the hero image
      const heroImageUrl = uploadedImageIds[0] || formData.heroImageUrl;

      const url = editingId ? `/api/projects/${editingId}` : "/api/projects";
      const method = editingId ? "PUT" : "POST";

      // Auto-generate slug for new projects, keep existing slug for edits
      const slug = editingId
        ? formData.slug
        : generateSlug(formData.titleEn || "");

      // Explicitly define fields to send (for both POST and PUT)
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

      // If editing, handle existing images - delete removed ones and update order
      if (editingId && projects) {
        const originalProject = projects.find((p) => p.id === editingId) as
          | (Project & {
              images?: Array<{
                id: string;
                cloudinaryPublicId: string;
                order: number;
              }>;
            })
          | undefined;
        if (originalProject && originalProject.images) {
          const originalImageIds = new Set(
            originalProject.images.map((img) => img.id)
          );
          const currentImageIds = new Set(existingImages.map((img) => img.id));

          // Delete images that were removed
          for (const imageId of originalImageIds) {
            if (!currentImageIds.has(imageId)) {
              await fetch(`/api/projects/${projectId}/images`, {
                method: "DELETE",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ imageId }),
              });
            }
          }

          // Update order of existing images if any were reordered
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
              console.error("Failed to update image order:", reorderErrorData);
              throw new Error(
                `Failed to update image order: ${reorderErrorData.details || reorderErrorData.error || "Unknown error"}`
              );
            }
          }
        }
      }

      // Now create ProjectImage records for all uploaded images
      if (uploadedImageIds.length > 0) {
        const baseOrder = existingImages.length; // Start order after existing images
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
            console.error(`Failed to create ProjectImage ${i}:`, {
              status: imgResponse.status,
              response: imgErrorData,
              projectId: projectId,
              cloudinaryPublicId: uploadedImageIds[i],
            });
            throw new Error(
              `Failed to save image ${i + 1}: ${imgErrorData.details || imgErrorData.error || "Unknown error"}`
            );
          }
        }
      }

      // Refetch projects to get latest data with all relationships
      try {
        const projectsResponse = await fetch("/api/projects");
        if (projectsResponse.ok) {
          const updatedProjects = await projectsResponse.json();
          setProjects(updatedProjects);
        }
      } catch (error) {
        console.error("Error refetching projects:", error);
        // Fallback: update local state if refetch fails
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

  const handleEdit = (
    project: Project & {
      images?: Array<{ id: string; cloudinaryPublicId: string; order: number }>;
    }
  ) => {
    setFormData(project);
    setEditingId(project.id);
    // Load existing images for this project
    if (project.images && Array.isArray(project.images)) {
      setExistingImages(project.images);
    } else {
      setExistingImages([]);
    }
    // Clear any previously selected new images
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

  if (loading) return <div className="p-8">Зареждане...</div>;

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
                {new Date(project.createdAt) > PROJECTS_CUTOFF_DATE && (
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
