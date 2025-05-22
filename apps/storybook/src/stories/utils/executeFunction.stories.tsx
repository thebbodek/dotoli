import { Button } from '@bbodek/internal-ui';
import { executeFunction, ExecuteFunction } from '@bbodek/utils';
import type { StoryObj } from '@storybook/react';

const meta = {
  title: 'core/utils/executeFunction',
  argTypes: {
    disabled: {
      control: 'boolean',
      description: 'ExecuteFunction disabled',
      table: {
        defaultValue: {
          summary: 'false',
        },
        type: {
          summary: 'true | false',
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
};

export default meta;

type Story = StoryObj<ExecuteFunction<() => void>>;

export const Default: Story = {
  render: ({ disabled }) => {
    const executeConsole = () => {
      alert('Execute!');
    };

    const onClick = () => {
      executeFunction({ disabled, fn: executeConsole });
    };

    return <Button onClick={onClick} label='Execute' />;
  },
};
