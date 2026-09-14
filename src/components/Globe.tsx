export default function Globe({ className = "" }: { className?: string }) {
  return (
    <div className={`relative ${className}`}>
      <svg
        viewBox="0 0 200 200"
        className="h-full w-full"
        style={{ animation: "spin 40s linear infinite" }}
      >
        <circle cx="100" cy="100" r="72" stroke="rgba(255,255,255,0.25)" strokeWidth="1" fill="none" />
        <ellipse cx="100" cy="100" rx="72" ry="26" stroke="rgba(255,255,255,0.18)" strokeWidth="1" fill="none" />
        <ellipse cx="100" cy="100" rx="72" ry="52" stroke="rgba(255,255,255,0.18)" strokeWidth="1" fill="none" />
        <ellipse cx="100" cy="100" rx="26" ry="72" stroke="rgba(255,255,255,0.18)" strokeWidth="1" fill="none" />
        <ellipse cx="100" cy="100" rx="52" ry="72" stroke="rgba(255,255,255,0.18)" strokeWidth="1" fill="none" />
        <line x1="28" y1="100" x2="172" y2="100" stroke="rgba(255,255,255,0.25)" strokeWidth="1" />
      </svg>
      <div
        className="absolute inset-0 rounded-full"
        style={{
          background:
            "radial-gradient(circle at 35% 30%, rgba(255,255,255,0.06), rgba(255,255,255,0) 60%)",
        }}
      />
      <style>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}
