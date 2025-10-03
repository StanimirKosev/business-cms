import { ChevronLeft, ChevronRight, ChevronDown } from "lucide-react";

interface ChevronButtonProps {
  direction: "left" | "right" | "down";
  onClick: () => void;
  ariaLabel: string;
  className?: string;
}

const ChevronButton = ({
  direction,
  onClick,
  ariaLabel,
  className = "",
}: ChevronButtonProps) => {
  const icons = {
    left: ChevronLeft,
    right: ChevronRight,
    down: ChevronDown,
  };

  const Icon = icons[direction];

  return (
    <button
      onClick={onClick}
      className={`text-[var(--color-white)] hover:text-[var(--color-red)] transition-colors cursor-pointer ${className}`}
      type="button"
      aria-label={ariaLabel}
    >
      <Icon className="w-10 h-10" />
    </button>
  );
};

export default ChevronButton;
