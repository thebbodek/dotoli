import { Button } from '@bbodek/internal-ui';
import { executeFunction, ExecuteFunction } from '@bbodek/utils';
import type { Meta, StoryObj } from '@storybook/react';

type Props = ExecuteFunction<() => void>;

const meta = {
  title: 'core/utils/executeFunction',
  argTypes: {
    disabled: {
      control: 'boolean',
      description: 'execute function disabled',
      type: 'boolean',
      table: {
        defaultValue: {
          summary: 'false',
        },
      },
    },
    fn: {
      type: {
        name: 'function',
        required: true,
      },
    },
  },
} satisfies Meta<Props>;

export default meta;

type Story = StoryObj<Props>;

export const Default: Story = {
  render: ({ disabled }) => {
    const executeConsole = () => {
      alert('Execute!');
    };

    const onClick = () => {
      executeFunction({ disabled, fn: executeConsole });
    };

    return <Button label='Execute' onClick={onClick} />;
  },
};
