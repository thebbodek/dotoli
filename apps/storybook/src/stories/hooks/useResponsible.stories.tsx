import { RESPONSIBLE_STATUS, useResponsible } from '@bbodek/hooks';
import { Typography } from '@bbodek/internal-ui';
import type { Meta, StoryObj } from '@storybook/react';
import clsx from 'clsx';

const meta = {
  title: 'core/hooks/useResponsible',
} satisfies Meta;

export default meta;

type Story = StoryObj;

export const Default: Story = {
  render: () => {
    const { status } = useResponsible();

    if (!status) return <div>isLoading...</div>;

    return (
      <div
        className={clsx(
          'in-flex-h-stack-center h-[20rem] w-[20rem] p-4',
          status === RESPONSIBLE_STATUS.MOBILE && 'bg-in-red-02',
          status === RESPONSIBLE_STATUS.TABLET && 'bg-in-yellow-02',
          status === RESPONSIBLE_STATUS.DESKTOP && 'bg-in-green-02',
        )}
      >
        <Typography variant='body-16-b'>{status}</Typography>
      </div>
    );
  },
};
