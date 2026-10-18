import type { Metadata } from 'next';
import HwagokTrashLanding, { title, description } from '@/components/service-pages/HwagokTrashLanding';
import { buildMetadata } from '@/lib/seo';
export const metadata: Metadata = { ...buildMetadata({ title, description, path: '/preview/hwagok-trash/' }), robots: { index: false, follow: false } };
export default function Page() { return <HwagokTrashLanding preview />; }
