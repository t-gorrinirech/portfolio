// Entry point for `npm run vendor:ogl`. Only re-exports the pieces the
// WebGL background (initBackgroundGL in src/pages/index.astro) actually
// imports, so esbuild can tree-shake the rest of the ogl library out of
// the bundle shipped to /vendor/ogl.js.
export { Renderer, Program, Mesh, Color, Triangle } from 'ogl';
