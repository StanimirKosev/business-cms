"use client";

import { useEffect, useState } from "react";
import { Button } from "@repo/ui/components/button";
import { Input } from "@repo/ui/components/input";
import { Label } from "@repo/ui/components/label";
import { toast } from "sonner";
import { Plus, Trash2, Edit2, X } from "lucide-react";
import type { Certificate } from "@repo/database/client";

export default function CertificatesPage() {
  const [certificates, setCertificates] = useState<Certificate[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState<Partial<Certificate>>({
    titleBg: "",
    titleEn: "",
    cloudinaryPublicIdBg: "",
    cloudinaryPublicIdEn: "",
    order: 0,
    isFeaturedInTimeline: false,
    timelineYear: "",
  });

  useEffect(() => {
    fetchCertificates();
  }, []);

  const fetchCertificates = async () => {
    try {
      setLoading(true);
      const response = await fetch("/api/certificates");
      if (response.ok) {
        setCertificates(await response.json());
      }
    } catch (error) {
      console.error("Error fetching certificates:", error);
      toast.error("Грешка при зареждане");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (
      !formData.titleBg ||
      !formData.titleEn ||
      !formData.cloudinaryPublicIdBg ||
      !formData.cloudinaryPublicIdEn
    ) {
      toast.error("Попълнете всички необходими полета");
      return;
    }

    try {
      const url = editingId
        ? `/api/certificates/${editingId}`
        : "/api/certificates";
      const method = editingId ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) throw new Error("Failed to save");

      const savedCert = await response.json();

      if (editingId) {
        setCertificates(
          certificates.map((c) => (c.id === editingId ? savedCert : c))
        );
        toast.success("Сертификат актуализиран");
      } else {
        setCertificates([...certificates, savedCert]);
        toast.success("Сертификат създаден");
      }

      setEditingId(null);
      setShowForm(false);
      setFormData({
        titleBg: "",
        titleEn: "",
        cloudinaryPublicIdBg: "",
        cloudinaryPublicIdEn: "",
        order: 0,
        isFeaturedInTimeline: false,
        timelineYear: "",
      });
    } catch (error) {
      console.error("Error:", error);
      toast.error("Грешка при запазване");
    }
  };

  const handleEdit = (certificate: Certificate) => {
    setFormData(certificate);
    setEditingId(certificate.id);
    setShowForm(true);
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

  if (loading) return <div className="p-8">Зареждане...</div>;

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900">Сертификати</h2>
        <Button
          onClick={() => {
            setEditingId(null);
            setShowForm(!showForm);
            if (showForm) {
              setFormData({
                titleBg: "",
                titleEn: "",
                cloudinaryPublicIdBg: "",
                cloudinaryPublicIdEn: "",
                order: 0,
                isFeaturedInTimeline: false,
                timelineYear: "",
              });
            }
          }}
          className="gap-2"
        >
          <Plus size={16} />
          {showForm && !editingId ? "Отмени" : "Добави сертификат"}
        </Button>
      </div>

      {(showForm || editingId) && (
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 mb-8">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-semibold">
              {editingId ? "Редактирай сертификат" : "Нов сертификат"}
            </h3>
            <button
              onClick={() => {
                setShowForm(false);
                setEditingId(null);
                setFormData({
                  titleBg: "",
                  titleEn: "",
                  cloudinaryPublicIdBg: "",
                  cloudinaryPublicIdEn: "",
                  order: 0,
                  isFeaturedInTimeline: false,
                  timelineYear: "",
                });
              }}
              className="text-gray-500 hover:text-gray-700"
            >
              <X size={20} />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label className="text-sm font-semibold">Име (БГ)</Label>
                <Input
                  value={formData.titleBg || ""}
                  onChange={(e) =>
                    setFormData({ ...formData, titleBg: e.target.value })
                  }
                  placeholder="Име на български"
                  className="mt-1"
                />
              </div>
              <div>
                <Label className="text-sm font-semibold">Име (EN)</Label>
                <Input
                  value={formData.titleEn || ""}
                  onChange={(e) =>
                    setFormData({ ...formData, titleEn: e.target.value })
                  }
                  placeholder="Name in English"
                  className="mt-1"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label className="text-sm font-semibold">
                  Cloudinary ID (БГ)
                </Label>
                <Input
                  value={formData.cloudinaryPublicIdBg || ""}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      cloudinaryPublicIdBg: e.target.value,
                    })
                  }
                  placeholder="certificates/cert-bg"
                  className="mt-1"
                />
              </div>
              <div>
                <Label className="text-sm font-semibold">
                  Cloudinary ID (EN)
                </Label>
                <Input
                  value={formData.cloudinaryPublicIdEn || ""}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      cloudinaryPublicIdEn: e.target.value,
                    })
                  }
                  placeholder="certificates/cert-en"
                  className="mt-1"
                />
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div>
                <Label className="text-sm font-semibold">Ред</Label>
                <Input
                  type="number"
                  value={formData.order || 0}
                  onChange={(e) =>
                    setFormData({ ...formData, order: parseInt(e.target.value) })
                  }
                  className="mt-1"
                />
              </div>
              <div>
                <Label className="text-sm font-semibold">Година (Timeline)</Label>
                <Input
                  value={formData.timelineYear || ""}
                  onChange={(e) =>
                    setFormData({ ...formData, timelineYear: e.target.value })
                  }
                  placeholder="2024"
                  className="mt-1"
                />
              </div>
              <div className="flex items-end">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.isFeaturedInTimeline || false}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        isFeaturedInTimeline: e.target.checked,
                      })
                    }
                  />
                  <span className="text-sm font-semibold">На Timeline</span>
                </label>
              </div>
            </div>

            <Button type="submit" className="w-full">
              {editingId ? "Актуализирай" : "Създай"}
            </Button>
          </form>
        </div>
      )}

      <div className="space-y-2">
        {certificates.map((cert) => (
          <div
            key={cert.id}
            className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 flex justify-between items-start"
          >
            <div className="flex-1">
              <h3 className="font-semibold text-gray-900">{cert.titleBg}</h3>
              <p className="text-sm text-gray-600">{cert.titleEn}</p>
              <p className="text-xs text-gray-500 mt-1">
                ID (БГ): {cert.cloudinaryPublicIdBg}
              </p>
              {cert.isFeaturedInTimeline && (
                <span className="inline-block mt-2 px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded">
                  Timeline {cert.timelineYear}
                </span>
              )}
            </div>
            <div className="flex gap-2">
              <Button
                onClick={() => handleEdit(cert)}
                size="sm"
                variant="outline"
                className="gap-1"
              >
                <Edit2 size={14} />
                Редактирай
              </Button>
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
