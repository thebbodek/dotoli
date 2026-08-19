import { Flex, Toggle, ToggleProps, Typography } from '@bbodek/biz-ui';
import { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';

const BOOLEAN_VALUES = [false, true];

const meta = {
  title: 'core/biz-ui/Toggle',
  component: Toggle,
  argTypes: {
    checked: {
      control: 'boolean',
      type: { name: 'boolean', required: true },
    },
    'aria-label': { control: 'text' },
  },
  args: {
    checked: false,
    'aria-label': '정산 안내 알림',
    onChange: () => {},
  },
} satisfies Meta<ToggleProps>;

export default meta;

type Story = StoryObj<ToggleProps>;

export const Default: Story = {};

// 노브가 22px 이동하는 전환을 실제로 본다. 정적 스토리로는 안 보인다
export const Interactive: Story = {
  parameters: { controls: { disable: true } },
  render: ({ 'aria-label': ariaLabel }) => {
    const [checked, setChecked] = useState(false);

    return (
      <Toggle
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
    <Flex align={{ items: 'center' }} gap='32'>
      {BOOLEAN_VALUES.map((checked) => (
        <Flex
          align={{ items: 'start' }}
          direction='column'
          gap='12'
          key={`checked-${checked}`}
        >
          <Typography color='gray-500' variant='label-bold'>
            checked = {String(checked)}
          </Typography>
          <Toggle
            aria-label={`checked-${checked}`}
            checked={checked}
            onChange={onChange}
          />
        </Flex>
      ))}
    </Flex>
  ),
};
