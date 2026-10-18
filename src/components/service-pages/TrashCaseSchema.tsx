import { absoluteUrl } from '@/lib/site-url';
import { siteConfig } from '@/lib/site-config';
export function TrashCaseSchema({ region, area, title, description }: { region: string; area: string; title: string; description: string }) {
  const url = absoluteUrl('/쓰레기집청소/' + region + '/');
  const data = [
    { '@context': 'https://schema.org', '@type': 'Service', name: title, description, url, serviceType: '쓰레기집청소', areaServed: { '@type': 'AdministrativeArea', name: area }, provider: { '@type': 'Organization', name: siteConfig.name, url: absoluteUrl('/') } },
    { '@context': 'https://schema.org', '@type': 'BreadcrumbList', itemListElement: [ ['홈', absoluteUrl('/')], ['쓰레기집청소', absoluteUrl('/쓰레기집청소/')], [area, url] ].map(([name, item], i) => ({ '@type': 'ListItem', position: i + 1, name, item })) },
  ];
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, '\\u003c') }} />;
}
