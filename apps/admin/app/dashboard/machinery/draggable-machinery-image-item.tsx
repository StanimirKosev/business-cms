"use client";

import Image from "next/image";
import { Trash2 } from "lucide-react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

interface DraggableMachineryImageItemProps {
  id: string;
  imageUrl: string;
  fileName: string;
  order: number;
  onRemove: () => void;
}

export function DraggableMachineryImageItem({
  id,
  imageUrl,
  fileName,
  order,
  onRemove,
}: DraggableMachineryImageItemProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="flex items-center gap-3 p-2 bg-gray-50 rounded-md border border-gray-200"
    >
      {/* Grip handle */}
      <div
        className="cursor-grab active:cursor-grabbing flex-shrink-0 text-gray-400 hover:text-gray-600"
        {...attributes}
        {...listeners}
        title="Drag to reorder"
      >
        ⋮⋮
      </div>

      {/* Image thumbnail */}
      <div className="relative w-16 h-16 flex-shrink-0">
        <Image
          src={imageUrl}
          alt={fileName}
          fill
          className="object-cover rounded-md"
        />
      </div>

      {/* File info */}
      <div className="flex-1 min-w-0">
        <p className="text-sm text-gray-700 truncate">{fileName}</p>
        <p className="text-xs text-gray-500">Ред: {order + 1}</p>
      </div>

      {/* Delete button */}
      <button
        type="button"
        onClick={onRemove}
        className="p-1 text-red-500 hover:text-red-700 flex-shrink-0"
        title="Премахване"
      >
        <Trash2 size={16} />
      </button>
    </div>
  );
}
