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
  const paths = {
    left: "M15 19l-7-7 7-7",
    right: "M9 5l7 7-7 7",
    down: "M19 9l-7 7-7-7",
  };

  return (
    <button
      onClick={onClick}
      className={`text-[var(--color-white)] hover:text-[var(--color-red)] transition-colors cursor-pointer ${className}`}
      type="button"
      aria-label={ariaLabel}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        className="w-10 h-10"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d={paths[direction]}
        />
      </svg>
    </button>
  );
};

export default ChevronButton;
