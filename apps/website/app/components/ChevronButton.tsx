import { ChevronLeft, ChevronRight, ChevronDown } from "lucide-react";

interface ChevronButtonProps {
  direction: "left" | "right" | "down";
  onClick: () => void;
  ariaLabel: string;
  className?: string;
  disabled?: boolean;
}

const ChevronButton = ({
  direction,
  onClick,
  ariaLabel,
  className = "",
  disabled = false,
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
      disabled={disabled}
      className={`text-[var(--color-white)] hover:text-[var(--color-red)] transition-colors ${
        disabled ? "opacity-30 pointer-events-none" : "cursor-pointer"
      } ${className}`}
      type="button"
      aria-label={ariaLabel}
    >
      <Icon className="w-10 h-10" />
    </button>
  );
};

export default ChevronButton;
