interface LogoProps {
  className?: string;
  markOnly?: boolean;
}

/**
 * Abstract mark: three nodes in a loose triangle, connected — a candidate,
 * a role, and an outcome, always in reach of each other. Reads at 20px and
 * scales cleanly for the footer.
 */
export default function Logo({ className = "", markOnly = false }: LogoProps) {
  return (
    <div className={`inline-flex items-center gap-2.5 ${className}`}>
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M4 16.5L11 4L18 16.5H4Z"
          stroke="currentColor"
          strokeWidth="1.4"
          strokeLinejoin="round"
        />
        <circle cx="11" cy="4" r="1.6" fill="currentColor" />
        <circle cx="4" cy="16.5" r="1.6" fill="currentColor" />
        <circle cx="18" cy="16.5" r="1.6" fill="currentColor" />
      </svg>
      {!markOnly && (
        <span className="font-sans text-[15px] font-semibold tracking-tight text-white">
          myanatomy
        </span>
      )}
    </div>
  );
}
