"use client";

import { useEffect, useState } from "react";
import { Button } from "@repo/ui/components/button";
import { Input } from "@repo/ui/components/input";
import { Label } from "@repo/ui/components/label";
import { toast } from "sonner";
import { Plus, Trash2, Edit2, X } from "lucide-react";
import type { MachineryCategory } from "@repo/database/client";

export default function MachineryPage() {
  const [categories, setCategories] = useState<MachineryCategory[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState<Partial<MachineryCategory>>({
    nameBg: "",
    nameEn: "",
    count: 0,
    imageUrl: "",
    order: 0,
  });

  useEffect(() => {
    fetchMachinery();
  }, []);

  const fetchMachinery = async () => {
    try {
      setLoading(true);
      const response = await fetch("/api/machinery");
      if (response.ok) {
        setCategories(await response.json());
      }
    } catch (error) {
      console.error("Error fetching machinery:", error);
      toast.error("Грешка при зареждане");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (
      !formData.nameBg ||
      !formData.nameEn ||
      formData.count === undefined ||
      !formData.imageUrl
    ) {
      toast.error("Попълнете всички необходими полета");
      return;
    }

    try {
      const url = editingId ? `/api/machinery/${editingId}` : "/api/machinery";
      const method = editingId ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) throw new Error("Failed to save");

      const savedCategory = await response.json();

      if (editingId) {
        setCategories(
          categories.map((c) => (c.id === editingId ? savedCategory : c))
        );
        toast.success("Оборудване актуализирано");
      } else {
        setCategories([...categories, savedCategory]);
        toast.success("Оборудване създадено");
      }

      setEditingId(null);
      setShowForm(false);
      setFormData({
        nameBg: "",
        nameEn: "",
        count: 0,
        imageUrl: "",
        order: 0,
      });
    } catch (error) {
      console.error("Error:", error);
      toast.error("Грешка при запазване");
    }
  };

  const handleEdit = (category: MachineryCategory) => {
    setFormData(category);
    setEditingId(category.id);
    setShowForm(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Сигурни ли сте?")) return;

    try {
      const response = await fetch(`/api/machinery/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) throw new Error("Failed to delete");

      setCategories(categories.filter((c) => c.id !== id));
      toast.success("Оборудване изтрито");
    } catch (error) {
      console.error("Error:", error);
      toast.error("Грешка при изтриване");
    }
  };

  if (loading) return <div className="p-8">Зареждане...</div>;

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900">Оборудване</h2>
        <Button
          onClick={() => {
            setEditingId(null);
            setShowForm(!showForm);
            if (showForm) {
              setFormData({
                nameBg: "",
                nameEn: "",
                count: 0,
                imageUrl: "",
                order: 0,
              });
            }
          }}
          className="gap-2"
        >
          <Plus size={16} />
          {showForm && !editingId ? "Отмени" : "Добави оборудване"}
        </Button>
      </div>

      {(showForm || editingId) && (
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 mb-8">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-semibold">
              {editingId ? "Редактирай оборудване" : "Ново оборудване"}
            </h3>
            <button
              onClick={() => {
                setShowForm(false);
                setEditingId(null);
                setFormData({
                  nameBg: "",
                  nameEn: "",
                  count: 0,
                  imageUrl: "",
                  order: 0,
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
                  value={formData.nameBg || ""}
                  onChange={(e) =>
                    setFormData({ ...formData, nameBg: e.target.value })
                  }
                  placeholder="Име на български"
                  className="mt-1"
                />
              </div>
              <div>
                <Label className="text-sm font-semibold">Име (EN)</Label>
                <Input
                  value={formData.nameEn || ""}
                  onChange={(e) =>
                    setFormData({ ...formData, nameEn: e.target.value })
                  }
                  placeholder="Name in English"
                  className="mt-1"
                />
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div>
                <Label className="text-sm font-semibold">Брой</Label>
                <Input
                  type="number"
                  value={formData.count || 0}
                  onChange={(e) =>
                    setFormData({ ...formData, count: parseInt(e.target.value) })
                  }
                  className="mt-1"
                />
              </div>
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
                <Label className="text-sm font-semibold">
                  Cloudinary Image URL
                </Label>
                <Input
                  value={formData.imageUrl || ""}
                  onChange={(e) =>
                    setFormData({ ...formData, imageUrl: e.target.value })
                  }
                  placeholder="https://..."
                  className="mt-1"
                />
              </div>
            </div>

            <Button type="submit" className="w-full">
              {editingId ? "Актуализирай" : "Създай"}
            </Button>
          </form>
        </div>
      )}

      <div className="space-y-2">
        {categories.map((cat) => (
          <div
            key={cat.id}
            className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 flex justify-between items-start"
          >
            <div className="flex-1">
              <h3 className="font-semibold text-gray-900">{cat.nameBg}</h3>
              <p className="text-sm text-gray-600">{cat.nameEn}</p>
              <p className="text-xs text-gray-500 mt-1">
                Брой: {cat.count} • Ред: {cat.order}
              </p>
            </div>
            <div className="flex gap-2">
              <Button
                onClick={() => handleEdit(cat)}
                size="sm"
                variant="outline"
                className="gap-1"
              >
                <Edit2 size={14} />
                Редактирай
              </Button>
              <Button
                onClick={() => handleDelete(cat.id)}
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

        {categories.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            Няма оборудване. Добавете първо оборудване.
          </div>
        )}
      </div>
    </div>
  );
}
