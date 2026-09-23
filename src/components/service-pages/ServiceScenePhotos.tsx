import Image from "next/image";
import photos from "../../lib/service-scene-photos.json";

export function ServiceScenePhotos({ path, section }: { path: string; section: "scope" | "process" }) {
  const service = path.replace(/^\/+|\/+$/g, "");
  const selected = photos.filter(photo => photo.service === service && photo.section === section);
  if (!selected.length) return null;
  return <div className="my-6 space-y-5" data-service-scenes={section}>
    {selected.map(photo => <figure key={photo.src} className="overflow-hidden rounded-2xl border border-gray-200 bg-white">
      <picture className="block bg-gray-50">
        <source media="(max-width: 640px)" srcSet={photo.mobileSrc} type="image/webp" />
        <Image src={photo.src} alt={photo.alt} width={photo.width} height={photo.height} unoptimized
          loading="lazy" sizes="(min-width: 1024px) 700px, (min-width: 768px) calc(100vw - 270px), calc(100vw - 48px)"
          className="max-h-[540px] w-full object-contain" />
      </picture>
      <figcaption className="border-t border-gray-100 px-5 py-4 text-[15px] leading-7 text-gray-600">{photo.caption}</figcaption>
    </figure>)}
  </div>;
}
