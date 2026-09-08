export default function Logo({ className = "h-9 w-9" }: { className?: string }) {
  return (
    <svg viewBox="0 0 100 100" className={className} aria-hidden="true">
      <defs>
        <linearGradient id="logo-outer" x1="20" y1="10" x2="80" y2="90" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#38bdf8" />
          <stop offset="100%" stopColor="#1d4ed8" />
        </linearGradient>
        <linearGradient id="logo-inner" x1="20" y1="20" x2="75" y2="85" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#2563eb" />
          <stop offset="100%" stopColor="#1e3a8a" />
        </linearGradient>
        <mask id="logo-crescent-outer">
          <rect width="100" height="100" fill="white" />
          <circle cx="62" cy="48" r="30" fill="black" />
        </mask>
        <mask id="logo-crescent-inner">
          <rect width="100" height="100" fill="white" />
          <circle cx="58" cy="53" r="21" fill="black" />
        </mask>
      </defs>
      <circle cx="47" cy="48" r="38" fill="url(#logo-outer)" mask="url(#logo-crescent-outer)" />
      <circle cx="46" cy="53" r="27" fill="url(#logo-inner)" mask="url(#logo-crescent-inner)" />
      <path d="M70 32 L72.5 38 L79 40.5 L72.5 43 L70 49 L67.5 43 L61 40.5 L67.5 38 Z" fill="#38bdf8" />
      <path d="M83 47 L84.5 50.5 L88 52 L84.5 53.5 L83 57 L81.5 53.5 L78 52 L81.5 50.5 Z" fill="#60a5fa" />
      <path d="M72 58 L73.7 62 L77.7 63.7 L73.7 65.4 L72 69.4 L70.3 65.4 L66.3 63.7 L70.3 62 Z" fill="#38bdf8" />
    </svg>
  );
}
