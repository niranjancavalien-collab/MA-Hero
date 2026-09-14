import { useState } from "react";
import { ArrowUpRight } from "lucide-react";

interface CtaButtonProps {
  label: string;
  onClick?: () => void;
  variant?: "glass" | "solid";
  size?: "lg" | "sm";
  cycle?: number;
  onHoverStart?: () => void;
  className?: string;
}

export default function CtaButton({
  label,
  onClick,
  variant = "glass",
  size = "lg",
  cycle,
  onHoverStart,
  className = "",
}: CtaButtonProps) {
  const [internalCycle, setInternalCycle] = useState(0);
  const activeCycle = cycle ?? internalCycle;

  const handleEnter = () => {
    if (onHoverStart) onHoverStart();
    else setInternalCycle((c) => c + 1);
  };

  const base =
    "group relative inline-flex items-center gap-3 rounded-full font-medium transition-colors duration-500 ease-[cubic-bezier(0.4,0,0.2,1)]";

  const sizing = size === "lg" ? "px-7 py-4 text-[15px]" : "px-5 py-3 text-[13px]";

  const palette =
    variant === "glass"
      ? "bg-white/8 text-white backdrop-blur-[80px] hover:bg-white hover:text-black"
      : "bg-white text-black hover:bg-white/85";

  return (
    <button
      type="button"
      onClick={onClick}
      onMouseEnter={handleEnter}
      className={`${base} ${sizing} ${palette} ${className}`}
    >
      <span>{label}</span>
      <span className="relative block h-4 w-4 overflow-hidden">
        <ArrowUpRight
          key={`out-${activeCycle}`}
          className="absolute inset-0 h-4 w-4"
          style={
            activeCycle > 0
              ? { animation: "flyOutRight 0.5s cubic-bezier(0.4,0,0.2,1) forwards" }
              : undefined
          }
        />
        <ArrowUpRight
          key={`in-${activeCycle}`}
          className="absolute inset-0 h-4 w-4"
          style={
            activeCycle > 0
              ? { animation: "flyInLeft 0.5s cubic-bezier(0.4,0,0.2,1) forwards" }
              : { transform: "translateX(-250%)", opacity: 0 }
          }
        />
      </span>
    </button>
  );
}
