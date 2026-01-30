import { createRollupConfig } from '@dotoli/rollup-config';
import { fileURLToPath } from 'url';

export default createRollupConfig({
  srcPath: fileURLToPath(new URL('./src', import.meta.url)),
  external: ['react-hot-toast'],
});
