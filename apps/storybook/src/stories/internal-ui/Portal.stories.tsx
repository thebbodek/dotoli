import { Button, Portal } from '@bbodek/internal-ui';
import { Meta } from '@storybook/react';
import { useState } from 'react';

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
    const [isOpen, setIsOpen] = useState(false);

    const onToggle = () => {
      setIsOpen((v) => !v);
    };

    return (
      <div className='flex flex-col gap-4'>
        <Button label='Open Portal' onClick={onToggle} />
        <div className='bg-red-03'>
          <div id='portal' />
        </div>
        {isOpen && (
          <div className='bg-green-03'>
            <div>
              <Portal>Portal</Portal>Original Portal Position
            </div>
          </div>
        )}
      </div>
    );
  },
};
