import Image from "next/image";

export default function Logo({ className = "h-9 w-auto" }: { className?: string }) {
  return (
    <Image
      src="/logo.png"
      alt="찐청소"
      width={686}
      height={364}
      className={className}
      priority
    />
  );
}
