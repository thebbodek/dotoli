import {
  COLOR_VARIANTS,
  CTA_BUTTON_SIZES,
  CTA_BUTTON_THEMES,
  CTA_BUTTON_VARIANTS,
  CtaButton,
  Flex,
  ORDER_DATE_INFO_DAY_TYPES,
  ORDER_DATE_INFO_SIZES,
  ORDER_DATE_INFO_THEMES,
  OrderBox,
  OrderBoxItem,
  OrderDateInfo,
  OrderDateInfoProps,
  Typography,
} from '@bbodek/biz-ui';
import { Meta, StoryObj } from '@storybook/react';

const THEME_OPTIONS = Object.values(ORDER_DATE_INFO_THEMES);

const SIZE_OPTIONS = Object.values(ORDER_DATE_INFO_SIZES);

const DAY_TYPE_OPTIONS = Object.values(ORDER_DATE_INFO_DAY_TYPES);

const MATRIX_CELL_STYLE = 'w-[120px]';

const PAGE_STYLE = 'flex-v-stack w-[380px] gap-[8px] bg-gray-50 p-[20px]';

const CARD_STYLE = 'flex-v-stack w-full gap-[10px]';

const CARD_HEADING_STYLE = 'flex-h-stack w-full items-center justify-between';

const EDIT_LABEL = '주문 수정';

const DESCRIPTION = '오늘 18시 마감 · 입력 필요';

const HIGHLIGHTED_DESCRIPTION = (
  <>
    월 18시 마감 ·{' '}
    <Typography color={COLOR_VARIANTS.YELLOW_600}>이번만 변경</Typography>
  </>
);

interface DescriptionCase {
  caseLabel: string;
  props: OrderDateInfoProps;
}

interface OrderDayCase {
  props: OrderDateInfoProps;
  items: OrderBoxItem[];
}

const DESCRIPTION_CASES: DescriptionCase[] = [
  {
    caseLabel: '제목 + 설명',
    props: { title: '16일', description: DESCRIPTION },
  },
  {
    caseLabel: '휴일 + 설명',
    props: {
      title: '16일',
      description: DESCRIPTION,
      dayType: ORDER_DATE_INFO_DAY_TYPES.WEEKEND,
    },
  },
  {
    caseLabel: '흐림 + 설명',
    props: {
      title: '16일',
      description: '주문이 마감된 날이에요',
      theme: ORDER_DATE_INFO_THEMES.MUTED,
    },
  },
  {
    caseLabel: '설명만',
    props: { description: DESCRIPTION },
  },
];

const ORDER_DAYS: OrderDayCase[] = [
  {
    props: { title: '12일(목)' },
    items: [
      { packageName: '4찬 식판', boxCount: 4, unitCount: 80 },
      { packageName: '국그릇', boxCount: 0, unitCount: 0 },
    ],
  },
  {
    props: {
      title: '14일(토)',
      theme: ORDER_DATE_INFO_THEMES.RED,
      dayType: ORDER_DATE_INFO_DAY_TYPES.WEEKEND,
    },
    items: [],
  },
];

const meta = {
  title: 'core/biz-ui/Order/OrderDateInfo',
  component: OrderDateInfo,
  argTypes: {
    title: { control: 'text' },
    description: { control: 'text' },
    theme: {
      control: 'inline-radio',
      options: THEME_OPTIONS,
      table: { defaultValue: { summary: ORDER_DATE_INFO_THEMES.DEFAULT } },
    },
    size: {
      control: 'inline-radio',
      options: SIZE_OPTIONS,
      table: { defaultValue: { summary: ORDER_DATE_INFO_SIZES.MD } },
    },
    dayType: {
      control: 'inline-radio',
      options: DAY_TYPE_OPTIONS,
      table: { defaultValue: { summary: ORDER_DATE_INFO_DAY_TYPES.WEEKDAY } },
    },
  },
  args: {
    title: '16일',
    description: DESCRIPTION,
  },
} satisfies Meta<typeof OrderDateInfo>;

export default meta;

type Story = StoryObj<typeof OrderDateInfo>;

export const Default: Story = {};

export const Matrix: Story = {
  parameters: { controls: { disable: true }, layout: 'padded' },
  render: () => (
    <Flex direction='column' gap='16'>
      {THEME_OPTIONS.map((theme) =>
        SIZE_OPTIONS.map((size) => (
          <Flex align={{ items: 'center' }} gap='16' key={`${theme}-${size}`}>
            <Typography
              className={MATRIX_CELL_STYLE}
              color='gray-500'
              variant='label-bold'
            >
              {`${theme} · ${size}`}
            </Typography>
            {DAY_TYPE_OPTIONS.map((dayType) => (
              <OrderDateInfo
                className={MATRIX_CELL_STYLE}
                dayType={dayType}
                key={dayType}
                size={size}
                theme={theme}
                title='16일'
              />
            ))}
          </Flex>
        )),
      )}
    </Flex>
  ),
};

export const WithDescription: Story = {
  parameters: { controls: { disable: true }, layout: 'padded' },
  render: () => (
    <Flex direction='column' gap='16'>
      {DESCRIPTION_CASES.map(({ caseLabel, props }) => (
        <Flex direction='column' gap='8' key={caseLabel}>
          <Typography color='gray-500' variant='label-bold'>
            {caseLabel}
          </Typography>
          <OrderDateInfo {...props} />
        </Flex>
      ))}
    </Flex>
  ),
};

// description 은 ReactNode 라 부분 강조 색은 쓰는 쪽이 정한다
export const WithHighlightedDescription: Story = {
  args: {
    title: '16일',
    description: HIGHLIGHTED_DESCRIPTION,
  },
  parameters: { controls: { disable: true }, layout: 'padded' },
};

export const WithOrderBox: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <ul className={PAGE_STYLE}>
      {ORDER_DAYS.map(({ props, items }) => (
        <li className={CARD_STYLE} key={props.title}>
          <div className={CARD_HEADING_STYLE}>
            <OrderDateInfo {...props} size={ORDER_DATE_INFO_SIZES.LG} />
            <CtaButton
              label={EDIT_LABEL}
              size={CTA_BUTTON_SIZES.SM}
              theme={CTA_BUTTON_THEMES.PRIMARY}
              variant={CTA_BUTTON_VARIANTS.TONAL}
            />
          </div>
          <OrderBox items={items} />
        </li>
      ))}
    </ul>
  ),
};
