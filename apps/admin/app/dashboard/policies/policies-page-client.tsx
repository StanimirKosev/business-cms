"use client";

import { useState, useRef } from "react";
import { Button } from "@repo/ui/components/button";
import { Input } from "@repo/ui/components/input";
import { Label } from "@repo/ui/components/label";
import { toast } from "sonner";
import { Plus, Trash2, X, Upload } from "lucide-react";
import type { Policy } from "@repo/database/client";
import { isRecordProtected } from "@/lib/constants";

interface SelectedFile {
  file: File;
  preview: string;
  language: "bg" | "en";
}

interface PoliciesPageClientProps {
  initialPolicies: Policy[];
}

export function PoliciesPageClient({
  initialPolicies,
}: PoliciesPageClientProps) {
  const [policies, setPolicies] = useState(initialPolicies);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState<SelectedFile[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [formData, setFormData] = useState<Partial<Policy>>({
    titleBg: "",
    titleEn: "",
    subtitleBg: "",
    subtitleEn: "",
    cloudinaryPublicIdBg: "",
    cloudinaryPublicIdEn: "",
  });

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const language = (e.currentTarget.dataset.language as "bg" | "en") || "bg";

    // Only allow PDF files
    if (file.type !== "application/pdf") {
      toast.error("Моля, изберете PDF файл");
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      setSelectedFiles((prev) => {
        const filtered = prev.filter((f) => f.language !== language);
        return [
          ...filtered,
          {
            file,
            preview: `${file.name}`,
            language,
          },
        ];
      });
    };
    reader.readAsDataURL(file);

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const uploadFileToCloudinary = async (
    file: File,
    language: "bg" | "en"
  ) => {
    const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
    const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB for PDFs

    if (file.size > MAX_FILE_SIZE) {
      throw new Error(
        `Файлът "${file.name}" е твърде голям. Максимален размер е 10MB.`
      );
    }

    const formDataToUpload = new FormData();
    formDataToUpload.append("file", file);
    formDataToUpload.append("upload_preset", "business_cms_projects");
    formDataToUpload.append(
      "public_id",
      `policies/${language}-${Date.now()}-${file.name.split(".")[0]}`
    );
    formDataToUpload.append("resource_type", "auto");

    const response = await fetch(
      `https://api.cloudinary.com/v1_1/${cloudName}/upload`,
      {
        method: "POST",
        body: formDataToUpload,
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(
        `Upload failed for ${file.name}: ${
          errorData.error?.message || "Unknown error"
        }`
      );
    }

    const data = await response.json();
    return data.public_id as string;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (
      !formData.titleBg?.trim() ||
      !formData.titleEn?.trim() ||
      !formData.subtitleBg?.trim() ||
      !formData.subtitleEn?.trim() ||
      (!formData.cloudinaryPublicIdBg && !selectedFiles.find((f) => f.language === "bg")) ||
      (!formData.cloudinaryPublicIdEn && !selectedFiles.find((f) => f.language === "en"))
    ) {
      toast.error("Попълнете всички необходими полета");
      return;
    }

    setUploading(true);
    try {
      let uploadedIdBg = formData.cloudinaryPublicIdBg;
      let uploadedIdEn = formData.cloudinaryPublicIdEn;

      const fileBg = selectedFiles.find((f) => f.language === "bg");
      const fileEn = selectedFiles.find((f) => f.language === "en");

      if (fileBg) {
        uploadedIdBg = await uploadFileToCloudinary(fileBg.file, "bg");
      }

      if (fileEn) {
        uploadedIdEn = await uploadFileToCloudinary(fileEn.file, "en");
      }

      // Calculate new order for new policies
      let newOrder = formData.order;
      if (!editingId) {
        const maxOrder = policies.length > 0
          ? Math.max(...policies.map((p) => p.order ?? 0))
          : -1;
        newOrder = maxOrder + 1;
      }

      const dataToSend = {
        titleBg: formData.titleBg,
        titleEn: formData.titleEn,
        subtitleBg: formData.subtitleBg,
        subtitleEn: formData.subtitleEn,
        cloudinaryPublicIdBg: uploadedIdBg,
        cloudinaryPublicIdEn: uploadedIdEn,
        order: newOrder,
      };

      const url = editingId ? `/api/policies/${editingId}` : "/api/policies";
      const method = editingId ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(dataToSend),
      });

      if (!response.ok) throw new Error("Failed to save");

      const savedPolicy = await response.json();

      if (editingId) {
        setPolicies(policies.map((p) => (p.id === editingId ? savedPolicy : p)));
        toast.success("Политика актуализирана");
      } else {
        setPolicies([savedPolicy, ...policies]);
        toast.success("Политика създадена");
      }

      setEditingId(null);
      setShowForm(false);
      resetForm();
    } catch (error) {
      console.error("Error:", error);
      toast.error("Грешка при запазване");
    } finally {
      setUploading(false);
    }
  };

  const handleEdit = (policy: Policy) => {
    setFormData(policy);
    setEditingId(policy.id);
    setShowForm(true);
    setSelectedFiles([]);
  };

  const resetForm = () => {
    setFormData({
      titleBg: "",
      titleEn: "",
      subtitleBg: "",
      subtitleEn: "",
      cloudinaryPublicIdBg: "",
      cloudinaryPublicIdEn: "",
    });
    setSelectedFiles([]);
  };

  const removeSelectedFile = (language: "bg" | "en") => {
    setSelectedFiles((prev) => prev.filter((f) => f.language !== language));
  };

  const removeCurrentFile = (language: "bg" | "en") => {
    if (language === "bg") {
      setFormData({ ...formData, cloudinaryPublicIdBg: "" });
    } else {
      setFormData({ ...formData, cloudinaryPublicIdEn: "" });
    }
  };

  const handleDeletePolicy = async (id: string) => {
    if (!confirm("Сигурни ли сте?")) return;

    try {
      const response = await fetch(`/api/policies/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) throw new Error("Failed to delete");

      setPolicies(policies.filter((p) => p.id !== id));
      toast.success("Политика изтрита");
    } catch (error) {
      console.error("Error:", error);
      toast.error("Грешка при изтриване");
    }
  };

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900">Политики</h2>
        <Button
          onClick={() => {
            if (editingId) {
              setEditingId(null);
              setShowForm(true);
              resetForm();
            } else {
              setShowForm(!showForm);
              if (showForm) resetForm();
            }
          }}
          className="gap-2"
        >
          {showForm && !editingId ? <X size={16} /> : <Plus size={16} />}
          {showForm && !editingId ? "Отмени" : "Добави политика"}
        </Button>
      </div>

      {showForm && !editingId && (
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 mb-8">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-semibold">Нова политика</h3>
            <button
              onClick={() => {
                setShowForm(false);
                resetForm();
              }}
              className="text-gray-500 hover:text-gray-700"
            >
              <X size={20} />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
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
                  required
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
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label className="text-sm font-semibold">
                  Подзаглавие (БГ) <span className="text-red-500">*</span>
                </Label>
                <Input
                  value={formData.subtitleBg || ""}
                  onChange={(e) =>
                    setFormData({ ...formData, subtitleBg: e.target.value })
                  }
                  placeholder="Подзаглавие на български"
                  className="mt-1"
                  required
                />
              </div>
              <div>
                <Label className="text-sm font-semibold">
                  Подзаглавие (EN) <span className="text-red-500">*</span>
                </Label>
                <Input
                  value={formData.subtitleEn || ""}
                  onChange={(e) =>
                    setFormData({ ...formData, subtitleEn: e.target.value })
                  }
                  placeholder="Subtitle in English"
                  className="mt-1"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label className="text-sm font-semibold">
                  PDF/Документ (БГ) <span className="text-red-500">*</span>
                </Label>
                <div className="mt-1 space-y-3">
                  <label className="flex items-center justify-center px-4 py-3 border-2 border-dashed border-gray-300 rounded-md cursor-pointer hover:border-gray-400 transition">
                    <div className="flex items-center gap-2">
                      <Upload size={18} className="text-gray-500" />
                      <span className="text-sm text-gray-600">
                        {uploading ? "Качване..." : "Кликни за избор"}
                      </span>
                    </div>
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept=".pdf"
                      onChange={handleFileSelect}
                      disabled={uploading}
                      data-language="bg"
                      className="hidden"
                    />
                  </label>

                  {selectedFiles.find((f) => f.language === "bg") && (
                    <div className="flex items-center gap-3 p-2 bg-gray-50 rounded-md">
                      <div className="flex-1 min-w-0">
                        <p className="text-sm text-gray-700 truncate">
                          {selectedFiles.find((f) => f.language === "bg")?.preview}
                        </p>
                      </div>
                      <button
                        type="button"
                        onClick={() => removeSelectedFile("bg")}
                        className="p-1 text-red-500 hover:text-red-700 flex-shrink-0"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  )}

                  {formData.cloudinaryPublicIdBg && !selectedFiles.find((f) => f.language === "bg") && (
                    <div className="flex items-center gap-3 p-2 bg-blue-50 rounded-md border border-blue-200">
                      <div className="flex-1 min-w-0">
                        <p className="text-sm text-gray-700">Текущ документ (БГ)</p>
                      </div>
                      <button
                        type="button"
                        onClick={() => removeCurrentFile("bg")}
                        className="p-1 text-red-500 hover:text-red-700 flex-shrink-0"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  )}
                </div>
              </div>

              <div>
                <Label className="text-sm font-semibold">
                  PDF/Документ (EN) <span className="text-red-500">*</span>
                </Label>
                <div className="mt-1 space-y-3">
                  <label className="flex items-center justify-center px-4 py-3 border-2 border-dashed border-gray-300 rounded-md cursor-pointer hover:border-gray-400 transition">
                    <div className="flex items-center gap-2">
                      <Upload size={18} className="text-gray-500" />
                      <span className="text-sm text-gray-600">
                        {uploading ? "Качване..." : "Кликни за избор"}
                      </span>
                    </div>
                    <input
                      type="file"
                      accept=".pdf"
                      onChange={handleFileSelect}
                      disabled={uploading}
                      data-language="en"
                      className="hidden"
                    />
                  </label>

                  {selectedFiles.find((f) => f.language === "en") && (
                    <div className="flex items-center gap-3 p-2 bg-gray-50 rounded-md">
                      <div className="flex-1 min-w-0">
                        <p className="text-sm text-gray-700 truncate">
                          {selectedFiles.find((f) => f.language === "en")?.preview}
                        </p>
                      </div>
                      <button
                        type="button"
                        onClick={() => removeSelectedFile("en")}
                        className="p-1 text-red-500 hover:text-red-700 flex-shrink-0"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  )}

                  {formData.cloudinaryPublicIdEn && !selectedFiles.find((f) => f.language === "en") && (
                    <div className="flex items-center gap-3 p-2 bg-blue-50 rounded-md border border-blue-200">
                      <div className="flex-1 min-w-0">
                        <p className="text-sm text-gray-700">Текущ документ (EN)</p>
                      </div>
                      <button
                        type="button"
                        onClick={() => removeCurrentFile("en")}
                        className="p-1 text-red-500 hover:text-red-700 flex-shrink-0"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <Button type="submit" disabled={uploading} className="w-full">
              {uploading ? "Запазване..." : "Създай"}
            </Button>
          </form>
        </div>
      )}

      <div className="space-y-2">
        {policies.map((policy) => (
          <div key={policy.id}>
            <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 flex justify-between items-start">
              <div className="flex-1">
                <h3 className="font-semibold text-gray-900">{policy.titleBg}</h3>
                <p className="text-sm text-gray-600">{policy.titleEn}</p>
                <p className="text-xs text-gray-500 mt-1">{policy.subtitleBg}</p>
              </div>
              <div className="flex gap-2">
                {editingId === policy.id ? (
                  <Button
                    onClick={() => {
                      setEditingId(null);
                      setShowForm(false);
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
                    onClick={() => handleEdit(policy)}
                    size="sm"
                    variant="outline"
                    className="gap-1"
                  >
                    Редактирай
                  </Button>
                )}
                {!isRecordProtected(policy.createdAt) && (
                  <Button
                    onClick={() => handleDeletePolicy(policy.id)}
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

            {editingId === policy.id && (
              <div className="bg-blue-50 p-6 rounded-lg shadow-sm border border-blue-200 border-t-0 rounded-t-none">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-xl font-semibold">Редактирай политика</h3>
                  <button
                    onClick={() => {
                      setEditingId(null);
                      setShowForm(false);
                      resetForm();
                    }}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    <X size={20} />
                  </button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
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
                        required
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
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label className="text-sm font-semibold">
                        Подзаглавие (БГ) <span className="text-red-500">*</span>
                      </Label>
                      <Input
                        value={formData.subtitleBg || ""}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            subtitleBg: e.target.value,
                          })
                        }
                        placeholder="Подзаглавие на български"
                        className="mt-1"
                        required
                      />
                    </div>
                    <div>
                      <Label className="text-sm font-semibold">
                        Подзаглавие (EN) <span className="text-red-500">*</span>
                      </Label>
                      <Input
                        value={formData.subtitleEn || ""}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            subtitleEn: e.target.value,
                          })
                        }
                        placeholder="Subtitle in English"
                        className="mt-1"
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label className="text-sm font-semibold">
                        PDF/Документ (БГ) <span className="text-red-500">*</span>
                      </Label>
                      <div className="mt-1 space-y-3">
                        <label className="flex items-center justify-center px-4 py-3 border-2 border-dashed border-gray-300 rounded-md cursor-pointer hover:border-gray-400 transition">
                          <div className="flex items-center gap-2">
                            <Upload size={18} className="text-gray-500" />
                            <span className="text-sm text-gray-600">
                              {uploading ? "Качване..." : "Кликни за избор"}
                            </span>
                          </div>
                          <input
                            type="file"
                            accept=".pdf"
                            onChange={handleFileSelect}
                            disabled={uploading}
                            data-language="bg"
                            className="hidden"
                          />
                        </label>

                        {selectedFiles.find((f) => f.language === "bg") && (
                          <div className="flex items-center gap-3 p-2 bg-gray-50 rounded-md">
                            <div className="flex-1 min-w-0">
                              <p className="text-sm text-gray-700 truncate">
                                {selectedFiles.find((f) => f.language === "bg")?.preview}
                              </p>
                            </div>
                            <button
                              type="button"
                              onClick={() => removeSelectedFile("bg")}
                              className="p-1 text-red-500 hover:text-red-700 flex-shrink-0"
                            >
                              <Trash2 size={16} />
                            </button>
                          </div>
                        )}

                        {formData.cloudinaryPublicIdBg && !selectedFiles.find((f) => f.language === "bg") && (
                          <div className="flex items-center gap-3 p-2 bg-blue-50 rounded-md border border-blue-200">
                            <div className="flex-1 min-w-0">
                              <p className="text-sm text-gray-700">Текущ документ (БГ)</p>
                            </div>
                            <button
                              type="button"
                              onClick={() => removeCurrentFile("bg")}
                              className="p-1 text-red-500 hover:text-red-700 flex-shrink-0"
                            >
                              <Trash2 size={16} />
                            </button>
                          </div>
                        )}
                      </div>
                    </div>

                    <div>
                      <Label className="text-sm font-semibold">
                        PDF/Документ (EN) <span className="text-red-500">*</span>
                      </Label>
                      <div className="mt-1 space-y-3">
                        <label className="flex items-center justify-center px-4 py-3 border-2 border-dashed border-gray-300 rounded-md cursor-pointer hover:border-gray-400 transition">
                          <div className="flex items-center gap-2">
                            <Upload size={18} className="text-gray-500" />
                            <span className="text-sm text-gray-600">
                              {uploading ? "Качване..." : "Кликни за избор"}
                            </span>
                          </div>
                          <input
                            type="file"
                            accept=".pdf"
                            onChange={handleFileSelect}
                            disabled={uploading}
                            data-language="en"
                            className="hidden"
                          />
                        </label>

                        {selectedFiles.find((f) => f.language === "en") && (
                          <div className="flex items-center gap-3 p-2 bg-gray-50 rounded-md">
                            <div className="flex-1 min-w-0">
                              <p className="text-sm text-gray-700 truncate">
                                {selectedFiles.find((f) => f.language === "en")?.preview}
                              </p>
                            </div>
                            <button
                              type="button"
                              onClick={() => removeSelectedFile("en")}
                              className="p-1 text-red-500 hover:text-red-700 flex-shrink-0"
                            >
                              <Trash2 size={16} />
                            </button>
                          </div>
                        )}

                        {formData.cloudinaryPublicIdEn && !selectedFiles.find((f) => f.language === "en") && (
                          <div className="flex items-center gap-3 p-2 bg-blue-50 rounded-md border border-blue-200">
                            <div className="flex-1 min-w-0">
                              <p className="text-sm text-gray-700">Текущ документ (EN)</p>
                            </div>
                            <button
                              type="button"
                              onClick={() => removeCurrentFile("en")}
                              className="p-1 text-red-500 hover:text-red-700 flex-shrink-0"
                            >
                              <Trash2 size={16} />
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  <Button type="submit" disabled={uploading} className="w-full">
                    {uploading ? "Запазване..." : "Актуализирай"}
                  </Button>
                </form>
              </div>
            )}
          </div>
        ))}

        {policies.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            Няма политики. Добавете първа политика.
          </div>
        )}
      </div>
    </div>
  );
}
