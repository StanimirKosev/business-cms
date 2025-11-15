"use client";

import { useEffect, useState } from "react";
import { Button } from "@repo/ui/components/button";
import { Input } from "@repo/ui/components/input";
import { Label } from "@repo/ui/components/label";
import { toast } from "sonner";
import { Plus, Trash2, Edit2, X } from "lucide-react";
import type { Category } from "@repo/database/client";

export default function CategoriesPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState<Partial<Category>>({
    titleBg: "",
    titleEn: "",
    slug: "",
    descriptionBg: "",
    descriptionEn: "",
  });

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      setLoading(true);
      const response = await fetch("/api/categories");
      if (response.ok) {
        setCategories(await response.json());
      }
    } catch (error) {
      console.error("Error fetching categories:", error);
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
      !formData.slug ||
      !formData.descriptionBg ||
      !formData.descriptionEn
    ) {
      toast.error("Попълнете всички полета");
      return;
    }

    try {
      const url = editingId
        ? `/api/categories/${editingId}`
        : "/api/categories";
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
        toast.success("Категория актуализирана");
      } else {
        setCategories([...categories, savedCategory]);
        toast.success("Категория създадена");
      }

      setEditingId(null);
      setShowForm(false);
      setFormData({
        titleBg: "",
        titleEn: "",
        slug: "",
        descriptionBg: "",
        descriptionEn: "",
      });
    } catch (error) {
      console.error("Error:", error);
      toast.error("Грешка при запазване");
    }
  };

  const handleEdit = (category: Category) => {
    setFormData(category);
    setEditingId(category.id);
    setShowForm(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Сигурни ли сте?")) return;

    try {
      const response = await fetch(`/api/categories/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) throw new Error("Failed to delete");

      setCategories(categories.filter((c) => c.id !== id));
      toast.success("Категория изтрита");
    } catch (error) {
      console.error("Error:", error);
      toast.error("Грешка при изтриване");
    }
  };

  if (loading) return <div className="p-8">Зареждане...</div>;

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900">Категории</h2>
        <Button
          onClick={() => {
            setEditingId(null);
            setShowForm(!showForm);
            if (showForm) {
              setFormData({
                titleBg: "",
                titleEn: "",
                slug: "",
                descriptionBg: "",
                descriptionEn: "",
              });
            }
          }}
          className="gap-2"
        >
          <Plus size={16} />
          {showForm && !editingId ? "Отмени" : "Добави категория"}
        </Button>
      </div>

      {(showForm || editingId) && (
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 mb-8">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-semibold">
              {editingId ? "Редактирай категория" : "Нова категория"}
            </h3>
            <button
              onClick={() => {
                setShowForm(false);
                setEditingId(null);
                setFormData({
                  titleBg: "",
                  titleEn: "",
                  slug: "",
                  descriptionBg: "",
                  descriptionEn: "",
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

            <div>
              <Label className="text-sm font-semibold">Slug</Label>
              <Input
                value={formData.slug || ""}
                onChange={(e) =>
                  setFormData({ ...formData, slug: e.target.value })
                }
                placeholder="category-slug"
                className="mt-1"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label className="text-sm font-semibold">
                  Описание (БГ)
                </Label>
                <textarea
                  value={formData.descriptionBg || ""}
                  onChange={(e) =>
                    setFormData({ ...formData, descriptionBg: e.target.value })
                  }
                  placeholder="Описание на български"
                  className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md text-sm"
                  rows={3}
                />
              </div>
              <div>
                <Label className="text-sm font-semibold">
                  Описание (EN)
                </Label>
                <textarea
                  value={formData.descriptionEn || ""}
                  onChange={(e) =>
                    setFormData({ ...formData, descriptionEn: e.target.value })
                  }
                  placeholder="Description in English"
                  className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md text-sm"
                  rows={3}
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
        {categories.map((category) => (
          <div
            key={category.id}
            className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 flex justify-between items-start"
          >
            <div className="flex-1">
              <h3 className="font-semibold text-gray-900">
                {category.titleBg}
              </h3>
              <p className="text-sm text-gray-600">{category.titleEn}</p>
              <p className="text-xs text-gray-500 mt-1">
                Slug: {category.slug}
              </p>
            </div>
            <div className="flex gap-2">
              <Button
                onClick={() => handleEdit(category)}
                size="sm"
                variant="outline"
                className="gap-1"
              >
                <Edit2 size={14} />
                Редактирай
              </Button>
              <Button
                onClick={() => handleDelete(category.id)}
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
            Няма категории. Добавете първа категория.
          </div>
        )}
      </div>
    </div>
  );
}
