export default function SectionHeading({
  eyebrow,
  title,
  description,
  light = false,
}: {
  eyebrow: string;
  title: string;
  description?: string;
  light?: boolean;
}) {
  return (
    <div className="mb-10 text-center">
      <p className={`text-sm font-bold tracking-widest ${light ? "text-brand-light" : "text-brand"}`}>
        {eyebrow}
      </p>
      <h2 className={`mt-2 text-2xl font-black md:text-3xl ${light ? "text-white" : "text-gray-900"}`}>
        {title}
      </h2>
      {description && (
        <p className={`mt-3 text-sm md:text-base ${light ? "text-gray-200" : "text-gray-500"}`}>
          {description}
        </p>
      )}
    </div>
  );
}
