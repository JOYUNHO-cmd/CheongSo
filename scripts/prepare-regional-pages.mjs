import { existsSync, readdirSync, readFileSync, statSync, writeFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import ts from 'typescript';
import { validateRegionalPages } from './lib/regional-content.mjs';

const projectRoot = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const json = path => JSON.parse(readFileSync(path, 'utf8'));

export function serviceSlugs(root = projectRoot) {
  // Read the actual profile rows with the TypeScript parser. No second service
  // list is maintained, and no application module is executed by this script.
  const path = resolve(root, 'src/lib/service-profiles.ts');
  const source = ts.createSourceFile(path, readFileSync(path, 'utf8'), ts.ScriptTarget.Latest, true);
  const rows = source.statements.filter(ts.isVariableStatement).flatMap(statement => statement.declarationList.declarations).find(declaration => ts.isIdentifier(declaration.name) && declaration.name.text === 'rows')?.initializer;
  if (!rows || !ts.isArrayLiteralExpression(rows) || rows.elements.some(row => !ts.isArrayLiteralExpression(row) || !ts.isStringLiteral(row.elements[0]))) throw new Error('서비스 목록 형식 확인 필요: service-profiles.ts rows');
  const overrides = json(resolve(root, 'src/lib/service-slugs.json'));
  return new Set(rows.elements.map(row => overrides[row.elements[0].text] || row.elements[0].text));
}

export function prepareRegionalPages(root = projectRoot) {
  const base = json(resolve(root, 'src/lib/regional-pages.json'));
  const regionRecords = json(resolve(root, 'src/lib/phase-regions.json'));
  const directory = resolve(root, 'content/regional');
  const imports = existsSync(directory) ? readdirSync(directory).filter(name => /^[a-f0-9]{64}\.json$/.test(name)).sort().map(name => json(resolve(directory, name))) : [];
  const all = [...base, ...imports];
  validateRegionalPages(all, {
    services: serviceSlugs(root),
    regions: new Set(regionRecords.regions.map(region => region.region)),
    fileExists: source => {
      const path = resolve(root, 'public', `.${source}`);
      return existsSync(path) && statSync(path).isFile();
    },
  });
  const approved = imports.filter(page => page.reviewed);
  const snapshot = resolve(root, 'src/lib/regional-imports.json');
  const serialized = `${JSON.stringify(approved, null, 2)}\n`;
  // Avoid unnecessary rebuilds when the approved publication snapshot is unchanged.
  if (!existsSync(snapshot) || readFileSync(snapshot, 'utf8') !== serialized) writeFileSync(snapshot, serialized);
  return { reviewed: all.filter(page => page.reviewed).length, imported: approved.length };
}

if (process.argv[1] && import.meta.url === pathToFileURL(resolve(process.argv[1])).href) {
  const result = prepareRegionalPages();
  console.log(`지역 문서 사전검증 완료: ${result.reviewed}개 공개 문서, ${result.imported}개 외부 문서`);
}
