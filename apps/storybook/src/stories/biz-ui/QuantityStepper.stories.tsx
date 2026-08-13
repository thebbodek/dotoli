import {
  Flex,
  QUANTITY_STEPPER_MAX,
  QuantityStepper,
  QuantityStepperProps,
  Typography,
} from '@bbodek/biz-ui';
import { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';

const PRODUCT = {
  name: '빈박스 (10입)',
  imageUrl: 'https://image.thebbodek.com/logo/logo-color-symbol-bg.png',
  unitsPerBox: 10,
};

const STOCK = 20;

const ERROR_MESSAGE = `주문 가능 수량은 ${STOCK}개입니다`;

const STEPPER_WIDTH_STYLE = 'w-[312px]';

const StatefulStepper = ({
  value: initialValue,
  onChange,
  ...props
}: QuantityStepperProps) => {
  const [value, setValue] = useState(initialValue);

  const handleChange = (next: number) => {
    setValue(next);
    onChange(next);
  };

  return (
    <QuantityStepper
      {...props}
      className={STEPPER_WIDTH_STYLE}
      value={value}
      onChange={handleChange}
    />
  );
};

const meta = {
  title: 'core/biz-ui/Order/QuantityStepper',
  component: QuantityStepper,
  argTypes: {
    name: { control: 'text', type: { name: 'string', required: true } },
    imageUrl: { control: 'text', type: { name: 'string', required: true } },
    value: { control: 'number', type: { name: 'number', required: true } },
    unitsPerBox: {
      control: 'number',
      type: { name: 'number', required: true },
    },
    errorMessage: { control: 'text', table: { type: { summary: 'string' } } },
    max: {
      control: 'number',
      table: { defaultValue: { summary: `${QUANTITY_STEPPER_MAX}` } },
    },
    placeholder: {
      control: 'text',
      table: { defaultValue: { summary: '얼마나 시킬까요' } },
    },
    onChange: { action: 'change' },
  },
  args: {
    ...PRODUCT,
    value: 2,
    max: STOCK,
    errorMessage: ERROR_MESSAGE,
  },
} satisfies Meta<typeof QuantityStepper>;

export default meta;

type Story = StoryObj<typeof QuantityStepper>;

export const Default: Story = {
  render: (args) => <StatefulStepper {...args} key={args.value} />,
};

export const States: Story = {
  parameters: { controls: { disable: true }, layout: 'padded' },
  render: (args) => (
    <Flex align={{ items: 'start' }} gap='40'>
      {[0, 2, STOCK + 1].map((value) => (
        <Flex
          align={{ items: 'start' }}
          direction='column'
          gap='12'
          key={value}
        >
          <Typography color='gray-500' variant='label-bold'>
            value = {value}
          </Typography>
          <StatefulStepper {...args} value={value} />
        </Flex>
      ))}
    </Flex>
  ),
};

export const UnitsPerBox: Story = {
  parameters: { controls: { disable: true }, layout: 'padded' },
  render: (args) => (
    <Flex align={{ items: 'start' }} gap='40'>
      {[10, 20, 30].map((unitsPerBox) => (
        <Flex
          align={{ items: 'start' }}
          direction='column'
          gap='12'
          key={unitsPerBox}
        >
          <Typography color='gray-500' variant='label-bold'>
            unitsPerBox = {unitsPerBox}
          </Typography>
          <StatefulStepper
            {...args}
            name={`빈박스 (${unitsPerBox}개)`}
            unitsPerBox={unitsPerBox}
            value={2}
          />
        </Flex>
      ))}
    </Flex>
  ),
};
