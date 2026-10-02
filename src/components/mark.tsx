export function NexoraMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 32 32"
      className={className}
      aria-hidden="true"
      fill="none"
    >
      <rect x="1.5" y="1.5" width="29" height="29" rx="8" stroke="currentColor" strokeWidth="1.4" opacity="0.55" />
      <path
        d="M8 22V10h3.2l6.2 8.2V10H21v12h-3.2L11.6 13.8V22H8Z"
        fill="currentColor"
      />
      <path d="M7 25.5h18" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" opacity="0.85" />
    </svg>
  );
}
