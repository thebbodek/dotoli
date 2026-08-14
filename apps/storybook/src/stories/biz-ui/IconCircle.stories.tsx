import {
  Flex,
  ICON_CIRCLE_SIZES,
  ICON_CIRCLE_THEMES,
  ICON_WEIGHTS,
  IconCircle,
  Typography,
} from '@bbodek/biz-ui';
import { Meta, StoryObj } from '@storybook/react';

import { default as IconMeta } from '@/stories/biz-ui/Icon.stories';
import { generateArgTypeSummary } from '@/utils/generateArgTypeSummary';

const { iconKey: iconKeyArgTypeSource, weight: weightArgTypeSource } =
  IconMeta.argTypes ?? {};

// Icon 기준으로 쓰인 문구라 spread로 딸려오면 IconCircle Docs에 그대로 렌더된다
const omitDescription = <T,>(argType: T): Omit<T, 'description'> => {
  const next = { ...argType };
  delete (next as { description?: unknown }).description;

  return next;
};

const iconKeyArgType = omitDescription(iconKeyArgTypeSource ?? {});
const weightArgType = omitDescription(weightArgTypeSource ?? {});

const meta = {
  title: 'core/biz-ui/IconCircle',
  component: IconCircle,
  argTypes: {
    iconKey: {
      ...iconKeyArgType,
      type: { name: 'string', required: true },
    },
    weight: weightArgType,
    size: {
      control: 'inline-radio',
      options: Object.values(ICON_CIRCLE_SIZES),
      table: {
        defaultValue: { summary: ICON_CIRCLE_SIZES.MD },
        type: {
          summary: generateArgTypeSummary({
            options: Object.values(ICON_CIRCLE_SIZES),
          }),
        },
      },
    },
    theme: {
      control: 'inline-radio',
      options: Object.values(ICON_CIRCLE_THEMES),
      table: {
        defaultValue: { summary: ICON_CIRCLE_THEMES.PRIMARY },
        type: {
          summary: generateArgTypeSummary({
            options: Object.values(ICON_CIRCLE_THEMES),
          }),
        },
      },
    },
  },
  args: {
    iconKey: 'arrows-clockwise',
  },
} satisfies Meta<typeof IconCircle>;

export default meta;

type Story = StoryObj<typeof IconCircle>;

export const Default: Story = {};

// Figma 문서 프레임과 같은 배치 — theme이 열, size가 행
export const Matrix: Story = {
  parameters: { controls: { disable: true }, layout: 'padded' },
  render: ({ iconKey, weight }) => (
    <Flex direction='column' gap='24'>
      {Object.values(ICON_CIRCLE_SIZES).map((size) => (
        <Flex align={{ items: 'start' }} direction='column' gap='12' key={size}>
          <Typography variant='heading-5'>size = {size}</Typography>
          <Flex align={{ items: 'center' }} gap='16'>
            {Object.values(ICON_CIRCLE_THEMES).map((theme) => (
              <Flex
                align={{ items: 'center' }}
                direction='column'
                gap='8'
                key={theme}
              >
                <IconCircle
                  iconKey={iconKey}
                  size={size}
                  theme={theme}
                  weight={weight}
                />
                <Typography color='gray-500' variant='caption'>
                  {theme}
                </Typography>
              </Flex>
            ))}
          </Flex>
        </Flex>
      ))}
    </Flex>
  ),
};

// Figma 주석 355:1203 — 아이콘 웨이트는 bold · filled 둘 다 쓸 수 있다
export const Weights: Story = {
  parameters: { controls: { disable: true } },
  render: ({ iconKey }) => (
    <Flex align={{ items: 'center' }} gap='24'>
      {[ICON_WEIGHTS.BOLD, ICON_WEIGHTS.FILL].map((weight) => (
        <Flex
          align={{ items: 'center' }}
          direction='column'
          gap='8'
          key={weight}
        >
          <IconCircle iconKey={iconKey} weight={weight} />
          <Typography color='gray-500' variant='caption'>
            {weight}
          </Typography>
        </Flex>
      ))}
    </Flex>
  ),
};
