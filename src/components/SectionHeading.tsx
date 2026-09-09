export default function SectionHeading({
  eyebrow,
  title,
  description,
  light = false,
  as: Heading = "h2",
}: {
  eyebrow: string;
  title: string;
  description?: string;
  light?: boolean;
  as?: "h1" | "h2";
}) {
  return (
    <div className="mb-10 text-center">
      <p className={`text-sm font-bold tracking-widest ${light ? "text-brand-light" : "text-brand"}`}>
        {eyebrow}
      </p>
      <Heading className={`mt-2 text-2xl font-black md:text-3xl ${light ? "text-white" : "text-gray-900"}`}>
        {title}
      </Heading>
      {description && (
        <p className={`mt-3 text-sm md:text-base ${light ? "text-gray-200" : "text-gray-500"}`}>
          {description}
        </p>
      )}
    </div>
  );
}
