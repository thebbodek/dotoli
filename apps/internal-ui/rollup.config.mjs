import commonjs from '@rollup/plugin-commonjs';
import image from '@rollup/plugin-image';
import resolve from '@rollup/plugin-node-resolve';
import terser from '@rollup/plugin-terser';
import peerDepsExternal from 'rollup-plugin-peer-deps-external';
import postcss from 'rollup-plugin-postcss';
import typescript from 'rollup-plugin-typescript2';

const isWatch = process.argv.includes('--watch');

export default {
  input: 'src/index.ts',
  watch: {
    include: 'src/**',
  },
  output: {
    dir: 'dist',
    format: 'es',
    sourcemap: true,
    entryFileNames: '[name].es.js',
  },
  plugins: [
    postcss({
      extract: true,
      minimize: true,
      modules: false,
    }),
    peerDepsExternal(),
    resolve(),
    commonjs(),
    image(),
    typescript({
      tsconfig: './tsconfig.build.json',
      useTsconfigDeclarationDir: true,
      clean: true,
      tsconfigOverride: {
        compilerOptions: {
          emitDeclarationOnly: false,
        },
      },
    }),
    terser({
      compress: {
        drop_console: !isWatch,
        drop_debugger: !isWatch,
      },
      format: {
        comments: isWatch,
      },
    }),
  ],
  external: ['react', 'react-dom'],
};
