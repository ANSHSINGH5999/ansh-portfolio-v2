export function ArrowDoodle({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 60 50" className={className} aria-hidden="true" fill="none">
      <path
        d="M4 4 C 20 6, 34 14, 38 30 C 39 34, 38 38, 36 42"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path d="M27 38 L36 42 L34 32" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
