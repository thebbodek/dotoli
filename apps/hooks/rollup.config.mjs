import resolve from '@rollup/plugin-node-resolve';
import terser from '@rollup/plugin-terser';
import peerDepsExternal from 'rollup-plugin-peer-deps-external';
import typescript from 'rollup-plugin-typescript2';

export default {
  input: 'src/index.ts',
  output: {
    dir: 'dist',
    format: 'es',
    sourcemap: true,
    preserveModules: true,
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
        drop_console: true,
        drop_debugger: true,
      },
      format: {
        comments: false,
      },
    }),
  ],
  external: ['react', 'react-dom', 'next'],
};
