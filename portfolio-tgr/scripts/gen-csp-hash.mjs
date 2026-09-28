// postbuild: index.astro's inline scripts are CSP-hash-allowlisted (see public/_headers).
// Both the import map and the module script count against script-src, and the module's
// content changes with every edit, so the hashes can't be hand-maintained. This computes
// them fresh from dist/index.html and stamps them into dist/_headers, replacing the
// __CSP_SCRIPT_HASH__ placeholder. `application/json` blocks are inert and need no hash.
import { readFileSync, writeFileSync } from 'node:fs';
import { createHash } from 'node:crypto';

const indexHtml = readFileSync('dist/index.html', 'utf-8');

const inlineScripts = [...indexHtml.matchAll(/<script([^>]*)>([\s\S]*?)<\/script>/g)]
  .filter(([, attrs]) => !/\ssrc=/.test(attrs))
  .filter(([, attrs]) => /type="(module|importmap)"/.test(attrs))
  .map(([, , content]) => content);

if (inlineScripts.length === 0) {
  throw new Error('gen-csp-hash: no inline module/importmap scripts found in dist/index.html');
}

const sources = inlineScripts
  .map((content) => `'sha256-${createHash('sha256').update(content, 'utf-8').digest('base64')}'`)
  .join(' ');

const headersPath = 'dist/_headers';
const headers = readFileSync(headersPath, 'utf-8');
if (!headers.includes("'__CSP_SCRIPT_HASH__'")) {
  throw new Error('gen-csp-hash: __CSP_SCRIPT_HASH__ placeholder not found in dist/_headers');
}

writeFileSync(headersPath, headers.replace("'__CSP_SCRIPT_HASH__'", sources));
console.log(`gen-csp-hash: stamped ${inlineScripts.length} hash(es) into dist/_headers -> ${sources}`);
