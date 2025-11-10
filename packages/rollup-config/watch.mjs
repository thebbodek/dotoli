import alias from '@rollup/plugin-alias';
import esbuild from 'rollup-plugin-esbuild';

export default ({ srcPath }) => ({
  plugins: [
    alias({
      entries: [{ find: '@', replacement: srcPath }],
    }),
    esbuild({
      sourceMap: true,
      tsconfig: './tsconfig.build.json',
    }),
  ],
});
