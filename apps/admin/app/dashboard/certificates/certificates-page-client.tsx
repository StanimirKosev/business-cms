"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import { Button } from "@repo/ui/components/button";
import { Input } from "@repo/ui/components/input";
import { Label } from "@repo/ui/components/label";
import { toast } from "sonner";
import { Plus, Trash2, X, Upload } from "lucide-react";
import type { Certificate } from "@repo/database/client";

interface SelectedFile {
  file: File;
  preview?: string;
  cloudinaryId?: string;
}

interface CertificatesPageClientProps {
  initialCertificates: Certificate[];
}

export function CertificatesPageClient({
  initialCertificates,
}: CertificatesPageClientProps) {
  const [certificates, setCertificates] = useState(initialCertificates);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [selectedFileBg, setSelectedFileBg] = useState<SelectedFile | null>(null);
  const [selectedFileEn, setSelectedFileEn] = useState<SelectedFile | null>(null);
  const fileInputRefBg = useRef<HTMLInputElement>(null);
  const fileInputRefEn = useRef<HTMLInputElement>(null);
  const [formData, setFormData] = useState<Partial<Certificate>>({
    titleBg: "",
    titleEn: "",
    cloudinaryPublicIdBg: "",
    cloudinaryPublicIdEn: "",
    isFeaturedInTimeline: false,
    timelineYear: "",
    timelineIconName: "",
  });

  const transformIconName = (icon: string): string => {
    return icon
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join("");
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>, isBg: boolean) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const isValidType = file.type === "image/jpeg" || file.type === "image/jpg";
    if (!isValidType) {
      toast.error("Моля, изберете JPG файл");
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const selectedFile: SelectedFile = {
        file,
      };

      if (file.type.startsWith("image/")) {
        selectedFile.preview = event.target?.result as string;
      }

      if (isBg) {
        setSelectedFileBg(selectedFile);
      } else {
        setSelectedFileEn(selectedFile);
      }
    };
    reader.readAsDataURL(file);

    if (isBg && fileInputRefBg.current) {
      fileInputRefBg.current.value = "";
    } else if (!isBg && fileInputRefEn.current) {
      fileInputRefEn.current.value = "";
    }
  };

  const uploadFileToCloudinary = async (file: SelectedFile, lang: string) => {
    if (file.cloudinaryId) {
      return file.cloudinaryId;
    }

    const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
    const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB for JPG images

    if (file.file.size > MAX_FILE_SIZE) {
      throw new Error(
        `Файлът "${file.file.name}" е твърде голям. Максимален размер е 5MB.`
      );
    }

    const formDataToUpload = new FormData();
    formDataToUpload.append("file", file.file);
    formDataToUpload.append("upload_preset", "business_cms_projects");
    formDataToUpload.append(
      "public_id",
      `certificates/${Date.now()}-${lang}-${file.file.name.split(".")[0]}`
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
        `Upload failed for ${file.file.name}: ${errorData.error?.message || "Unknown error"}`
      );
    }

    const data = await response.json();
    return data.public_id as string;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.titleBg?.trim()) {
      toast.error("Име (БГ) е задължително");
      return;
    }

    if (!formData.titleEn?.trim()) {
      toast.error("Име (EN) е задължително");
      return;
    }

    if (!selectedFileBg && !formData.cloudinaryPublicIdBg) {
      toast.error("Моля, качете файл за БГ");
      return;
    }

    if (!selectedFileEn && !formData.cloudinaryPublicIdEn) {
      toast.error("Моля, качете файл за EN");
      return;
    }

    if (formData.isFeaturedInTimeline) {
      if (!formData.timelineYear?.trim()) {
        toast.error("Година е задължителна когато е избрано На Timeline");
        return;
      }

      if (!formData.timelineIconName?.trim()) {
        toast.error("Icon Name е задължително когато е избрано На Timeline");
        return;
      }
    }

    setUploading(true);
    try {
      let uploadedIdBg = formData.cloudinaryPublicIdBg;
      let uploadedIdEn = formData.cloudinaryPublicIdEn;

      if (selectedFileBg) {
        uploadedIdBg = await uploadFileToCloudinary(selectedFileBg, "bg");
      }

      if (selectedFileEn) {
        uploadedIdEn = await uploadFileToCloudinary(selectedFileEn, "en");
      }

      // Calculate new order for new certificates
      let newOrder = formData.order;
      if (!editingId) {
        const maxOrder = certificates.length > 0
          ? Math.max(...certificates.map((c) => c.order ?? 0))
          : -1;
        newOrder = maxOrder + 1;
      }

      const dataToSend = {
        titleBg: formData.titleBg,
        titleEn: formData.titleEn,
        cloudinaryPublicIdBg: uploadedIdBg,
        cloudinaryPublicIdEn: uploadedIdEn,
        isFeaturedInTimeline: formData.isFeaturedInTimeline,
        timelineYear: formData.timelineYear || null,
        timelineIconName: formData.timelineIconName
          ? transformIconName(formData.timelineIconName)
          : null,
        order: newOrder,
      };

      const url = editingId
        ? `/api/certificates/${editingId}`
        : "/api/certificates";
      const method = editingId ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(dataToSend),
      });

      if (!response.ok) throw new Error("Failed to save");

      const savedCert = await response.json();

      if (editingId) {
        setCertificates(
          certificates.map((c) => (c.id === editingId ? savedCert : c))
        );
        toast.success("Сертификат актуализиран");
      } else {
        setCertificates([savedCert, ...certificates]);
        toast.success("Сертификат създаден");
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

  const handleEdit = (certificate: Certificate) => {
    setFormData(certificate);
    setEditingId(certificate.id);
    setShowForm(true);
    setSelectedFileBg(null);
    setSelectedFileEn(null);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Сигурни ли сте?")) return;

    try {
      const response = await fetch(`/api/certificates/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) throw new Error("Failed to delete");

      setCertificates(certificates.filter((c) => c.id !== id));
      toast.success("Сертификат изтрит");
    } catch (error) {
      console.error("Error:", error);
      toast.error("Грешка при изтриване");
    }
  };

  const resetForm = () => {
    setFormData({
      titleBg: "",
      titleEn: "",
      cloudinaryPublicIdBg: "",
      cloudinaryPublicIdEn: "",
      isFeaturedInTimeline: false,
      timelineYear: "",
      timelineIconName: "",
    });
    setSelectedFileBg(null);
    setSelectedFileEn(null);
  };

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900">Сертификати</h2>
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
          {showForm && !editingId ? "Отмени" : "Добави сертификат"}
        </Button>
      </div>

      {showForm && !editingId && (
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 mb-8">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-semibold">Нов сертификат</h3>
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
                  Име (БГ) <span className="text-red-500">*</span>
                </Label>
                <Input
                  value={formData.titleBg || ""}
                  onChange={(e) =>
                    setFormData({ ...formData, titleBg: e.target.value })
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
                  value={formData.titleEn || ""}
                  onChange={(e) =>
                    setFormData({ ...formData, titleEn: e.target.value })
                  }
                  placeholder="Name in English"
                  className="mt-1"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label className="text-sm font-semibold">
                  Файл (БГ) <span className="text-red-500">*</span>
                </Label>
                <div className="mt-1 space-y-3">
                  <label className="flex items-center justify-center px-4 py-3 border-2 border-dashed border-gray-300 rounded-md cursor-pointer hover:border-gray-400 transition">
                    <div className="flex items-center gap-2">
                      <Upload size={18} className="text-gray-500" />
                      <span className="text-sm text-gray-600">
                        {uploading ? "Качване..." : "Кликни за избор на файл"}
                      </span>
                    </div>
                    <input
                      ref={fileInputRefBg}
                      type="file"
                      accept=".jpg,.jpeg"
                      onChange={(e) => handleFileSelect(e, true)}
                      disabled={uploading}
                      className="hidden"
                    />
                  </label>

                  {selectedFileBg && (
                    <div className="flex items-center gap-3 p-2 bg-gray-50 rounded-md">
                      {selectedFileBg.preview && (
                        <div className="w-16 h-16 flex-shrink-0 rounded-md overflow-hidden bg-white flex items-center justify-center relative">
                          <Image
                            src={selectedFileBg.preview}
                            alt="Preview"
                            fill
                            className="object-contain"
                          />
                        </div>
                      )}
                      {!selectedFileBg.preview && (
                        <div className="w-16 h-16 flex-shrink-0 rounded-md overflow-hidden bg-red-50 flex items-center justify-center">
                          <span className="text-xs font-bold text-red-600">PDF</span>
                        </div>
                      )}
                      <div className="flex-1 min-w-0">
                        <p className="text-sm text-gray-700 truncate">
                          {selectedFileBg.file.name}
                        </p>
                        <p className="text-xs text-gray-500">
                          {(selectedFileBg.file.size / 1024).toFixed(1)} KB
                        </p>
                      </div>
                      <button
                        type="button"
                        onClick={() => setSelectedFileBg(null)}
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
                  Файл (EN) <span className="text-red-500">*</span>
                </Label>
                <div className="mt-1 space-y-3">
                  <label className="flex items-center justify-center px-4 py-3 border-2 border-dashed border-gray-300 rounded-md cursor-pointer hover:border-gray-400 transition">
                    <div className="flex items-center gap-2">
                      <Upload size={18} className="text-gray-500" />
                      <span className="text-sm text-gray-600">
                        {uploading ? "Качване..." : "Кликни за избор на файл"}
                      </span>
                    </div>
                    <input
                      ref={fileInputRefEn}
                      type="file"
                      accept=".jpg,.jpeg"
                      onChange={(e) => handleFileSelect(e, false)}
                      disabled={uploading}
                      className="hidden"
                    />
                  </label>

                  {selectedFileEn && (
                    <div className="flex items-center gap-3 p-2 bg-gray-50 rounded-md">
                      {selectedFileEn.preview && (
                        <div className="w-16 h-16 flex-shrink-0 rounded-md overflow-hidden bg-white flex items-center justify-center relative">
                          <Image
                            src={selectedFileEn.preview}
                            alt="Preview"
                            fill
                            className="object-contain"
                          />
                        </div>
                      )}
                      {!selectedFileEn.preview && (
                        <div className="w-16 h-16 flex-shrink-0 rounded-md overflow-hidden bg-red-50 flex items-center justify-center">
                          <span className="text-xs font-bold text-red-600">PDF</span>
                        </div>
                      )}
                      <div className="flex-1 min-w-0">
                        <p className="text-sm text-gray-700 truncate">
                          {selectedFileEn.file.name}
                        </p>
                        <p className="text-xs text-gray-500">
                          {(selectedFileEn.file.size / 1024).toFixed(1)} KB
                        </p>
                      </div>
                      <button
                        type="button"
                        onClick={() => setSelectedFileEn(null)}
                        className="p-1 text-red-500 hover:text-red-700 flex-shrink-0"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="featured"
                checked={formData.isFeaturedInTimeline || false}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    isFeaturedInTimeline: e.target.checked,
                  })
                }
                className="rounded border-gray-300"
              />
              <Label htmlFor="featured" className="text-sm font-semibold cursor-pointer">
                Да се покаже ли в Системи за управление
              </Label>
            </div>

            {formData.isFeaturedInTimeline && (
              <>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className="text-sm font-semibold">
                      Година <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      value={formData.timelineYear || ""}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          timelineYear: e.target.value,
                        })
                      }
                      placeholder="2024"
                      className="mt-1"
                      required
                    />
                  </div>
                  <div>
                    <Label className="text-sm font-semibold">
                      Icon Name <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      value={formData.timelineIconName || ""}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          timelineIconName: e.target.value,
                        })
                      }
                      placeholder="arrow-left"
                      className="mt-1"
                      required
                    />
                    <p className="mt-1 text-xs text-gray-500">
                      Отидете на https://lucide.dev/icons/ и изберете име на икона. При преглед на икона се показва името с малки букви и дефиси (arrow-left).
                    </p>
                  </div>
                </div>
              </>
            )}

            <Button type="submit" disabled={uploading} className="w-full">
              {uploading ? "Запазване..." : "Създай"}
            </Button>
          </form>
        </div>
      )}

      <div className="space-y-2">
        {certificates.map((cert) => (
          <div key={cert.id}>
            <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 flex justify-between items-start">
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <h3 className="font-semibold text-gray-900">{cert.titleBg}</h3>
                  {cert.isFeaturedInTimeline && (
                    <span className="px-2 py-1 bg-red-100 text-red-800 text-xs rounded font-semibold">
                      Показано в Системи за управление
                    </span>
                  )}
                </div>
                <p className="text-sm text-gray-600">{cert.titleEn}</p>
              </div>
              <div className="flex gap-2">
                {editingId === cert.id ? (
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
                    onClick={() => handleEdit(cert)}
                    size="sm"
                    variant="outline"
                    className="gap-1"
                  >
                    Редактирай
                  </Button>
                )}
                <Button
                  onClick={() => handleDelete(cert.id)}
                  size="sm"
                  variant="outline"
                  className="gap-1 text-red-600 hover:text-red-700"
                >
                  <Trash2 size={14} />
                  Изтрий
                </Button>
              </div>
            </div>

            {editingId === cert.id && (
              <div className="bg-blue-50 p-6 rounded-lg shadow-sm border border-blue-200 border-t-0 rounded-t-none">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-xl font-semibold">Редактирай сертификат</h3>
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
                        Име (БГ) <span className="text-red-500">*</span>
                      </Label>
                      <Input
                        value={formData.titleBg || ""}
                        onChange={(e) =>
                          setFormData({ ...formData, titleBg: e.target.value })
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
                        value={formData.titleEn || ""}
                        onChange={(e) =>
                          setFormData({ ...formData, titleEn: e.target.value })
                        }
                        placeholder="Name in English"
                        className="mt-1"
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label className="text-sm font-semibold">
                        Файл (БГ) <span className="text-red-500">*</span>
                      </Label>
                      <div className="mt-1 space-y-3">
                        <label className="flex items-center justify-center px-4 py-3 border-2 border-dashed border-gray-300 rounded-md cursor-pointer hover:border-gray-400 transition">
                          <div className="flex items-center gap-2">
                            <Upload size={18} className="text-gray-500" />
                            <span className="text-sm text-gray-600">
                              {uploading ? "Качване..." : "Кликни за избор на файл"}
                            </span>
                          </div>
                          <input
                            ref={fileInputRefBg}
                            type="file"
                            accept=".jpg,.jpeg"
                            onChange={(e) => handleFileSelect(e, true)}
                            disabled={uploading}
                            className="hidden"
                          />
                        </label>

                        {formData.cloudinaryPublicIdBg && !selectedFileBg && (
                          <div className="flex items-center gap-3 p-2 bg-blue-50 rounded-md border border-blue-200">
                            <div className="w-16 h-16 flex-shrink-0 rounded-md overflow-hidden bg-blue-100 flex items-center justify-center">
                              <span className="text-xs font-bold text-blue-600">Текущ</span>
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="text-sm text-gray-700">
                                Текущ файл (БГ)
                              </p>
                            </div>
                            <button
                              type="button"
                              onClick={() =>
                                setFormData({
                                  ...formData,
                                  cloudinaryPublicIdBg: "",
                                })
                              }
                              className="p-1 text-red-500 hover:text-red-700 flex-shrink-0"
                            >
                              <Trash2 size={16} />
                            </button>
                          </div>
                        )}

                        {selectedFileBg && (
                          <div className="flex items-center gap-3 p-2 bg-gray-50 rounded-md">
                            {selectedFileBg.preview && (
                              <div className="w-16 h-16 flex-shrink-0 rounded-md overflow-hidden bg-white flex items-center justify-center relative">
                                <Image
                                  src={selectedFileBg.preview}
                                  alt="Preview"
                                  fill
                                  className="object-contain"
                                />
                              </div>
                            )}
                            {!selectedFileBg.preview && (
                              <div className="w-16 h-16 flex-shrink-0 rounded-md overflow-hidden bg-red-50 flex items-center justify-center">
                                <span className="text-xs font-bold text-red-600">PDF</span>
                              </div>
                            )}
                            <div className="flex-1 min-w-0">
                              <p className="text-sm text-gray-700 truncate">
                                {selectedFileBg.file.name}
                              </p>
                              <p className="text-xs text-gray-500">
                                {(selectedFileBg.file.size / 1024).toFixed(1)} KB
                              </p>
                            </div>
                            <button
                              type="button"
                              onClick={() => setSelectedFileBg(null)}
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
                        Файл (EN) <span className="text-red-500">*</span>
                      </Label>
                      <div className="mt-1 space-y-3">
                        <label className="flex items-center justify-center px-4 py-3 border-2 border-dashed border-gray-300 rounded-md cursor-pointer hover:border-gray-400 transition">
                          <div className="flex items-center gap-2">
                            <Upload size={18} className="text-gray-500" />
                            <span className="text-sm text-gray-600">
                              {uploading ? "Качване..." : "Кликни за избор на файл"}
                            </span>
                          </div>
                          <input
                            ref={fileInputRefEn}
                            type="file"
                            accept=".jpg,.jpeg"
                            onChange={(e) => handleFileSelect(e, false)}
                            disabled={uploading}
                            className="hidden"
                          />
                        </label>

                        {formData.cloudinaryPublicIdEn && !selectedFileEn && (
                          <div className="flex items-center gap-3 p-2 bg-blue-50 rounded-md border border-blue-200">
                            <div className="w-16 h-16 flex-shrink-0 rounded-md overflow-hidden bg-blue-100 flex items-center justify-center">
                              <span className="text-xs font-bold text-blue-600">Текущ</span>
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="text-sm text-gray-700">
                                Текущ файл (EN)
                              </p>
                            </div>
                            <button
                              type="button"
                              onClick={() =>
                                setFormData({
                                  ...formData,
                                  cloudinaryPublicIdEn: "",
                                })
                              }
                              className="p-1 text-red-500 hover:text-red-700 flex-shrink-0"
                            >
                              <Trash2 size={16} />
                            </button>
                          </div>
                        )}

                        {selectedFileEn && (
                          <div className="flex items-center gap-3 p-2 bg-gray-50 rounded-md">
                            {selectedFileEn.preview && (
                              <div className="w-16 h-16 flex-shrink-0 rounded-md overflow-hidden bg-white flex items-center justify-center relative">
                                <Image
                                  src={selectedFileEn.preview}
                                  alt="Preview"
                                  fill
                                  className="object-contain"
                                />
                              </div>
                            )}
                            {!selectedFileEn.preview && (
                              <div className="w-16 h-16 flex-shrink-0 rounded-md overflow-hidden bg-red-50 flex items-center justify-center">
                                <span className="text-xs font-bold text-red-600">PDF</span>
                              </div>
                            )}
                            <div className="flex-1 min-w-0">
                              <p className="text-sm text-gray-700 truncate">
                                {selectedFileEn.file.name}
                              </p>
                              <p className="text-xs text-gray-500">
                                {(selectedFileEn.file.size / 1024).toFixed(1)} KB
                              </p>
                            </div>
                            <button
                              type="button"
                              onClick={() => setSelectedFileEn(null)}
                              className="p-1 text-red-500 hover:text-red-700 flex-shrink-0"
                            >
                              <Trash2 size={16} />
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      id="featured-edit"
                      checked={formData.isFeaturedInTimeline || false}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          isFeaturedInTimeline: e.target.checked,
                        })
                      }
                      className="rounded border-gray-300"
                    />
                    <Label htmlFor="featured-edit" className="text-sm font-semibold cursor-pointer">
                      Да се покаже ли в Системи за управление
                    </Label>
                  </div>

                  {formData.isFeaturedInTimeline && (
                    <>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label className="text-sm font-semibold">
                            Година <span className="text-red-500">*</span>
                          </Label>
                          <Input
                            value={formData.timelineYear || ""}
                            onChange={(e) =>
                              setFormData({
                                ...formData,
                                timelineYear: e.target.value,
                              })
                            }
                            placeholder="2024"
                            className="mt-1"
                            required
                          />
                        </div>
                        <div>
                          <Label className="text-sm font-semibold">
                            Icon Name <span className="text-red-500">*</span>
                          </Label>
                          <Input
                            value={formData.timelineIconName || ""}
                            onChange={(e) =>
                              setFormData({
                                ...formData,
                                timelineIconName: e.target.value,
                              })
                            }
                            placeholder="arrow-left"
                            className="mt-1"
                            required
                          />
                          <p className="mt-1 text-xs text-gray-500">
                            Отидете на https://lucide.dev/icons/ и изберете име на икона. При преглед на икона се показва името с малки букви и дефиси (arrow-left).
                          </p>
                        </div>
                      </div>
                    </>
                  )}

                  <Button type="submit" disabled={uploading} className="w-full">
                    {uploading ? "Запазване..." : "Актуализирай"}
                  </Button>
                </form>
              </div>
            )}
          </div>
        ))}

        {certificates.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            Няма сертификати. Добавете първи сертификат.
          </div>
        )}
      </div>
    </div>
  );
}
