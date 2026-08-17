import {
  Flex,
  NOTIFICATION_CARD_THEMES,
  NotificationCard,
  Typography,
} from '@bbodek/biz-ui';
import { Decorator, Meta, StoryObj } from '@storybook/react';

import { default as IconMeta } from '@/stories/biz-ui/Icon.stories';
import { generateArgTypeSummary } from '@/utils/generateArgTypeSummary';

const omitDescription = <T,>(argType: T): Omit<T, 'description'> => {
  const next = { ...argType };
  delete (next as { description?: unknown }).description;

  return next;
};

const iconKeyArgType = omitDescription(IconMeta.argTypes?.iconKey ?? {});

const DOCUMENT_FRAME_WIDTH = 'w-[340px]';

const withFrameWidth: Decorator = (Story) => (
  <div className={DOCUMENT_FRAME_WIDTH}>
    <Story />
  </div>
);

const SAMPLE = {
  highlight: '고정주문',
  title: '시작',
  subText: '텍스트 들어가는 영역',
  history: { registeredAt: '07.16 16:30', registrant: '뽀득' },
  period: '0000-00-00(월) ~ 0000-00-00(금)',
  actionLabel: '수정 완료',
};

type OptionalPart = 'subText' | 'history' | 'period' | 'actionLabel';

const ROW_PARTS: OptionalPart[][] = [
  [],
  ['history'],
  ['subText'],
  ['subText', 'history'],
];

const COLUMN_PARTS: OptionalPart[][] = [
  [],
  ['actionLabel'],
  ['period'],
  ['period', 'actionLabel'],
];

const COMBINATION_SCROLL_STYLE = 'overflow-x-auto';

const COMBINATION_GRID_STYLE =
  'grid w-max grid-cols-[repeat(4,340px)] items-start gap-x-[20px] gap-y-[32px]';

const meta = {
  title: 'core/biz-ui/NotificationCard',
  component: NotificationCard,
  argTypes: {
    iconKey: iconKeyArgType,
    theme: {
      control: 'inline-radio',
      options: Object.values(NOTIFICATION_CARD_THEMES),
      table: {
        defaultValue: { summary: NOTIFICATION_CARD_THEMES.PRIMARY },
        type: {
          summary: generateArgTypeSummary({
            options: Object.values(NOTIFICATION_CARD_THEMES),
          }),
        },
      },
    },
    highlight: { control: 'text' },
    title: { control: 'text' },
    subText: { control: 'text' },
    period: { control: 'text' },
    actionLabel: { control: 'text' },
  },
  args: {
    iconKey: 'arrows-clockwise',
    ...SAMPLE,
  },
} satisfies Meta<typeof NotificationCard>;

export default meta;

type Story = StoryObj<typeof NotificationCard>;

export const Default: Story = { decorators: [withFrameWidth] };

export const Themes: Story = {
  parameters: { controls: { disable: true }, layout: 'padded' },
  decorators: [withFrameWidth],
  render: ({ iconKey, highlight, title }) => (
    <Flex direction='column' gap='24'>
      {Object.values(NOTIFICATION_CARD_THEMES).map((theme) => (
        <Flex align={{ items: 'start' }} direction='column' gap='8' key={theme}>
          <Typography color='gray-500' variant='caption'>
            {theme}
          </Typography>
          <NotificationCard
            highlight={highlight}
            iconKey={iconKey}
            theme={theme}
            title={title}
          />
        </Flex>
      ))}
    </Flex>
  ),
};

export const Combinations: Story = {
  parameters: { controls: { disable: true }, layout: 'padded' },
  render: ({ iconKey, theme, highlight, title }) => (
    <div className={COMBINATION_SCROLL_STYLE}>
      <div className={COMBINATION_GRID_STYLE}>
        {ROW_PARTS.flatMap((rowParts, rowIndex) =>
          COLUMN_PARTS.map((columnParts, columnIndex) => {
            const enabled = [...rowParts, ...columnParts];
            const parts = Object.fromEntries(
              enabled.map((part) => [part, SAMPLE[part]]),
            );

            return (
              <Flex
                align={{ items: 'start' }}
                direction='column'
                gap='8'
                key={`${rowIndex}-${columnIndex}`}
              >
                <Typography color='gray-500' variant='caption'>
                  #{rowIndex * COLUMN_PARTS.length + columnIndex + 1}{' '}
                  {enabled.join(' · ') || '(기본만)'}
                </Typography>
                <NotificationCard
                  highlight={highlight}
                  iconKey={iconKey}
                  theme={theme}
                  title={title}
                  {...parts}
                />
              </Flex>
            );
          }),
        )}
      </div>
    </div>
  ),
};

export const TitleVariants: Story = {
  parameters: { controls: { disable: true }, layout: 'padded' },
  decorators: [withFrameWidth],
  render: ({ iconKey, theme }) => (
    <Flex direction='column' gap='24'>
      <Flex align={{ items: 'start' }} direction='column' gap='8'>
        <Typography color='gray-500' variant='caption'>
          강조 + 나머지
        </Typography>
        <NotificationCard
          highlight='고정주문'
          iconKey={iconKey}
          theme={theme}
          title='시작'
        />
      </Flex>
      <Flex align={{ items: 'start' }} direction='column' gap='8'>
        <Typography color='gray-500' variant='caption'>
          나뉘지 않음 (title만)
        </Typography>
        <NotificationCard
          iconKey={iconKey}
          theme={theme}
          title='조회 결과가 없습니다'
        />
      </Flex>
    </Flex>
  ),
};
