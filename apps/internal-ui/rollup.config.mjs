import { createRollupConfig } from '@dotoli/rollup-config';
import image from '@rollup/plugin-image';
import postcss from 'rollup-plugin-postcss';

export default createRollupConfig({
  plugins: [
    postcss({
      extract: true,
      minimize: true,
      modules: false,
    }),
    image(),
  ],
});
