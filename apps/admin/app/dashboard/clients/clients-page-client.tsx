"use client";

import Image from "next/image";
import { useState, useRef } from "react";
import { Button } from "@repo/ui/components/button";
import { Input } from "@repo/ui/components/input";
import { Label } from "@repo/ui/components/label";
import { toast } from "sonner";
import { Plus, X, Upload, Trash2 } from "lucide-react";
import type { Client } from "@repo/database/client";

interface SelectedImage {
  file: File;
  preview: string;
  cloudinaryId?: string;
}

interface ClientsPageClientProps {
  initialClients: Client[];
}

export function ClientsPageClient({ initialClients }: ClientsPageClientProps) {
  const [clients, setClients] = useState(initialClients);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [selectedImage, setSelectedImage] = useState<SelectedImage | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [formData, setFormData] = useState<Partial<Client>>({
    nameBg: "",
    nameEn: "",
    logoUrl: "",
  });

  const handleLogoSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
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

  const uploadLogoToCloudinary = async () => {
    if (!selectedImage) return formData.logoUrl;

    if (selectedImage.cloudinaryId) {
      return selectedImage.cloudinaryId;
    }

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
    formDataToUpload.append("public_id", `logos/${Date.now()}-${selectedImage.file.name.split(".")[0]}`);

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
        `Upload failed for ${selectedImage.file.name}: ${errorData.error?.message || "Unknown error"}`
      );
    }

    const data = await response.json();
    return data.public_id as string;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.nameBg?.trim()) {
      toast.error("Име (БГ) е задължително");
      return;
    }

    if (!formData.nameEn?.trim()) {
      toast.error("Име (EN) е задължително");
      return;
    }

    setUploading(true);
    try {
      let uploadedLogoId = formData.logoUrl;

      if (selectedImage) {
        uploadedLogoId = await uploadLogoToCloudinary();
      }

      // Calculate new order for new clients
      let newOrder = formData.order;
      if (!editingId) {
        const maxOrder = clients.length > 0
          ? Math.max(...clients.map((c) => c.order ?? 0))
          : -1;
        newOrder = maxOrder + 1;
      }

      const dataToSend = {
        nameBg: formData.nameBg,
        nameEn: formData.nameEn,
        logoUrl: uploadedLogoId || null,
        website: null,
        order: newOrder,
      };

      const url = editingId ? `/api/clients/${editingId}` : "/api/clients";
      const method = editingId ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(dataToSend),
      });

      if (!response.ok) throw new Error("Failed to save");

      const savedClient = await response.json();

      if (editingId) {
        setClients(clients.map((c) => (c.id === editingId ? savedClient : c)));
        toast.success("Клиент актуализиран");
      } else {
        setClients([savedClient, ...clients]);
        toast.success("Клиент създаден");
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

  const handleEdit = (client: Client) => {
    setFormData(client);
    setEditingId(client.id);
    setShowForm(true);
    setSelectedImage(null);
  };

  const resetForm = () => {
    setFormData({
      nameBg: "",
      nameEn: "",
      logoUrl: "",
    });
    setSelectedImage(null);
  };

  const removeSelectedImage = () => {
    setSelectedImage(null);
  };

  const removeCurrentLogo = () => {
    setFormData({ ...formData, logoUrl: "" });
  };

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900">Клиенти</h2>
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
          {showForm && !editingId ? "Отмени" : "Добави клиент"}
        </Button>
      </div>

      {showForm && !editingId && (
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 mb-8">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-semibold">Нов клиент</h3>
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
                  value={formData.nameBg || ""}
                  onChange={(e) =>
                    setFormData({ ...formData, nameBg: e.target.value })
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
                  value={formData.nameEn || ""}
                  onChange={(e) =>
                    setFormData({ ...formData, nameEn: e.target.value })
                  }
                  placeholder="Name in English"
                  className="mt-1"
                  required
                />
              </div>
            </div>

            <div>
              <Label className="text-sm font-semibold">Logo (опционално)</Label>
              <div className="mt-1 space-y-3">
                <label className="flex items-center justify-center px-4 py-3 border-2 border-dashed border-gray-300 rounded-md cursor-pointer hover:border-gray-400 transition">
                  <div className="flex items-center gap-2">
                    <Upload size={18} className="text-gray-500" />
                    <span className="text-sm text-gray-600">
                      {uploading ? "Качване..." : "Кликни за избор на логото"}
                    </span>
                  </div>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleLogoSelect}
                    disabled={uploading}
                    className="hidden"
                  />
                </label>

                {selectedImage && (
                  <div className="flex items-center gap-3 p-2 bg-gray-50 rounded-md">
                    <div className="w-16 h-16 flex-shrink-0 rounded-md overflow-hidden bg-white flex items-center justify-center">
                      <img
                        src={selectedImage.preview}
                        alt="Logo preview"
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
              </div>
            </div>

            <Button type="submit" disabled={uploading} className="w-full">
              {uploading ? "Запазване..." : "Създай"}
            </Button>
          </form>
        </div>
      )}

      <div className="space-y-2">
        {clients.map((client) => (
          <div key={client.id}>
            <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 flex justify-between items-start">
              <div className="flex-1 flex gap-4">
                {client.logoUrl && (
                  <div className="w-16 h-16 flex-shrink-0 rounded-md overflow-hidden bg-gray-100 flex items-center justify-center">
                    <img
                      src={`https://res.cloudinary.com/dn7bynzv7/image/upload/${client.logoUrl}`}
                      alt={client.nameBg}
                      className="w-full h-full object-contain"
                    />
                  </div>
                )}
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900">
                    {client.nameBg}
                  </h3>
                  <p className="text-sm text-gray-600">{client.nameEn}</p>
                </div>
              </div>
              <div className="flex gap-2">
                {editingId === client.id ? (
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
                    onClick={() => handleEdit(client)}
                    size="sm"
                    variant="outline"
                    className="gap-1"
                  >
                    Редактирай
                  </Button>
                )}
              </div>
            </div>

            {editingId === client.id && (
              <div className="bg-blue-50 p-6 rounded-lg shadow-sm border border-blue-200 border-t-0 rounded-t-none">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-xl font-semibold">Редактирай клиент</h3>
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
                        value={formData.nameBg || ""}
                        onChange={(e) =>
                          setFormData({ ...formData, nameBg: e.target.value })
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
                        value={formData.nameEn || ""}
                        onChange={(e) =>
                          setFormData({ ...formData, nameEn: e.target.value })
                        }
                        placeholder="Name in English"
                        className="mt-1"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <Label className="text-sm font-semibold">
                      Logo (опционално)
                    </Label>
                    <div className="mt-1 space-y-3">
                      <label className="flex items-center justify-center px-4 py-3 border-2 border-dashed border-gray-300 rounded-md cursor-pointer hover:border-gray-400 transition">
                        <div className="flex items-center gap-2">
                          <Upload size={18} className="text-gray-500" />
                          <span className="text-sm text-gray-600">
                            {uploading
                              ? "Качване..."
                              : "Кликни за избор на логото"}
                          </span>
                        </div>
                        <input
                          ref={fileInputRef}
                          type="file"
                          accept="image/*"
                          onChange={handleLogoSelect}
                          disabled={uploading}
                          className="hidden"
                        />
                      </label>

                      {formData.logoUrl && !selectedImage && (
                        <div className="flex items-center gap-3 p-2 bg-blue-50 rounded-md border border-blue-200">
                          <div className="w-16 h-16 flex-shrink-0 rounded-md overflow-hidden bg-white flex items-center justify-center">
                            <img
                              src={`https://res.cloudinary.com/dn7bynzv7/image/upload/${formData.logoUrl}`}
                              alt="Current logo"
                              className="w-full h-full object-contain"
                            />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm text-gray-700">
                              Текущо лого
                            </p>
                          </div>
                          <button
                            type="button"
                            onClick={removeCurrentLogo}
                            className="p-1 text-red-500 hover:text-red-700 flex-shrink-0"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      )}

                      {selectedImage && (
                        <div className="flex items-center gap-3 p-2 bg-gray-50 rounded-md">
                          <div className="w-16 h-16 flex-shrink-0 rounded-md overflow-hidden bg-white flex items-center justify-center">
                            <img
                              src={selectedImage.preview}
                              alt="Logo preview"
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

        {clients.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            Няма клиенти. Добавете първи клиент.
          </div>
        )}
      </div>
    </div>
  );
}
