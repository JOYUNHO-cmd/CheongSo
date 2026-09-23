import Link from "next/link";
import Image from "next/image";
import galleryData from "@/lib/gallery-data.json";
import { galleryHref } from "@/lib/gallery-navigation";
import { serviceConnections } from "@/lib/service-connections";

function connectionFor(path: string) {
  return serviceConnections[path.replace(/^\/+|\/+$/g, "")];
}

export function ServiceNextStep({ path }: { path: string }) {
  const connection = connectionFor(path);
  if (!connection) return null;
  return <aside aria-label="상황에 맞는 관련 서비스" className="mt-6 rounded-2xl border border-brand/20 bg-brand-light/40 p-5 sm:p-6">
    <h3 className="text-lg font-bold text-brand-dark">{connection.heading}</h3>
    <p className="mt-3 leading-8">{connection.body}</p>
    <ul className="mt-4 space-y-3">
      {connection.links.map(([label, href]) => <li key={href}><Link href={href} className="font-bold text-brand-dark underline decoration-brand/40 underline-offset-4 hover:decoration-brand">{label} →</Link></li>)}
    </ul>
  </aside>;
}

export function ServicePhotoLinks({ path }: { path: string }) {
  const connection = connectionFor(path);
  if (!connection?.gallery && !connection?.cases?.length) return null;
  const photos = galleryData.flatMap(category => category.items
    .filter(item => connection.cases?.includes(item.id))
    .map(item => ({ ...item, category: category.slug })));
  return <div className="mt-8 rounded-2xl border border-gray-200 p-5 sm:p-6">
    <h3 className="text-lg font-bold text-brand-dark">등록된 현장 사진으로 살펴보세요</h3>
    <p className="mt-2 text-sm leading-7 text-gray-600">사진에 표시된 작업 전후 상태를 비교해 보세요. 현장마다 작업 범위가 다르며, 사진만으로 비용·작업 시간이나 냄새 제거 여부까지 판단할 수는 없습니다.</p>
    {photos.length > 0 && <ul className="mt-5 grid gap-4 sm:grid-cols-2">
      {photos.map(item => <li key={item.id}><Link href={galleryHref(item.category, item.id)} className="block overflow-hidden rounded-xl border border-gray-100 hover:border-brand">
        <div className="grid grid-cols-2">
          {([['작업 전', item.before, item.beforeWidth, item.beforeHeight], ['작업 후', item.after, item.afterWidth, item.afterHeight]] as const).map(([label, file, width, height]) => <div key={file}>
            <Image src={`/images/gallery-v2/${file}`} alt={`${item.title} · ${label}`} width={width} height={height} sizes="(min-width: 640px) 190px, 40vw" className="aspect-square w-full object-cover" />
            <p className="bg-gray-50 py-1 text-center text-xs text-gray-600">{label}</p>
          </div>)}
        </div>
        <p className="p-3 text-sm font-bold text-brand-dark">{item.title} · 크게 보기 →</p>
      </Link></li>)}
    </ul>}
    {connection.gallery && <Link href={galleryHref(connection.gallery)} className="mt-5 inline-block font-bold text-brand-dark underline underline-offset-4">해당 분야 현장 사진 더 보기 →</Link>}
  </div>;
}

// 지역명을 추정하지 않고, 등록 제목에 지역이 명시된 자료만 선별합니다.
const regionalCaseIds: Record<string, string[]> = {
  "/사무실청소/": ["office-g14", "office-g20"],
  "/공장청소/": ["factory-g02", "factory-g04", "factory-g03"],
  "/화재청소/": ["fire-g02", "fire-g03", "fire-g04"],
  "/바닥-왁스-코팅/": ["floor-wax-g27", "floor-wax-g30", "floor-wax-g31"],
};

export function RegionalPhotoLinks({ path }: { path: string }) {
  const ids = regionalCaseIds[path];
  if (!ids) return null;
  const photos = galleryData.flatMap(category => category.items.filter(item => ids.includes(item.id)).map(item => ({ ...item, category: category.slug })));
  return <div className="mt-6 rounded-xl bg-gray-50 p-5">
    <h3 className="font-bold text-brand-dark">지역이 표시된 작업 사진</h3>
    <p className="mt-2 text-sm leading-7 text-gray-600">등록된 사진 제목을 그대로 안내합니다. 같은 지역이어도 현장 조건과 작업 범위는 다르며, 방문 가능 여부와 일정은 주소를 기준으로 확인합니다.</p>
    <ul className="mt-3 space-y-2">{photos.map(item => <li key={item.id}><Link href={galleryHref(item.category, item.id)} className="font-bold text-brand-dark underline underline-offset-4">{item.title} →</Link></li>)}</ul>
    {path === "/바닥-왁스-코팅/" && <p className="mt-4"><Link href="/바닥-왁스-코팅/경기도-안양시/" className="font-bold text-brand-dark underline underline-offset-4">안양 바닥왁스코팅 상담 안내 →</Link></p>}
  </div>;
}
