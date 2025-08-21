import { useResponsible } from '@bbodek/hooks';
import { Typography } from '@bbodek/internal-ui';
import type { Meta, StoryObj } from '@storybook/react';
import clsx from 'clsx';

const meta: Meta<typeof useResponsible> = {
  title: 'core/hooks/useResponsible',
};

export default meta;

type Story = StoryObj<typeof useResponsible>;

export const Default: Story = {
  render: () => {
    const { status } = useResponsible();

    if (!status) return <div>isLoading...</div>;

    return (
      <div
        className={clsx(
          'in-flex-h-stack-center h-[20rem] w-[20rem] p-4',
          status === 'MOBILE' && 'bg-in-red-02',
          status === 'TABLET' && 'bg-in-yellow-02',
          status === 'DESKTOP' && 'bg-in-green-02',
        )}
      >
        <Typography variant='body-16-b'>{status}</Typography>
      </div>
    );
  },
};
