import { createRollupConfig } from '@dotoli/rollup-config';
import image from '@rollup/plugin-image';
import json from '@rollup/plugin-json';
import postcss from 'rollup-plugin-postcss';
import { fileURLToPath } from 'url';

const CLIENT_CHUNK = 'client';
const SHARED_CHUNK = 'shared';
const CLIENT_DIRECTIVE = "'use client';";
const COMPONENTS_SEGMENT = '/src/components/';
const VARIANTS_SEGMENT = '/src/variants/';
const SERVER_SAFE_SEGMENTS = ['/constants/', '/types/', '/utils/'];

const resolveChunk = (id) => {
  const modulePath = id.split('\\').join('/');

  if (modulePath.includes(VARIANTS_SEGMENT)) return SHARED_CHUNK;
  if (!modulePath.includes(COMPONENTS_SEGMENT)) return;
  if (SERVER_SAFE_SEGMENTS.some((segment) => modulePath.includes(segment)))
    return SHARED_CHUNK;

  return CLIENT_CHUNK;
};

export default createRollupConfig({
  banner: (chunk) => (chunk.name === CLIENT_CHUNK ? CLIENT_DIRECTIVE : ''),
  manualChunks: resolveChunk,
  chunkFileNames: '[name].es.js',
  external: [
    '@phosphor-icons/core',
    'clsx',
    'dayjs',
    'es-toolkit',
  ],
  plugins: [
    postcss({
      extract: true,
      minimize: true,
      modules: false,
    }),
    image(),
    json(),
  ],
  srcPath: fileURLToPath(new URL('./src', import.meta.url)),
});
