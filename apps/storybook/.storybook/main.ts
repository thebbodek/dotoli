import type { StorybookConfig } from '@storybook/nextjs';
import { dirname, join } from 'path';

/**
 * This function is used to resolve the absolute path of a package.
 * It is needed in projects that use Yarn PnP or are set up within a monorepo.
 */
const getAbsolutePath = (value: string) =>
  dirname(require.resolve(join(value, 'package.json')));

const getOptionalAbsolutePath = (value: string) => {
  try {
    return getAbsolutePath(value);
  } catch {
    return null;
  }
};

const addonMcpPath = getOptionalAbsolutePath('@storybook/addon-mcp');

const addons: StorybookConfig['addons'] = [
  getAbsolutePath('@storybook/addon-essentials'),
  getAbsolutePath('@chromatic-com/storybook'),
  getAbsolutePath('@storybook/experimental-addon-test'),
];

if (addonMcpPath) {
  addons.push({
    name: addonMcpPath,
    options: {
      toolsets: {
        dev: true,
        docs: true,
      },
      experimentalFormat: 'markdown',
    },
  });
}

const config: StorybookConfig = {
  stories: ['../src/**/*.mdx', '../src/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
  addons,
  framework: {
    name: getAbsolutePath('@storybook/nextjs'),
    options: {},
  },
  staticDirs: ['../public'],
  typescript: {
    reactDocgen: 'react-docgen',
    check: false,
  },
  features: {
    ...(addonMcpPath ? { experimentalComponentsManifest: true } : {}),
  },
};
export default config;
