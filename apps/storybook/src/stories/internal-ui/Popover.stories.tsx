import {
  Button,
  BUTTON_THEMES,
  BUTTON_VARIANTS,
  ICON_BUTTON_THEMES,
  IconButton,
  Popover,
  POPOVER_PLACEMENTS,
  PopoverProps,
} from '@bbodek/internal-ui';
import { Meta, StoryObj } from '@storybook/react';
import { useRef, useState } from 'react';

import { generateArgTypeSummary } from '@/utils/generateArgTypeSummary';

const meta = {
  title: 'core/internal-ui/Popover',
  component: Popover,
  argTypes: {
    placement: {
      control: 'select',
      description: 'Popover placement',
      options: Object.values(POPOVER_PLACEMENTS),
      table: {
        defaultValue: {
          summary: POPOVER_PLACEMENTS.BOTTOM_LEFT,
        },
        type: {
          summary: generateArgTypeSummary({
            options: Object.values(POPOVER_PLACEMENTS),
          }),
        },
      },
    },
    threshold: {
      control: 'number',
      description: 'threshold',
      type: 'number',
      table: {
        defaultValue: {
          summary: '2',
        },
      },
    },
    offset: {
      control: 'number',
      description: 'trigger and popover between distance',
      type: 'number',
      table: {
        defaultValue: {
          summary: '8',
        },
      },
    },
    useAutoFocus: {
      control: 'boolean',
      description: 'use auto focus to open popover',
      type: 'boolean',
      table: {
        defaultValue: {
          summary: 'true',
        },
      },
    },
    applyMaxWidth: {
      control: 'boolean',
      description: 'apply max width to popover',
      type: 'boolean',
      table: {
        defaultValue: {
          summary: 'false',
        },
      },
    },
    useClickOutsideEvent: {
      control: 'boolean',
      description: 'use click outside event to close popover',
      type: 'boolean',
      table: {
        defaultValue: {
          summary: 'true',
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
      },
    },
    onPopoverClose: {
      description: 'on popover close',
      type: {
        name: 'function',
        required: true,
      },
    },
  },
} satisfies Meta<PopoverProps>;

export default meta;

type Story = StoryObj<typeof Popover>;

export const Default: Story = {
  args: {
    useAutoFocus: true,
    applyMaxWidth: false,
  },
  render: (args: PopoverProps) => {
    const [isOpen, setIsOpen] = useState(false);
    const close = () => setIsOpen(false);

    return (
      <Popover
        {...args}
        trigger={
          <Button
            label='클릭'
            theme={BUTTON_THEMES.PRIMARY}
            variant={BUTTON_VARIANTS.OUTLINED}
            onClick={() => setIsOpen((v) => !v)}
          />
        }
        isOpen={args.isOpen || isOpen}
        useClickOutsideEvent
        onPopoverClose={close}
      >
        <div className='shadow-in-8 rounded-in-8 bg-in-white flex items-center justify-between gap-2 px-3 py-2'>
          Popover Content
        </div>
      </Popover>
    );
  },
};

const ListItem = ({ index, ...args }: { index: number } & PopoverProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const close = () => setIsOpen(false);

  return (
    <li className='border-b-in-gray-05 flex border-b p-2 first:justify-end last:border-b-0 even:justify-center'>
      <Popover
        {...args}
        trigger={
          <Button
            label={`클릭 ${index}`}
            theme={BUTTON_THEMES.PRIMARY}
            variant={BUTTON_VARIANTS.OUTLINED}
            onClick={() => setIsOpen((v) => !v)}
          />
        }
        isOpen={isOpen}
        onPopoverClose={close}
      >
        <div className='shadow-in-8 rounded-in-8 bg-in-white flex items-center justify-between gap-2 px-3 py-2'>
          Popover Content {index}
          <IconButton
            aria-label='닫기'
            iconKey='x'
            theme={ICON_BUTTON_THEMES.HOVER_GRAY}
            onClick={close}
          />
        </div>
      </Popover>
    </li>
  );
};

export const WithListRoot: Story = {
  render: (args: PopoverProps) => {
    const rootRef = useRef<HTMLUListElement>(null);

    return (
      <ul
        className='popover-root bg-in-gray-01 rounded-in-8 border-in-gray-05 max-h-[20rem] w-60 overflow-y-auto border'
        ref={rootRef}
      >
        {Array.from({ length: 10 }).map((_, i) => (
          <ListItem index={i + 1} key={i} {...args} rootRef={rootRef} />
        ))}
      </ul>
    );
  },
};
