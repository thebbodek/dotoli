import alias from '@rollup/plugin-alias';
import dts from 'rollup-plugin-dts';
import esbuild from 'rollup-plugin-esbuild';

const jsConfig = ({ srcPath }) => ({
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

const dtsConfig = {
  input: 'src/index.ts',
  output: [{ file: 'dist/index.d.ts', format: 'esm' }],
  plugins: [dts()],
};

export default ({ srcPath }) => {
  return { dtsConfig, jsConfig: jsConfig({ srcPath }) };
};
