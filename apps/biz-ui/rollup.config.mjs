import { createRollupConfig } from '@dotoli/rollup-config';
import image from '@rollup/plugin-image';
import json from '@rollup/plugin-json';
import postcss from 'rollup-plugin-postcss';
import { fileURLToPath } from 'url';

export default createRollupConfig({
  external: [
    '@floating-ui/react',
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
