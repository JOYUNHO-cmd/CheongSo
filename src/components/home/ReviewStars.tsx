const STAR_SIZES = [18, 26, 34, 26, 18];
const STAR_LIFT = [0, 6, 11, 6, 0];
const STAR_DELAYS = [0, 0.15, 0.3, 0.45, 0.6];

export default function ReviewStars() {
  return (
    <div
      className="mb-3 flex items-end justify-center gap-1.5 sm:gap-2.5"
      aria-hidden="true"
    >
      {STAR_SIZES.map((size, i) => (
        <svg
          key={i}
          width={size}
          height={size}
          viewBox="0 0 24 24"
          fill="currentColor"
          className="animate-star-twinkle text-amber-400"
          style={{
            marginBottom: `${STAR_LIFT[i]}px`,
            animationDelay: `${STAR_DELAYS[i]}s`,
            filter: "drop-shadow(0 2px 6px rgba(251,191,36,0.55))",
          }}
        >
          <path d="M12 2.5l2.6 5.77 6.34.6-4.79 4.32 1.42 6.26L12 16.35l-5.57 3.1 1.42-6.26-4.79-4.32 6.34-.6L12 2.5z" />
        </svg>
      ))}
    </div>
  );
}
