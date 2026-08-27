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
 * @property {string | ((chunk: { name: string }) => string)} [banner] - 청크 최상단에 그대로 붙일 문자열. 함수를 넘기면 청크마다 다르게 붙일 수 있습니다 (e.g. "'use client';")
 * @property {(id: string) => string | undefined} [manualChunks] - 모듈을 어느 청크에 넣을지 결정합니다. 반환값이 청크 이름이 됩니다
 * @property {string} [chunkFileNames] - 청크 파일명 패턴. 미지정 시 rollup 기본값(`[name]-[hash].js`)
 */

/**
 * @param {CreateRollupConfigOptions} options
 */
export const createRollupConfig = (options) => {
  const {
    plugins: externalPlugins = [],
    external = [],
    srcPath,
    banner,
    manualChunks,
    chunkFileNames,
  } = options ?? {};

  const config = isWatch ? watchConfig({ srcPath }) : buildConfig;
  const { plugins, ...rest } = config.jsConfig;

  const jsConfig = {
    ...baseConfig,
    ...rest,
    output: {
      ...baseConfig.output,
      ...rest.output,
      ...(banner && { banner }),
      ...(manualChunks && { manualChunks }),
      ...(chunkFileNames && { chunkFileNames }),
    },
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
