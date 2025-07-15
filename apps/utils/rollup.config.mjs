import resolve from '@rollup/plugin-node-resolve';
import terser from '@rollup/plugin-terser';
import peerDepsExternal from 'rollup-plugin-peer-deps-external';
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
    peerDepsExternal(),
    resolve(),
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
