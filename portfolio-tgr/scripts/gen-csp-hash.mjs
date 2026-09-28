// postbuild: index.astro's inline module script is CSP-hash-allowlisted (see public/_headers).
// Its content changes with every edit (translations, machines carousel logic, etc.), so the
// hash can't be hand-maintained — this computes it fresh from dist/index.html and stamps it
// into dist/_headers, replacing the __CSP_SCRIPT_HASH__ placeholder.
import { readFileSync, writeFileSync } from 'node:fs';
import { createHash } from 'node:crypto';

const indexHtml = readFileSync('dist/index.html', 'utf-8');
const match = indexHtml.match(/<script type="module">([\s\S]*?)<\/script>/);
if (!match) {
  throw new Error('gen-csp-hash: inline <script type="module"> not found in dist/index.html');
}

const hash = createHash('sha256').update(match[1], 'utf-8').digest('base64');

const headersPath = 'dist/_headers';
const headers = readFileSync(headersPath, 'utf-8');
if (!headers.includes('__CSP_SCRIPT_HASH__')) {
  throw new Error('gen-csp-hash: __CSP_SCRIPT_HASH__ placeholder not found in dist/_headers');
}

writeFileSync(headersPath, headers.replace('__CSP_SCRIPT_HASH__', `sha256-${hash}`));
console.log(`gen-csp-hash: stamped sha256-${hash} into dist/_headers`);
