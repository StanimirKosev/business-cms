"use client";

import { useState } from "react";
import { Button } from "@repo/ui/components/button";
import { Input } from "@repo/ui/components/input";
import { Label } from "@repo/ui/components/label";
import { toast } from "sonner";
import { Plus, X } from "lucide-react";
import type { Category } from "@repo/database/client";

interface CategoriesPageClientProps {
  initialCategories: Category[];
}

export function CategoriesPageClient({
  initialCategories,
}: CategoriesPageClientProps) {
  const [categories, setCategories] = useState(initialCategories);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [formData, setFormData] = useState<Partial<Category>>({
    titleBg: "",
    titleEn: "",
    slug: "",
    descriptionBg: "",
    descriptionEn: "",
    iconName: "",
  });

  const generateSlug = (title: string): string => {
    return title
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9\s-]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-");
  };

  const transformIconName = (icon: string): string => {
    // Transform from kebab-case (arrow-left) to PascalCase (ArrowLeft)
    return icon
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join("");
  };

  const handleTitleEnChange = (value: string) => {
    setFormData({
      ...formData,
      titleEn: value,
      slug: generateSlug(value),
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (
      !formData.titleBg ||
      !formData.titleEn ||
      !formData.descriptionBg ||
      !formData.descriptionEn
    ) {
      toast.error("Попълнете всички задължителни полета");
      return;
    }

    setUploading(true);
    try {
      const url = editingId
        ? `/api/categories/${editingId}`
        : "/api/categories";
      const method = editingId ? "PUT" : "POST";

      // Calculate new order for new categories
      let newOrder = formData.order;
      if (!editingId) {
        const maxOrder = categories.length > 0
          ? Math.max(...categories.map((c) => c.order ?? 0))
          : -1;
        newOrder = maxOrder + 1;
      }

      const dataToSend = {
        ...formData,
        iconName: formData.iconName ? transformIconName(formData.iconName) : "",
        order: newOrder,
      };

      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(dataToSend),
      });

      if (!response.ok) throw new Error("Failed to save");

      const savedCategory = await response.json();

      if (editingId) {
        setCategories(
          categories.map((c) => (c.id === editingId ? savedCategory : c))
        );
        toast.success("Категория актуализирана");
      } else {
        setCategories([savedCategory, ...categories]);
        toast.success("Категория създадена");
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

  const handleEdit = (category: Category) => {
    setFormData(category);
    setEditingId(category.id);
    setShowForm(true);
  };

  const resetForm = () => {
    setFormData({
      titleBg: "",
      titleEn: "",
      slug: "",
      descriptionBg: "",
      descriptionEn: "",
      iconName: "",
    });
  };

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900">Категории</h2>
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
          {showForm && !editingId ? "Отмени" : "Добави категория"}
        </Button>
      </div>

      {showForm && !editingId && (
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 mb-8">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-semibold">Нова категория</h3>
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
                  onChange={(e) => handleTitleEnChange(e.target.value)}
                  placeholder="Name in English"
                  className="mt-1"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label className="text-sm font-semibold">
                  Описание (БГ) <span className="text-red-500">*</span>
                </Label>
                <textarea
                  value={formData.descriptionBg || ""}
                  onChange={(e) =>
                    setFormData({ ...formData, descriptionBg: e.target.value })
                  }
                  placeholder="Описание на български"
                  className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md text-sm"
                  rows={3}
                  required
                />
              </div>
              <div>
                <Label className="text-sm font-semibold">
                  Описание (EN) <span className="text-red-500">*</span>
                </Label>
                <textarea
                  value={formData.descriptionEn || ""}
                  onChange={(e) =>
                    setFormData({ ...formData, descriptionEn: e.target.value })
                  }
                  placeholder="Description in English"
                  className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md text-sm"
                  rows={3}
                  required
                />
              </div>
            </div>

            <div>
              <Label className="text-sm font-semibold">Icon Name (опционално)</Label>
              <Input
                value={formData.iconName || ""}
                onChange={(e) =>
                  setFormData({ ...formData, iconName: e.target.value })
                }
                placeholder="arrow-left"
                className="mt-1"
              />
              <p className="mt-1 text-xs text-gray-500">
                Отидете на https://lucide.dev/icons/ и изберете име на икона. При преглед на икона се показва името с малки букви и дефиси (arrow-left).
              </p>
            </div>

            <Button type="submit" disabled={uploading} className="w-full">
              {uploading ? "Запазване..." : "Създай"}
            </Button>
          </form>
        </div>
      )}

      <div className="space-y-2">
        {categories.map((category) => (
          <div key={category.id}>
            <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 flex justify-between items-start">
              <div className="flex-1">
                <h3 className="font-semibold text-gray-900">
                  {category.titleBg}
                </h3>
                <p className="text-sm text-gray-600">{category.titleEn}</p>
              </div>
              <div className="flex gap-2">
                {editingId === category.id ? (
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
                    onClick={() => handleEdit(category)}
                    size="sm"
                    variant="outline"
                    className="gap-1"
                  >
                    Редактирай
                  </Button>
                )}
              </div>
            </div>

            {editingId === category.id && (
              <div className="bg-blue-50 p-6 rounded-lg shadow-sm border border-blue-200 border-t-0 rounded-t-none">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-xl font-semibold">Редактирай категория</h3>
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
                        onChange={(e) => handleTitleEnChange(e.target.value)}
                        placeholder="Name in English"
                        className="mt-1"
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label className="text-sm font-semibold">
                        Описание (БГ) <span className="text-red-500">*</span>
                      </Label>
                      <textarea
                        value={formData.descriptionBg || ""}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            descriptionBg: e.target.value,
                          })
                        }
                        placeholder="Описание на български"
                        className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md text-sm"
                        rows={3}
                        required
                      />
                    </div>
                    <div>
                      <Label className="text-sm font-semibold">
                        Описание (EN) <span className="text-red-500">*</span>
                      </Label>
                      <textarea
                        value={formData.descriptionEn || ""}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            descriptionEn: e.target.value,
                          })
                        }
                        placeholder="Description in English"
                        className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md text-sm"
                        rows={3}
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <Label className="text-sm font-semibold">Icon Name (опционално)</Label>
                    <Input
                      value={formData.iconName || ""}
                      onChange={(e) =>
                        setFormData({ ...formData, iconName: e.target.value })
                      }
                      placeholder="arrow-left"
                      className="mt-1"
                    />
                    <p className="mt-1 text-xs text-gray-500">
                      Отидете на https://lucide.dev/icons/ и изберете име на икона. При преглед на икона се показва името с малки букви и дефиси (arrow-left).
                    </p>
                  </div>

                  <Button type="submit" disabled={uploading} className="w-full">
                    {uploading ? "Запазване..." : "Актуализирай"}
                  </Button>
                </form>
              </div>
            )}
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
