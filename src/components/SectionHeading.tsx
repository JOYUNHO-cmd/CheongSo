import React from "react";

export default function SectionHeading({
  eyebrow,
  title,
  description,
  light = false,
  as: Heading = "h2",
  titleClassName,
}: {
  eyebrow?: string;
  title: string;
  description?: React.ReactNode;
  light?: boolean;
  as?: "h1" | "h2";
  titleClassName?: string;
}) {
  return (
    <div className="mb-10 text-center">
      {eyebrow && (
        <p className={`text-sm font-bold tracking-widest ${light ? "text-brand-light" : "text-brand"}`}>
          {eyebrow}
        </p>
      )}
      <Heading
        className={`${eyebrow ? "mt-2" : ""} ${
          titleClassName || "text-[15.5px] min-[360px]:text-[16.5px] min-[390px]:text-[18px] sm:text-2xl md:text-3xl"
        } font-black tracking-tight whitespace-nowrap sm:whitespace-normal ${light ? "text-white" : "text-gray-900"}`}
      >
        {title}
      </Heading>
      {description && (
        <p className={`mt-3 text-[13px] min-[360px]:text-sm md:text-base ${light ? "text-gray-200" : "text-gray-500"}`}>
          {description}
        </p>
      )}
    </div>
  );
}
