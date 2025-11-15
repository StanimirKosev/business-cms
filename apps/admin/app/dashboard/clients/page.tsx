"use client";

import { useEffect, useState } from "react";
import { Button } from "@repo/ui/components/button";
import { Input } from "@repo/ui/components/input";
import { Label } from "@repo/ui/components/label";
import { toast } from "sonner";
import { Plus, Trash2, Edit2, X } from "lucide-react";
import type { Client } from "@repo/database/client";

export default function ClientsPage() {
  const [clients, setClients] = useState<Client[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState<Partial<Client>>({
    nameBg: "",
    nameEn: "",
    logoUrl: "",
    website: "",
  });

  useEffect(() => {
    fetchClients();
  }, []);

  const fetchClients = async () => {
    try {
      setLoading(true);
      const response = await fetch("/api/clients");
      if (response.ok) {
        setClients(await response.json());
      }
    } catch (error) {
      console.error("Error fetching clients:", error);
      toast.error("Грешка при зареждане");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.nameBg || !formData.nameEn) {
      toast.error("Попълнете всички необходими полета");
      return;
    }

    try {
      const url = editingId ? `/api/clients/${editingId}` : "/api/clients";
      const method = editingId ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) throw new Error("Failed to save");

      const savedClient = await response.json();

      if (editingId) {
        setClients(clients.map((c) => (c.id === editingId ? savedClient : c)));
        toast.success("Клиент актуализиран");
      } else {
        setClients([...clients, savedClient]);
        toast.success("Клиент създаден");
      }

      setEditingId(null);
      setShowForm(false);
      setFormData({
        nameBg: "",
        nameEn: "",
        logoUrl: "",
        website: "",
      });
    } catch (error) {
      console.error("Error:", error);
      toast.error("Грешка при запазване");
    }
  };

  const handleEdit = (client: Client) => {
    setFormData(client);
    setEditingId(client.id);
    setShowForm(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Сигурни ли сте?")) return;

    try {
      const response = await fetch(`/api/clients/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) throw new Error("Failed to delete");

      setClients(clients.filter((c) => c.id !== id));
      toast.success("Клиент изтрит");
    } catch (error) {
      console.error("Error:", error);
      toast.error("Грешка при изтриване");
    }
  };

  if (loading) return <div className="p-8">Зареждане...</div>;

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900">Клиенти</h2>
        <Button
          onClick={() => {
            setEditingId(null);
            setShowForm(!showForm);
            if (showForm) {
              setFormData({
                nameBg: "",
                nameEn: "",
                logoUrl: "",
                website: "",
              });
            }
          }}
          className="gap-2"
        >
          <Plus size={16} />
          {showForm && !editingId ? "Отмени" : "Добави клиент"}
        </Button>
      </div>

      {(showForm || editingId) && (
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 mb-8">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-semibold">
              {editingId ? "Редактирай клиент" : "Нов клиент"}
            </h3>
            <button
              onClick={() => {
                setShowForm(false);
                setEditingId(null);
                setFormData({
                  nameBg: "",
                  nameEn: "",
                  logoUrl: "",
                  website: "",
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

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label className="text-sm font-semibold">
                  Logo (Cloudinary URL)
                </Label>
                <Input
                  value={formData.logoUrl || ""}
                  onChange={(e) =>
                    setFormData({ ...formData, logoUrl: e.target.value })
                  }
                  placeholder="https://..."
                  className="mt-1"
                />
              </div>
              <div>
                <Label className="text-sm font-semibold">Website</Label>
                <Input
                  value={formData.website || ""}
                  onChange={(e) =>
                    setFormData({ ...formData, website: e.target.value })
                  }
                  placeholder="https://example.com"
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
        {clients.map((client) => (
          <div
            key={client.id}
            className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 flex justify-between items-start"
          >
            <div className="flex-1">
              <h3 className="font-semibold text-gray-900">{client.nameBg}</h3>
              <p className="text-sm text-gray-600">{client.nameEn}</p>
              {client.website && (
                <p className="text-xs text-blue-600 mt-1">{client.website}</p>
              )}
            </div>
            <div className="flex gap-2">
              <Button
                onClick={() => handleEdit(client)}
                size="sm"
                variant="outline"
                className="gap-1"
              >
                <Edit2 size={14} />
                Редактирай
              </Button>
              <Button
                onClick={() => handleDelete(client.id)}
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

        {clients.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            Няма клиенти. Добавете първи клиент.
          </div>
        )}
      </div>
    </div>
  );
}
