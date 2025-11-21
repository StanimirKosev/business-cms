"use client";

import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { ReactNode } from "react";
import { GripVertical } from "lucide-react";

interface DraggableItemProps {
  id: string;
  isSelected?: boolean;
  children: ReactNode;
}

/**
 * Reusable draggable item component for dnd-kit sortable lists
 * Only the grip icon is draggable for better UX (can click other elements without dragging)
 *
 * Usage:
 * ```tsx
 * <DraggableItem id={item.id} isSelected={selected}>
 *   <YourContent />
 * </DraggableItem>
 * ```
 */
export function DraggableItem({
  id,
  isSelected = false,
  children,
}: DraggableItemProps) {
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
    <div ref={setNodeRef} style={style}>
      <div
        className={`bg-white p-4 rounded-lg shadow-sm border border-gray-200 flex items-start gap-3 ${
          isSelected ? "border-blue-400 bg-blue-50" : ""
        }`}
      >
        {/* Only the grip icon is draggable */}
        <div
          className="cursor-grab active:cursor-grabbing flex-shrink-0 pt-1"
          suppressHydrationWarning
          {...attributes}
          {...listeners}
        >
          <GripVertical size={18} className="text-gray-400" />
        </div>

        {/* Content area is NOT draggable, allowing clicks on buttons/links */}
        <div className="flex-1">{children}</div>
      </div>
    </div>
  );
}
