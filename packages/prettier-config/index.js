import config from './base.js';

/**
 * @typedef {Object} CreatePrettierConfigOptions
 * @property {string[]} internalImports
 */

/**
 * @param {CreatePrettierConfigOptions} options
 * @returns {import("prettier").Config}
 */
export const createPrettierConfig = (options) => {
  const { internalImports = [] } = options ?? {};
  const [absolutePath, relativePath] = config.importOrder;
  const importOrders = [absolutePath, ...internalImports, relativePath];

  return {
    ...config,
    importOrder: [importOrders.join('|')],
  };
};

export default createPrettierConfig();
