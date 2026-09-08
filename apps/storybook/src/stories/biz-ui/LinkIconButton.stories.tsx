import {
  Flex,
  ICON_BUTTON_SIZES,
  ICON_BUTTON_THEMES,
  IconButtonTheme,
  LinkIconButton,
  Typography,
} from '@bbodek/biz-ui';
import { Meta, StoryObj } from '@storybook/react';

import { default as IconButtonMeta } from '@/stories/biz-ui/IconButton.stories';

const {
  iconKey,
  weight,
  theme,
  size,
  'aria-label': ariaLabelArgType,
} = IconButtonMeta.argTypes ?? {};

// dark 테마는 흰 아이콘이라 밝은 배경에서 안 보인다 (IconButton 스토리와 같은 처리)
const DARK_THEME_BACKDROP = 'bg-gray-900 rounded-md p-3';

const getBackdrop = (buttonTheme: IconButtonTheme) =>
  buttonTheme === ICON_BUTTON_THEMES.DARK ? DARK_THEME_BACKDROP : undefined;

const meta = {
  title: 'core/biz-ui/Button/LinkIconButton',
  component: LinkIconButton,
  argTypes: {
    href: {
      control: 'text',
      type: { name: 'string', required: true },
    },
    iconKey,
    weight,
    theme,
    size,
    isDisabled: {
      control: 'boolean',
      table: { defaultValue: { summary: 'false' } },
    },
    'aria-label': ariaLabelArgType,
  },
  args: {
    href: '/my-info',
    iconKey: 'user-circle',
    'aria-label': '내정보',
  },
} satisfies Meta<typeof LinkIconButton>;

export default meta;

type Story = StoryObj<typeof LinkIconButton>;

export const Default: Story = {};

export const Themes: Story = {
  parameters: { controls: { disable: true } },
  render: ({ href, iconKey, 'aria-label': ariaLabel }) => (
    <Flex align={{ items: 'start' }} gap='24'>
      {Object.values(ICON_BUTTON_THEMES).map((buttonTheme) => (
        <Flex
          align={{ items: 'start' }}
          direction='column'
          gap='12'
          key={buttonTheme}
        >
          <Typography color='gray-500' variant='label-bold'>
            theme = {buttonTheme}
          </Typography>
          <Flex className={getBackdrop(buttonTheme)}>
            <LinkIconButton
              aria-label={ariaLabel}
              href={href}
              iconKey={iconKey}
              theme={buttonTheme}
            />
          </Flex>
        </Flex>
      ))}
    </Flex>
  ),
};

export const Sizes: Story = {
  parameters: { controls: { disable: true } },
  render: ({ href, iconKey, 'aria-label': ariaLabel }) => (
    <Flex align={{ items: 'center' }} gap='16'>
      {Object.values(ICON_BUTTON_SIZES).map((buttonSize) => (
        <Flex align={{ items: 'center' }} gap='8' key={buttonSize}>
          <Typography color='gray-500' variant='label'>
            {buttonSize}
          </Typography>
          <LinkIconButton
            aria-label={ariaLabel}
            href={href}
            iconKey={iconKey}
            size={buttonSize}
          />
        </Flex>
      ))}
    </Flex>
  ),
};

// isDisabled는 aria-disabled + tabIndex=-1 + 클릭 차단이다. 눌러도 이동하지 않는 것을 확인한다
export const Disabled: Story = {
  parameters: { controls: { disable: true } },
  render: ({ href, iconKey, 'aria-label': ariaLabel }) => (
    <Flex align={{ items: 'start' }} gap='24'>
      {Object.values(ICON_BUTTON_THEMES).map((buttonTheme) => (
        <Flex
          align={{ items: 'start' }}
          direction='column'
          gap='12'
          key={buttonTheme}
        >
          <Typography color='gray-500' variant='label-bold'>
            {buttonTheme}
          </Typography>
          <Flex className={getBackdrop(buttonTheme)}>
            <LinkIconButton
              aria-label={ariaLabel}
              href={href}
              iconKey={iconKey}
              theme={buttonTheme}
              isDisabled
            />
          </Flex>
        </Flex>
      ))}
    </Flex>
  ),
};
