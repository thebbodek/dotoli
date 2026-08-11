import {
  Flex,
  TextArea,
  TEXTAREA_DEFAULT_HEIGHT,
  TEXTAREA_DEFAULT_MAX_LENGTH,
  TextAreaProps,
  Typography,
} from '@bbodek/biz-ui';
import { Meta, StoryObj } from '@storybook/react';
import { ChangeEvent, useState } from 'react';

const FIELD_WIDTH = 'w-[300px]';

const MULTILINE_VALUE =
  '긴 텍스트를 입력할 수 있는 영역입니다.\n여러 줄을 입력할 수 있습니다.';

const CONSUMER_STATES = [
  { name: 'default', value: '' },
  { name: 'filled', value: MULTILINE_VALUE },
  {
    name: 'error',
    value: '잘못된 내용이 입력되었습니다.\n에러 상태의 텍스트입니다.',
    errorMessage: '에러 메시지가 표시됩니다',
  },
  { name: 'disabled', value: '', disabled: true },
] satisfies Array<{ name: string } & Partial<TextAreaProps>>;

const meta = {
  title: 'core/biz-ui/Input/TextArea',
  component: TextArea,
  argTypes: {
    label: {
      control: 'text',
      type: { name: 'string', required: true },
    },
    value: { control: 'text' },
    placeholder: { control: 'text' },
    errorMessage: { control: 'text' },
    conditions: { control: 'object' },
    disabled: {
      control: 'boolean',
      table: { defaultValue: { summary: 'false' } },
    },
    readOnly: {
      control: 'boolean',
      table: { defaultValue: { summary: 'false' } },
    },
    autoFocus: {
      control: 'boolean',
      table: { defaultValue: { summary: 'false' } },
    },
    tabIndex: { control: 'number' },
    height: {
      control: 'number',
      table: { defaultValue: { summary: `${TEXTAREA_DEFAULT_HEIGHT}` } },
    },
    maxLength: {
      control: 'number',
      table: { defaultValue: { summary: `${TEXTAREA_DEFAULT_MAX_LENGTH}` } },
    },
  },
  args: {
    label: 'Label',
    placeholder: '안내사항',
  },
} satisfies Meta<TextAreaProps>;

export default meta;

type Story = StoryObj<TextAreaProps>;

export const Default: Story = {
  render: ({ value: initialValue, ...args }) => {
    const [value, setValue] = useState(initialValue ?? '');

    return (
      <TextArea
        {...args}
        className={FIELD_WIDTH}
        value={value}
        onChange={({ target }: ChangeEvent<HTMLTextAreaElement>) =>
          setValue(target.value)
        }
      />
    );
  },
};

export const States: Story = {
  parameters: { controls: { disable: true } },
  render: ({ label, placeholder }) => (
    <Flex align={{ items: 'start' }} gap='24' wrap='wrap'>
      {CONSUMER_STATES.map(({ name, ...state }) => (
        <Flex direction='column' gap='12' key={name}>
          <Typography color='gray-500' variant='label-bold'>
            {name}
          </Typography>
          <TextArea
            {...state}
            className={FIELD_WIDTH}
            label={label}
            placeholder={placeholder}
            onChange={() => {}}
          />
        </Flex>
      ))}
    </Flex>
  ),
};
