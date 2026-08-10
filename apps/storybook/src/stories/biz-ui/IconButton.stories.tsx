import {
  Flex,
  ICON_BUTTON_SIZES,
  ICON_BUTTON_THEMES,
  IconButton,
  IconButtonTheme,
  Typography,
} from '@bbodek/biz-ui';
import { Meta, StoryObj } from '@storybook/react';

import { default as IconMeta } from '@/stories/biz-ui/Icon.stories';
import { generateArgTypeSummary } from '@/utils/generateArgTypeSummary';

const { iconKey: iconKeyArgType, weight: weightArgType } =
  IconMeta.argTypes ?? {};

// dark 테마는 흰 아이콘이라 밝은 배경에서 안 보인다. Figma 문서 프레임도 어두운 판 위에 깐다
const DARK_THEME_BACKDROP = 'bg-gray-900 rounded-md p-3';

const getBackdrop = (theme: IconButtonTheme) =>
  theme === ICON_BUTTON_THEMES.DARK ? DARK_THEME_BACKDROP : undefined;

const meta = {
  title: 'core/biz-ui/Button/IconButton',
  component: IconButton,
  argTypes: {
    iconKey: {
      ...iconKeyArgType,
      type: { name: 'string', required: true },
    },
    weight: weightArgType,
    theme: {
      control: 'inline-radio',
      options: Object.values(ICON_BUTTON_THEMES),
      table: {
        defaultValue: { summary: ICON_BUTTON_THEMES.DEFAULT },
        type: {
          summary: generateArgTypeSummary({
            options: Object.values(ICON_BUTTON_THEMES),
          }),
        },
      },
    },
    size: {
      control: 'inline-radio',
      options: Object.values(ICON_BUTTON_SIZES),
      table: {
        defaultValue: { summary: ICON_BUTTON_SIZES.LG },
        type: {
          summary: generateArgTypeSummary({
            options: Object.values(ICON_BUTTON_SIZES),
          }),
        },
      },
    },
    isPending: {
      control: 'boolean',
      table: { defaultValue: { summary: 'false' } },
    },
    disabled: {
      control: 'boolean',
      table: { defaultValue: { summary: 'false' } },
    },
    'aria-label': {
      control: 'text',
      type: { name: 'string', required: true },
    },
  },
  args: {
    iconKey: 'pencil-simple',
    'aria-label': '수정',
  },
} satisfies Meta<typeof IconButton>;

export default meta;

type Story = StoryObj<typeof IconButton>;

export const Default: Story = {};

export const Themes: Story = {
  parameters: { controls: { disable: true } },
  render: ({ iconKey, 'aria-label': ariaLabel }) => (
    <Flex align={{ items: 'start' }} gap='24'>
      {Object.values(ICON_BUTTON_THEMES).map((theme) => (
        <Flex
          align={{ items: 'start' }}
          direction='column'
          gap='12'
          key={theme}
        >
          <Typography color='gray-500' variant='label-bold'>
            theme = {theme}
          </Typography>
          <Flex className={getBackdrop(theme)}>
            <IconButton
              aria-label={ariaLabel}
              iconKey={iconKey}
              theme={theme}
            />
          </Flex>
        </Flex>
      ))}
    </Flex>
  ),
};

export const Sizes: Story = {
  parameters: { controls: { disable: true } },
  render: ({ iconKey, 'aria-label': ariaLabel }) => (
    <Flex align={{ items: 'center' }} gap='16'>
      {Object.values(ICON_BUTTON_SIZES).map((size) => (
        <Flex align={{ items: 'center' }} gap='8' key={size}>
          <Typography color='gray-500' variant='label'>
            {size}
          </Typography>
          <IconButton aria-label={ariaLabel} iconKey={iconKey} size={size} />
        </Flex>
      ))}
    </Flex>
  ),
};

export const Disabled: Story = {
  parameters: { controls: { disable: true } },
  render: ({ iconKey, 'aria-label': ariaLabel }) => (
    <Flex align={{ items: 'start' }} gap='24'>
      {Object.values(ICON_BUTTON_THEMES).map((theme) => (
        <Flex
          align={{ items: 'start' }}
          direction='column'
          gap='12'
          key={theme}
        >
          <Typography color='gray-500' variant='label-bold'>
            {theme}
          </Typography>
          <Flex className={getBackdrop(theme)}>
            <IconButton
              aria-label={ariaLabel}
              iconKey={iconKey}
              theme={theme}
              disabled
            />
          </Flex>
        </Flex>
      ))}
    </Flex>
  ),
};

export const Pending: Story = {
  parameters: { controls: { disable: true } },
  render: ({ iconKey, 'aria-label': ariaLabel }) => (
    <Flex align={{ items: 'start' }} gap='24'>
      {Object.values(ICON_BUTTON_THEMES).map((theme) => (
        <Flex
          align={{ items: 'start' }}
          direction='column'
          gap='12'
          key={theme}
        >
          <Typography color='gray-500' variant='label-bold'>
            {theme}
          </Typography>
          <Flex className={getBackdrop(theme)}>
            <IconButton
              aria-label={ariaLabel}
              iconKey={iconKey}
              theme={theme}
              isPending
            />
          </Flex>
        </Flex>
      ))}
    </Flex>
  ),
};

// theme × size 전량. hover·pressed는 CSS 상태라 정적으로 못 깔고 직접 올려봐야 한다
export const Matrix: Story = {
  parameters: { controls: { disable: true }, layout: 'padded' },
  render: ({ iconKey, 'aria-label': ariaLabel }) => (
    <Flex direction='column' gap='24'>
      {Object.values(ICON_BUTTON_THEMES).map((theme) => (
        <Flex
          align={{ items: 'start' }}
          direction='column'
          gap='12'
          key={theme}
        >
          <Typography variant='heading-5'>theme = {theme}</Typography>
          <Flex
            align={{ items: 'center' }}
            className={getBackdrop(theme)}
            gap='16'
          >
            {Object.values(ICON_BUTTON_SIZES).map((size) => (
              <IconButton
                aria-label={ariaLabel}
                iconKey={iconKey}
                key={size}
                size={size}
                theme={theme}
              />
            ))}
            <IconButton
              aria-label={ariaLabel}
              iconKey={iconKey}
              theme={theme}
              disabled
            />
            <IconButton
              aria-label={ariaLabel}
              iconKey={iconKey}
              theme={theme}
              isPending
            />
          </Flex>
        </Flex>
      ))}
    </Flex>
  ),
};
