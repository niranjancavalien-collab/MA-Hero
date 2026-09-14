import { useState } from "react";

interface NavItemProps {
  label: string;
  href?: string;
  onClick?: () => void;
  className?: string;
}

/**
 * Two stacked copies of the label share one clipped box. Hovering bumps a
 * cycle counter, which re-keys both spans so their CSS animations restart
 * every time — the base copy flies up and out while the duplicate flies up
 * and into place from below.
 */
export default function NavItem({ label, href = "#", onClick, className = "" }: NavItemProps) {
  const [cycle, setCycle] = useState(0);

  return (
    <a
      href={href}
      onClick={onClick}
      onMouseEnter={() => setCycle((c) => c + 1)}
      className={`group relative block h-[1.15em] overflow-hidden text-[13px] font-medium tracking-wide text-white/64 transition-colors duration-300 hover:text-white ${className}`}
    >
      <span
        key={`base-${cycle}`}
        className="block"
        style={cycle > 0 ? { animation: "flyOutUp 0.4s cubic-bezier(0.4,0,0.2,1) forwards" } : undefined}
      >
        {label}
      </span>
      <span
        key={`dup-${cycle}`}
        className="absolute left-0 top-0 block"
        style={
          cycle > 0
            ? { animation: "flyInUp 0.4s cubic-bezier(0.4,0,0.2,1) forwards" }
            : { transform: "translateY(150%)", opacity: 0 }
        }
      >
        {label}
      </span>
    </a>
  );
}
