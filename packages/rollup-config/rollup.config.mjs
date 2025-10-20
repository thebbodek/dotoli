import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';
import terser from '@rollup/plugin-terser';
import peerDepsExternal from 'rollup-plugin-peer-deps-external';

import baseConfig from './base.mjs';
import buildConfig from './build.mjs';
import watchConfig from './watch.mjs';

const isWatch = process.argv.includes('--watch');

export const createRollupConfig = (options) => {
  const {
    plugins: externalPlugins = [],
    external = [],
    srcPath,
  } = options ?? {};

  const config = isWatch ? watchConfig({ srcPath }) : buildConfig;
  const { plugins, ...rest } = config;

  return {
    ...baseConfig,
    ...rest,
    plugins: [
      peerDepsExternal(),
      resolve({ extensions: ['.ts', '.tsx', '.js', '.jsx'] }),
      commonjs({ sourceMap: !isWatch }),
      ...externalPlugins,
      ...plugins,
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
