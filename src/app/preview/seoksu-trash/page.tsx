import type { Metadata } from 'next';
import SeoksuTrashLanding, { title, description } from '@/components/service-pages/SeoksuTrashLanding';
import { buildMetadata } from '@/lib/seo';
export const metadata: Metadata = { ...buildMetadata({ title, description, path: '/preview/seoksu-trash/' }), robots: { index: false, follow: false } };
export default function Page() { return <SeoksuTrashLanding preview />; }
