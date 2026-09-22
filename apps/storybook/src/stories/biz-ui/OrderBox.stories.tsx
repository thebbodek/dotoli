import {
  Flex,
  ORDER_BOX_EMPTY_LABEL,
  ORDER_BOX_VARIANTS,
  OrderBox,
  OrderBoxItem,
  OrderBoxVariant,
  Typography,
} from '@bbodek/biz-ui';
import { Meta, StoryObj } from '@storybook/react';

import { generateArgTypeSummary } from '@/utils/generateArgTypeSummary';

const ORDER_BOX_WIDTH_STYLE = 'w-[338px]';

// inverse는 어두운 면 위에 올라간다. 빈 상태 배경이 알파라 뒤에 깔린 색이 비친다
const INVERSE_VARIANT_BACKDROP = 'bg-blue-500 rounded-6 p-3';

const getBackdrop = (variant: OrderBoxVariant) =>
  variant === ORDER_BOX_VARIANTS.INVERSE ? INVERSE_VARIANT_BACKDROP : undefined;

const EMPTY_LABEL = '휴무일';

const ITEMS: OrderBoxItem[] = [
  { boxes: '4박스', itemName: '4찬식판 A형 (20개)' },
  { boxes: '2박스', itemName: '국그릇 (30개)' },
  { boxes: '1박스', itemName: '수저세트 (50개)' },
];

const WRAPPED_ITEMS: OrderBoxItem[] = [
  ...ITEMS,
  { boxes: '3박스', itemName: '앞접시 (40개)' },
];

const meta = {
  title: 'core/biz-ui/Order/OrderBox',
  component: OrderBox,
  argTypes: {
    items: {
      control: 'object',
      type: {
        name: 'array',
        required: true,
        value: { name: 'object', value: {} },
      },
      table: {
        type: { summary: 'OrderBoxItem[]' },
      },
    },
    variant: {
      control: 'inline-radio',
      options: Object.values(ORDER_BOX_VARIANTS),
      table: {
        defaultValue: { summary: ORDER_BOX_VARIANTS.DEFAULT },
        type: {
          summary: generateArgTypeSummary({
            options: Object.values(ORDER_BOX_VARIANTS),
          }),
        },
      },
    },
    emptyLabel: {
      control: 'text',
      table: { defaultValue: { summary: ORDER_BOX_EMPTY_LABEL } },
    },
  },
  args: {
    items: ITEMS,
  },
} satisfies Meta<typeof OrderBox>;

export default meta;

type Story = StoryObj<typeof OrderBox>;

export const Default: Story = {
  render: ({ variant = ORDER_BOX_VARIANTS.DEFAULT, ...args }) => (
    <Flex className={getBackdrop(variant)} shrink='0'>
      <OrderBox {...args} className={ORDER_BOX_WIDTH_STYLE} variant={variant} />
    </Flex>
  ),
};

export const Variants: Story = {
  parameters: { controls: { disable: true }, layout: 'padded' },
  render: ({ items }) => (
    <Flex align={{ items: 'start' }} gap='24'>
      {Object.values(ORDER_BOX_VARIANTS).map((variant) => (
        <Flex
          align={{ items: 'start' }}
          direction='column'
          gap='12'
          key={variant}
        >
          <Typography color='gray-500' variant='label-bold'>
            variant = {variant}
          </Typography>
          <Flex className={getBackdrop(variant)} shrink='0'>
            <OrderBox
              className={ORDER_BOX_WIDTH_STYLE}
              items={items}
              variant={variant}
            />
          </Flex>
        </Flex>
      ))}
    </Flex>
  ),
};

// 문구는 소비처가 바꿀 수 있고, 안 주면 ORDER_BOX_EMPTY_LABEL이 그대로 쓰인다
export const Empty: Story = {
  parameters: { controls: { disable: true }, layout: 'padded' },
  render: () => (
    <Flex align={{ items: 'start' }} gap='24'>
      <Flex align={{ items: 'start' }} direction='column' gap='12'>
        <Typography color='gray-500' variant='label-bold'>
          기본값
        </Typography>
        <OrderBox className={ORDER_BOX_WIDTH_STYLE} items={[]} />
      </Flex>
      <Flex align={{ items: 'start' }} direction='column' gap='12'>
        <Typography color='gray-500' variant='label-bold'>
          emptyLabel 지정
        </Typography>
        <OrderBox
          className={ORDER_BOX_WIDTH_STYLE}
          emptyLabel={EMPTY_LABEL}
          items={[]}
        />
      </Flex>
      <Flex align={{ items: 'start' }} direction='column' gap='12'>
        <Typography color='gray-500' variant='label-bold'>
          variant = inverse
        </Typography>
        <Flex className={getBackdrop(ORDER_BOX_VARIANTS.INVERSE)} shrink='0'>
          <OrderBox
            className={ORDER_BOX_WIDTH_STYLE}
            items={[]}
            variant={ORDER_BOX_VARIANTS.INVERSE}
          />
        </Flex>
      </Flex>
    </Flex>
  ),
};

export const Wrapped: Story = {
  parameters: { controls: { disable: true }, layout: 'padded' },
  render: ({ items }) => (
    <Flex align={{ items: 'start' }} gap='24'>
      <Flex align={{ items: 'start' }} direction='column' gap='12'>
        <Typography color='gray-500' variant='label-bold'>
          3개 — 한 줄
        </Typography>
        <OrderBox className={ORDER_BOX_WIDTH_STYLE} items={items} />
      </Flex>
      <Flex align={{ items: 'start' }} direction='column' gap='12'>
        <Typography color='gray-500' variant='label-bold'>
          4개 — 줄바꿈
        </Typography>
        <OrderBox className={ORDER_BOX_WIDTH_STYLE} items={WRAPPED_ITEMS} />
      </Flex>
    </Flex>
  ),
};
