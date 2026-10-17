import records from './phase-regions.json';
import { findService, normalizeSegment } from './service-profiles';
import { specialService } from './service-search-copy';

// 2026-10-17 사용자 확인: 아래 11개 서비스 모두 전국 방문 가능.
export const priorityServices = ['화재청소', '특수청소', '침수청소', '쓰레기집청소', '유품정리', '고독사청소', '폐기물처리', '바닥-왁스-코팅', '바닥청소', '냄새-악취-제거', '곰팡이제거'] as const;
export function priorityService(slug: string) {
  const normalized = normalizeSegment(slug);
  if (!(priorityServices as readonly string[]).includes(normalized)) return undefined;
  return normalized === '특수청소' ? specialService : findService(normalized);
}

export type ServiceRegion = { region: string; label: string; province: string; kind: 'administrative' | 'neighborhood'; parent?: string; source: string };
const names: Record<string, string> = { 서울특별시: '서울', 부산광역시: '부산', 대구광역시: '대구', 인천광역시: '인천', 광주광역시: '광주', 대전광역시: '대전', 울산광역시: '울산', 세종특별자치시: '세종', 경기도: '경기', 강원특별자치도: '강원', 충청북도: '충북', 충청남도: '충남', 전북특별자치도: '전북', 전라남도: '전남', 경상북도: '경북', 경상남도: '경남', 제주특별자치도: '제주' };
function labelFor(region: string) {
  const [province, ...parts] = region.split('-');
  // 동명의 중구·서구·고성군 등도 검색 제목에서 구분합니다.
  return [names[province] ?? province, ...parts].join(' ');
}
const neighborhoods: ServiceRegion[] = [
  { region: '경기도-안양시-평촌', label: '평촌', province: '경기도', parent: '경기도-안양시-동안구', kind: 'neighborhood', source: 'https://www.anyang.go.kr/main/contents.do?key=5339' },
  { region: '경기도-안양시-범계', label: '범계', province: '경기도', parent: '경기도-안양시-동안구', kind: 'neighborhood', source: 'https://anyang.go.kr/tour/index.do' },
  { region: '경기도-안양시-인덕원', label: '인덕원', province: '경기도', parent: '경기도-안양시-동안구', kind: 'neighborhood', source: 'https://anyang.go.kr/tour/index.do' },
  { region: '경기도-군포시-산본', label: '산본', province: '경기도', parent: '경기도-군포시', kind: 'neighborhood', source: 'https://dongtan.lh.or.kr/theme/basic/page/dev/dev06.php' },
  { region: '인천광역시-연수구-송도', label: '송도', province: '인천광역시', parent: '인천광역시-연수구', kind: 'neighborhood', source: 'https://www.ifez.go.kr/main/intro/stats/population.do' },
  { region: '인천광역시-서해구-청라', label: '청라', province: '인천광역시', parent: '인천광역시-서해구', kind: 'neighborhood', source: 'https://www.ifez.go.kr/main/intro/stats/population.do' },
  { region: '서울특별시-마포구-홍대', label: '홍대', province: '서울특별시', parent: '서울특별시-마포구', kind: 'neighborhood', source: 'https://tchinese.seoul.go.kr/wp-content/uploads/2024/09/2024_SEOUL_LIFESTYLE_TOUR.pdf' },
  { region: '서울특별시-송파구-잠실', label: '잠실', province: '서울특별시', parent: '서울특별시-송파구', kind: 'neighborhood', source: 'https://korean.visitseoul.net/attractions1/석촌호수공원/KOP001136' },
  { region: '서울특별시-중구-명동', label: '명동', province: '서울특별시', parent: '서울특별시-중구', kind: 'neighborhood', source: 'https://tchinese.seoul.go.kr/wp-content/uploads/2024/09/2024_SEOUL_LIFESTYLE_TOUR.pdf' },
  { region: '서울특별시-용산구-이태원', label: '이태원', province: '서울특별시', parent: '서울특별시-용산구', kind: 'neighborhood', source: 'https://tchinese.seoul.go.kr/wp-content/uploads/2024/09/2024_SEOUL_LIFESTYLE_TOUR.pdf' },
  { region: '부산광역시-부산진구-서면', label: '부산 서면', province: '부산광역시', parent: '부산광역시-부산진구', kind: 'neighborhood', source: 'https://mods.go.kr/boardDownload.es?bid=0056&list_no=425886&seq=1' },
  { region: '부산광역시-중구-남포동', label: '부산 남포동', province: '부산광역시', parent: '부산광역시-중구', kind: 'neighborhood', source: 'https://mods.go.kr/boardDownload.es?bid=0056&list_no=425886&seq=1' },
  { region: '부산광역시-해운대구-센텀시티', label: '센텀시티', province: '부산광역시', parent: '부산광역시-해운대구', kind: 'neighborhood', source: 'https://mods.go.kr/boardDownload.es?bid=0056&list_no=425886&seq=1' },
  { region: '부산광역시-수영구-광안리', label: '광안리', province: '부산광역시', parent: '부산광역시-수영구', kind: 'neighborhood', source: 'https://mods.go.kr/boardDownload.es?bid=0056&list_no=425886&seq=1' },
  { region: '대구광역시-중구-동성로', label: '대구 동성로', province: '대구광역시', parent: '대구광역시-중구', kind: 'neighborhood', source: 'https://tour.daegu.go.kr/index.do?menu_id=00002913&menu_link=%2Ffront%2Ftour%2FtourMapsView.do%3FtourId%3DKOATTR_221' },
  { region: '광주광역시-서구-상무지구', label: '광주 상무지구', province: '광주광역시', parent: '광주광역시-서구', kind: 'neighborhood', source: 'https://tour.gwangju.go.kr/home/sub.cs?m=214' },
];
// 판교는 기존 주소를 재사용합니다. 유동인구 순위나 수치는 추정하지 않습니다.
const normalizeRegion = (region: string) => normalizeSegment(region).trim().replace(/\s+/g, '-');
export const serviceRegions: ServiceRegion[] = records.regions.filter(r => r.region !== '경상북도-군위군').map(r => ({
  region: normalizeRegion(r.region), label: r.region.endsWith('-판교') ? '판교' : labelFor(normalizeRegion(r.region)), province: r.province,
  kind: r.region.endsWith('-판교') ? 'neighborhood' : 'administrative',
  ...(r.region.endsWith('-판교') ? { parent: '경기도-성남시-분당구' } : {}), source: records.source,
}));
// 일부 이전 자료는 구별 항목만 있어 시 전체를 선택할 수 없었습니다.
for (const row of [...serviceRegions]) {
  const parts = row.region.split('-');
  if (parts.length !== 3 || !parts[1].endsWith('시') || !parts[2].endsWith('구')) continue;
  const parent = parts.slice(0, 2).join('-');
  if (!serviceRegions.some(r => r.region === parent)) serviceRegions.push({ region: parent, label: labelFor(parent), province: row.province, kind: 'administrative', source: records.source });
}
serviceRegions.push(...neighborhoods);
export const findServiceRegion = (region: string) => {
  const normalized = normalizeRegion(region);
  return serviceRegions.find(r => r.region === (normalized === '경상북도-군위군' ? '대구광역시-군위군' : normalized));
};
export const serviceRegionPath = (service: string, region: string) => `/${service}/${region}/`;
