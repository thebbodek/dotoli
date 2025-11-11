import { Skeleton, SkeletonTheme } from '@bbodek/internal-ui';
import type { Meta, StoryObj } from '@storybook/react';

import { default as SkeletonMeta } from './Skeleton.stories';

const { width, height, borderRadius, inline } = SkeletonMeta.argTypes ?? {};

const meta = {
  title: 'core/internal-ui/Skeleton/SkeletonTheme',
  component: SkeletonTheme,
  argTypes: {
    width,
    height,
    borderRadius,
    inline,
  },
} satisfies Meta<typeof SkeletonTheme>;

export default meta;

type Story = StoryObj<typeof SkeletonTheme>;

export const Default: Story = {
  render: (args) => (
    <SkeletonTheme>
      <div className='in-flex-v-stack-center w-[200px] gap-4'>
        <Skeleton {...args} height={args.height ?? 40} />
        <Skeleton {...args} height={args.height ?? 40} />
        <Skeleton {...args} height={args.height ?? 40} />
        <Skeleton {...args} height={args.height ?? 40} />
      </div>
    </SkeletonTheme>
  ),
};
