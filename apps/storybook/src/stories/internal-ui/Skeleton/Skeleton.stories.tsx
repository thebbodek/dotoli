import { Skeleton } from '@bbodek/internal-ui';
import type { Meta, StoryObj } from '@storybook/react';

const meta = {
  title: 'core/internal-ui/Skeleton/Skeleton',
  component: Skeleton,
  argTypes: {
    count: {
      control: 'number',
      description:
        'The number of lines of skeletons to render. If count is a decimal number like 3.5, three full skeletons and one half-width skeleton will be rendered.',
      table: {
        defaultValue: { summary: '1' },
        type: { summary: 'number' },
      },
    },
    wrapper: {
      control: 'object',
      description:
        'A custom wrapper component that goes around the individual skeleton elements.',
      table: {
        type: {
          summary: 'React.FunctionComponent<PropsWithChildren<unknown>>',
        },
      },
    },
    circle: {
      control: 'boolean',
      description:
        'Makes the skeleton circular by setting border-radius to 50%.',
      table: {
        defaultValue: { summary: 'false' },
        type: { summary: 'boolean' },
      },
    },
    className: {
      control: 'text',
      description:
        'A custom class name for the individual skeleton elements which is used alongside the default class, react-loading-skeleton.',
      table: {
        type: { summary: 'string' },
      },
    },
    containerClassName: {
      control: 'text',
      description:
        'A custom class name for the <span> that wraps the individual skeleton elements.',
      table: {
        type: { summary: 'string' },
      },
    },
    containerTestId: {
      control: 'text',
      description:
        "A string that is added to the container element as a data-testid attribute. Use it with screen.getByTestId('...') from React Testing Library.",
      table: {
        type: { summary: 'string' },
      },
    },
    style: {
      control: 'object',
      description:
        'This is an escape hatch for advanced use cases and is not the preferred way to style the skeleton. Props (e.g. width, borderRadius) take priority over this style object.',
      table: {
        type: { summary: 'React.CSSProperties' },
      },
    },
    width: {
      control: 'text',
      description: 'The width of the skeleton.',
      table: {
        defaultValue: { summary: '100%' },
        type: { summary: 'string | number' },
      },
    },
    height: {
      control: 'text',
      description: 'The height of each skeleton line.',
      table: {
        defaultValue: { summary: 'The font size' },
        type: { summary: 'string | number' },
      },
    },
    borderRadius: {
      control: 'text',
      description: 'The border radius of the skeleton.',
      table: {
        defaultValue: { summary: '4' },
        type: { summary: 'string | number' },
      },
    },
    inline: {
      control: 'boolean',
      description:
        'By default, a <br /> is inserted after each skeleton so that each skeleton gets its own line. When inline is true, no line breaks are inserted.',
      table: {
        defaultValue: { summary: 'false' },
        type: { summary: 'boolean' },
      },
    },
  },
} satisfies Meta<typeof Skeleton>;

export default meta;

type Story = StoryObj<typeof Skeleton>;

export const Default: Story = {
  render: (args) => (
    <div className='in-flex-h-stack-center'>
      <Skeleton
        {...args}
        height={args.height ?? 40}
        width={args.width ?? 200}
      />
    </div>
  ),
};
