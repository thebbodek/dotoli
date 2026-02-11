import {
  Button,
  ResponsibleSideSheet,
  ResponsibleSideSheetProps,
  SIDE_SHEET_DEFAULT_CONTAINER_ID,
} from '@bbodek/internal-ui';
import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';

import { default as SideSheetMeta } from './SideSheet.stories';

const { argTypes } = SideSheetMeta;

const meta = {
  title: 'core/internal-ui/SideSheet/ResponsibleSideSheet',
  component: ResponsibleSideSheet,
  argTypes,
} satisfies Meta<ResponsibleSideSheetProps>;

export default meta;

type Story = StoryObj<ResponsibleSideSheetProps>;

export const Default: Story = {
  args: {
    isLoading: false,
  },
  render: (args) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
      <div
        className='bg-in-gray-01 in-flex-h-stack-center relative h-[40rem] w-[800px] overflow-hidden'
        id={SIDE_SHEET_DEFAULT_CONTAINER_ID}
      >
        <Button
          label='Open ResponsibleSideSheet'
          onClick={() => setIsOpen(true)}
        />
        <ResponsibleSideSheet
          {...args}
          className='in-tablet:p-6'
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
        >
          <p className='text-in-gray-09 text-sm'>
            데스크톱에서는 SideSheet, 모바일에서는 InfoFullScreenDialog로
            렌더링됩니다.
          </p>
        </ResponsibleSideSheet>
      </div>
    );
  },
};
