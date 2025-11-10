import { createRollupConfig } from '@dotoli/rollup-config';
import { fileURLToPath } from 'url';

export default createRollupConfig({
  external: ['next'],
  srcPath: fileURLToPath(new URL('./src', import.meta.url)),
});
