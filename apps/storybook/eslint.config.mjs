import { next } from '@bbodek/eslint-config';
import storybook from 'eslint-plugin-storybook';
import { defineConfig } from 'eslint/config';

export default defineConfig([
  ...next,
  ...storybook.configs['flat/recommended'],
  {
    rules: {
      /* Storybook 8은 Meta·StoryObj를 @storybook/react에서만 export한다.
       * 프레임워크 패키지(@storybook/nextjs) import는 SB9부터 가능하므로
       * SB9 마이그레이션 때 이 룰을 다시 켠다 */
      'storybook/no-renderer-packages': 'off',
    },
  },
]);
