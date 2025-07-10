import { Icon, InfoPopover, Typography } from '@bbodek/internal-ui';
import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';

import { default as PopoverMeta } from './Popover.stories';

const meta: Meta<typeof InfoPopover> = {
  title: 'core/internal-ui/InfoPopover',
  component: InfoPopover,
  argTypes: PopoverMeta.argTypes,
};

export default meta;

type Story = StoryObj<typeof InfoPopover>;

export const Default: Story = {
  args: { title: '배송 유형이란?' },
  render: (args) => {
    const [isOpen, setIsOpen] = useState(false);
    const close = () => setIsOpen(false);

    return (
      <InfoPopover
        {...args}
        onPopoverClose={close}
        isOpen={isOpen}
        trigger={
          <button
            type='button'
            className='flex items-center gap-x-0.5'
            onClick={() => setIsOpen((v) => !v)}
          >
            <Typography variant='body-18-b' color='black'>
              배송 유형
            </Typography>
            <Icon
              iconKey='warning-circle'
              className='text-in-gray-04 text-[1.125rem]'
              weight='fill'
            />
          </button>
        }
        className={'w-[330px]'}
        innerClassName={'in-flex-v-stack gap-y-2.5'}
      >
        <InfoPopover.Description
          description={
            <>
              사용수량을 직전 영업일에 배송하는 일반배송 외 <br />
              주말/공휴일에도 배송하는 유형을 지정할 수 있습니다. <br />
              <strong className='text-in-primary-05'>
                ※ 토요일/일요일 배송은 공휴일 여부와 상관없이 배송됩니다.
              </strong>
            </>
          }
        />
        <div className='bg-in-gray-01 rounded-in-6 h-[160px] w-full' />
      </InfoPopover>
    );
  },
};
