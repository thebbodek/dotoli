import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';
import terser from '@rollup/plugin-terser';
import peerDepsExternal from 'rollup-plugin-peer-deps-external';
import typescript from 'rollup-plugin-typescript2';

const isWatch = process.argv.includes('--watch');

export const createRollupConfig = (options) => {
  const { plugins = [], external = [] } = options ?? {};

  return {
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
      commonjs(),
      resolve(),
      ...plugins,
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
          comments: false,
        },
      }),
    ],
    external: [...external, 'react', 'react-dom'],
  };
};
