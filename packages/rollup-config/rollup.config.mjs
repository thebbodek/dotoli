import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';
import peerDepsExternal from 'rollup-plugin-peer-deps-external';

import baseConfig from './base.mjs';
import buildConfig from './build.mjs';
import watchConfig from './watch.mjs';

const isWatch = process.argv.includes('--watch');

/**
 * @typedef {Object} CreateRollupConfigOptions
 * @property {Array} [plugins] - 추가로 사용할 rollup 플러그인들의 배열
 * @property {Array<string>} [external] - 외부 모듈로 간주할 패키지들의 배열
 * @property {string} [srcPath] - src 디렉터리 절대 경로 (e.g. fileURLToPath(new URL('./src', import.meta.url)))
 */

/**
 * @param {CreateRollupConfigOptions} options
 */
export const createRollupConfig = (options) => {
  const {
    plugins: externalPlugins = [],
    external = [],
    srcPath,
  } = options ?? {};

  const config = isWatch ? watchConfig({ srcPath }) : buildConfig;
  const { plugins, ...rest } = config.jsConfig;

  const jsConfig = {
    ...baseConfig,
    ...rest,
    plugins: [
      peerDepsExternal(),
      resolve({ extensions: ['.ts', '.tsx', '.js', '.jsx'] }),
      commonjs({ sourceMap: !isWatch }),
      ...externalPlugins,
      ...plugins,
    ],
    external: [...external, 'react', 'react-dom'],
  };

  return config.dtsConfig ? [jsConfig, config.dtsConfig] : jsConfig;
};
