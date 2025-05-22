import {
  Button,
  BUTTON_THEMES,
  BUTTON_VARIANTS,
  IconButton,
  Popover,
} from '@bbodek/internal-ui';
import { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';

const meta: Meta<typeof Popover> = {
  title: 'core/internal-ui/Popover',
  component: Popover,
  argTypes: {
    offset: {
      control: 'number',
      description: 'trigger and popover between distance',
      table: {
        defaultValue: {
          summary: '4',
        },
        type: {
          summary: 'number',
        },
      },
    },
    useAutoFocus: {
      control: 'boolean',
      description: 'use auto focus to open popover',
      table: {
        defaultValue: {
          summary: 'true',
        },
        type: {
          summary: 'true | false',
        },
      },
    },
    applyMaxWidth: {
      control: 'boolean',
      description: 'apply max width to popover',
      table: {
        defaultValue: {
          summary: 'false',
        },
        type: {
          summary: 'true | false',
        },
      },
    },
    useClickOutsideEvent: {
      control: 'boolean',
      description: 'use click outside event to close popover',
      table: {
        defaultValue: {
          summary: 'true',
        },
        type: {
          summary: 'true | false',
        },
      },
    },
    isOpen: {
      control: 'boolean',
      description: 'is open popover',
      type: {
        required: true,
        name: 'boolean',
      },
      table: {
        defaultValue: {
          summary: 'false',
        },
        type: {
          summary: 'true | false',
        },
      },
    },
    onPopoverClose: {
      action: 'clicked',
      description: 'on popover close',
      type: {
        name: 'function',
        required: true,
      },
    },
  },
};

export default meta;

type Story = StoryObj<typeof Popover>;

export const Default: Story = {
  args: {
    offset: 4,
    useAutoFocus: true,
    applyMaxWidth: false,
    useClickOutsideEvent: true,
  },
  render: (args) => {
    const [isOpen, setIsOpen] = useState(false);
    const close = () => setIsOpen(false);

    return (
      <>
        <div id={'portal'} />
        <Popover
          {...args}
          useClickOutsideEvent={true}
          isOpen={args.isOpen || isOpen}
          onPopoverClose={close}
          trigger={
            <Button
              label={`클릭`}
              variant={BUTTON_VARIANTS.OUTLINED}
              theme={BUTTON_THEMES.PRIMARY}
              onClick={() => setIsOpen((v) => !v)}
            />
          }
        >
          <div
            className={
              'shadow-8 rounded-8 flex items-center justify-between gap-2 bg-white py-2'
            }
          >
            Popover Content
          </div>
        </Popover>
      </>
    );
  },
};

const ListItem = ({ index }: { index: number }) => {
  const [isOpen, setIsOpen] = useState(false);
  const close = () => setIsOpen(false);

  return (
    <li className='flex border-b p-2 first:justify-end last:border-b-0 even:justify-center'>
      <Popover
        onPopoverClose={close}
        isOpen={isOpen}
        trigger={
          <Button
            label={`클릭 ${index}`}
            variant={BUTTON_VARIANTS.OUTLINED}
            theme={BUTTON_THEMES.PRIMARY}
            onClick={() => setIsOpen((v) => !v)}
          />
        }
      >
        <div
          className={
            'shadow-8 rounded-8 flex items-center justify-between gap-2 bg-white px-3 py-2'
          }
        >
          Popover Content {index}
          <IconButton
            theme={BUTTON_THEMES.GRAY}
            iconKey={'x'}
            onClick={(e) => {
              close();
            }}
          />
        </div>
      </Popover>
    </li>
  );
};

export const WithList: Story = {
  render: () => {
    return (
      <>
        <div id={'portal'} />
        <ul className={'popover-root max-h-[16rem] w-60 overflow-y-auto'}>
          {Array.from({ length: 5 }).map((_, i) => (
            <ListItem key={i} index={i + 1} />
          ))}
        </ul>
      </>
    );
  },
};
