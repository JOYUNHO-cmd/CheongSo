// Kept for existing workflows. The current auditor covers every sitemap page,
// including custom landings, and does not hard-code service counts or schema order.
process.argv[2] ||= 'http://localhost:3100';
process.argv[3] ||= '.qa/seo-audit.json';
if (!process.argv.includes('--strict')) process.argv.push('--strict');
await import('./audit-seo.mjs');
