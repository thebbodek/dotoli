import { Portal } from '@bbodek/internal-ui';
import { Meta } from '@storybook/react';

const meta: Meta<typeof Portal> = {
  title: 'core/internal-ui/Portal',
  component: Portal,
  argTypes: {
    target: {
      description: 'Portal target',
      control: 'text',
      type: 'string',
      table: {
        defaultValue: {
          summary: 'portal',
        },
      },
    },
  },
};

export default meta;

export const Default = {
  render: () => {
    return (
      <div className='flex flex-col gap-4'>
        <div className='bg-red-03'>
          <div id='portal' />
        </div>
        <div className='bg-green-03'>
          <div>
            <Portal>Portal</Portal>Original Portal Position
          </div>
        </div>
      </div>
    );
  },
};
