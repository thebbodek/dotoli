import { Button, Portal, PORTAL_DEFAULT_TARGET } from '@bbodek/internal-ui';
import { Meta } from '@storybook/react';
import { useState } from 'react';

const meta: Meta<typeof Portal> = {
  title: 'core/internal-ui/Portal',
  component: Portal,
  argTypes: {
    target: {
      description: 'Portal target',
      control: 'text',
      table: {
        defaultValue: {
          summary: PORTAL_DEFAULT_TARGET,
        },
        type: {
          summary: 'string',
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
      <div className='flex flex-col items-center gap-4'>
        <Button label='Open Portal' onClick={onToggle} />
        {isOpen && (
          <div className='rounded-8 shadow-8 p-2'>
            <Portal>
              <div className='rounded-8 shadow-8 p-2'>Portal</div>
            </Portal>
            Original Portal Position
          </div>
        )}
      </div>
    );
  },
};
