import {
  Flex,
  PAGE_BODY_DEFAULT_VARIANT,
  PAGE_BODY_VARIANTS,
  PageBody,
  PageBodyProps,
  Typography,
} from '@bbodek/biz-ui';
import { Meta, StoryObj } from '@storybook/react';

import { generateArgTypeSummary } from '@/utils/generateArgTypeSummary';

const SCREEN_STYLE = 'w-[380px] outline outline-gray-200';

const SCROLL_SCREEN_STYLE =
  'scroll-y flex-v-stack h-[520px] w-[380px] outline outline-gray-200';

const SLOT_STYLE = 'flex-h-stack-center h-[60px] rounded-8 bg-blue-100';

const SLOT_LABEL = 'content';

const SLOT_COUNT = 2;

const FILLER_COUNT = 6;

// 심볼의 content 개수를 그대로 따른다 — 하나뿐인 두 종은 gap이 실측되지 않았다
const VARIANT_SLOT_COUNTS: Record<string, number> = {
  [PAGE_BODY_VARIANTS.STICKY_TOP]: 1,
  [PAGE_BODY_VARIANTS.FOOTER]: 1,
};

const meta = {
  title: 'core/biz-ui/PageBody',
  component: PageBody,
  argTypes: {
    variant: {
      control: 'inline-radio',
      options: Object.values(PAGE_BODY_VARIANTS),
      table: {
        defaultValue: { summary: PAGE_BODY_DEFAULT_VARIANT },
        type: {
          summary: generateArgTypeSummary({
            options: Object.values(PAGE_BODY_VARIANTS),
          }),
        },
      },
    },
  },
  args: {
    variant: PAGE_BODY_DEFAULT_VARIANT,
  },
} satisfies Meta<PageBodyProps>;

export default meta;

type Story = StoryObj<PageBodyProps>;

const Slot = () => (
  <div className={SLOT_STYLE}>
    <Typography color='blue-600' variant='label-bold'>
      {SLOT_LABEL}
    </Typography>
  </div>
);

const Slots = ({ variant }: Pick<PageBodyProps, 'variant'>) => (
  <>
    {Array.from(
      { length: (variant && VARIANT_SLOT_COUNTS[variant]) ?? SLOT_COUNT },
      (_, index) => (
        <Slot key={index} />
      ),
    )}
  </>
);

export const Default: Story = {
  render: (args) => (
    <div className={SCREEN_STYLE}>
      <PageBody {...args}>
        <Slots variant={args.variant} />
      </PageBody>
    </div>
  ),
};

export const Variants: Story = {
  parameters: { controls: { disable: true }, layout: 'padded' },
  render: () => (
    <Flex align={{ items: 'start' }} gap='24' wrap='wrap'>
      {Object.values(PAGE_BODY_VARIANTS).map((variant) => (
        <Flex
          align={{ items: 'start' }}
          direction='column'
          gap='8'
          key={variant}
        >
          <Typography color='gray-500' variant='label-bold'>
            {variant}
          </Typography>
          <div className={SCREEN_STYLE}>
            <PageBody variant={variant}>
              <Slots variant={variant} />
            </PageBody>
          </div>
        </Flex>
      ))}
    </Flex>
  ),
};

// 페이지 조립 순서 — stickyTop이 스크롤 컨테이너 상단에 붙는 것을 보는 자리
export const Page: Story = {
  parameters: { controls: { disable: true }, layout: 'padded' },
  render: () => (
    <div className={SCROLL_SCREEN_STYLE}>
      <PageBody variant={PAGE_BODY_VARIANTS.STICKY_TOP}>
        <Slot />
      </PageBody>
      <PageBody variant={PAGE_BODY_VARIANTS.TOP}>
        {Array.from({ length: FILLER_COUNT }, (_, index) => (
          <Slot key={index} />
        ))}
      </PageBody>
      <PageBody variant={PAGE_BODY_VARIANTS.BORDER_MIDDLE}>
        {Array.from({ length: SLOT_COUNT }, (_, index) => (
          <Slot key={index} />
        ))}
      </PageBody>
      <PageBody variant={PAGE_BODY_VARIANTS.FOOTER}>
        <Slot />
      </PageBody>
    </div>
  ),
};
