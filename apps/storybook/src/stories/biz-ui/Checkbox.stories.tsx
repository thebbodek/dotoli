import { Checkbox, CheckboxProps, Flex, Typography } from '@bbodek/biz-ui';
import { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';

const BOOLEAN_VALUES = [false, true];

const meta = {
  title: 'core/biz-ui/Checkbox',
  component: Checkbox,
  argTypes: {
    checked: {
      control: 'boolean',
      type: { name: 'boolean', required: true },
    },
    disabled: {
      control: 'boolean',
      table: { defaultValue: { summary: 'false' } },
    },
    'aria-label': { control: 'text' },
  },
  args: {
    checked: false,
    disabled: false,
    'aria-label': '전체 선택',
    onChange: () => {},
  },
} satisfies Meta<CheckboxProps>;

export default meta;

type Story = StoryObj<CheckboxProps>;

export const Default: Story = {};

export const Interactive: Story = {
  parameters: { controls: { disable: true } },
  render: ({ 'aria-label': ariaLabel }) => {
    const [checked, setChecked] = useState(false);

    return (
      <Checkbox
        aria-label={ariaLabel}
        checked={checked}
        onChange={({ target }) => setChecked(target.checked)}
      />
    );
  },
};

export const States: Story = {
  parameters: { controls: { disable: true } },
  render: ({ onChange }) => (
    <Flex align={{ items: 'start' }} gap='32'>
      {BOOLEAN_VALUES.map((disabled) => (
        <Flex
          align={{ items: 'start' }}
          direction='column'
          gap='12'
          key={`disabled-${disabled}`}
        >
          <Typography color='gray-500' variant='label-bold'>
            disabled = {String(disabled)}
          </Typography>
          <Flex align={{ items: 'center' }} gap='16'>
            {BOOLEAN_VALUES.map((checked) => (
              <Checkbox
                aria-label={`checked-${checked}`}
                checked={checked}
                disabled={disabled}
                key={`checked-${checked}`}
                onChange={onChange}
              />
            ))}
          </Flex>
        </Flex>
      ))}
    </Flex>
  ),
};
