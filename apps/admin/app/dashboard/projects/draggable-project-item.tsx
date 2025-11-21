"use client";

import { Button } from "@repo/ui/components/button";
import { Trash2, Edit2, X } from "lucide-react";
import type { Project, Category, Client } from "@repo/database/client";
import { isRecordProtected } from "@/lib/constants";
import { DraggableItem } from "@/app/components/DraggableItem";

export function DraggableProjectItem({
  project,
  editingId,
  onEdit,
  onDelete,
  onCancel,
  isSelected,
}: {
  project: Project & {
    images?: Array<{ id: string; cloudinaryPublicId: string; order: number }>;
    category?: Category;
    client?: Client | null;
  };
  editingId: string | null;
  onEdit: (
    project: Project & {
      images?: Array<{ id: string; cloudinaryPublicId: string; order: number }>;
      category?: Category;
      client?: Client | null;
    }
  ) => void;
  onDelete: (id: string) => void;
  onCancel: () => void;
  isSelected: boolean;
}) {
  return (
    <DraggableItem id={project.id} isSelected={isSelected}>
      <div className="flex-1">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="font-semibold text-gray-900">{project.titleBg}</h3>
            <p className="text-sm text-gray-600">
              Локация: {project.locationBg || "-"}
            </p>
            <p className="text-xs text-gray-500 mt-1">Код: {project.slug}</p>
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

          <div className="flex gap-2 flex-shrink-0 ml-4">
            {editingId === project.id ? (
              <Button
                onClick={onCancel}
                size="sm"
                variant="outline"
                className="gap-1"
              >
                <X size={14} />
                Отмени
              </Button>
            ) : (
              <Button
                onClick={() => onEdit(project)}
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
                onClick={() => onDelete(project.id)}
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
      </div>
    </DraggableItem>
  );
}
