import {
  Flex,
  INPUT_DEFAULT_MAX_LENGTH,
  INPUT_FIELD_TYPES,
  INPUT_FIELD_VERIFY_LABEL,
  InputField,
  InputFieldProps,
  Typography,
} from '@bbodek/biz-ui';
import { Meta, StoryObj } from '@storybook/react';
import { ChangeEvent, useState } from 'react';

import { generateArgTypeSummary } from '@/utils/generateArgTypeSummary';

const FIELD_WIDTH = 'w-[300px]';

const PASSWORD_CONDITIONS = [
  { label: '영문', isSatisfied: true },
  { label: '숫자', isSatisfied: true },
  { label: '특수문자', isSatisfied: false },
  { label: '8자 이상', isSatisfied: false },
];

const CONSUMER_STATES = [
  { name: 'default', value: '' },
  { name: 'filled', value: '입력완료' },
  {
    name: 'error',
    value: '아이디에&&**',
    errorMessage: '에러 메시지가 표시됩니다',
  },
  { name: 'disabled', value: '', disabled: true },
] satisfies Array<{ name: string } & Partial<InputFieldProps>>;

const FIGMA_STATES = [
  ...CONSUMER_STATES,
  { name: 'filledDisabled', value: '입력완료', disabled: true },
] satisfies Array<{ name: string } & Partial<InputFieldProps>>;

const meta = {
  title: 'core/biz-ui/Input/InputField',
  component: InputField,
  argTypes: {
    label: {
      control: 'text',
      type: { name: 'string', required: true },
    },
    type: {
      control: 'inline-radio',
      options: Object.values(INPUT_FIELD_TYPES),
      table: {
        defaultValue: { summary: INPUT_FIELD_TYPES.TEXT },
        type: {
          summary: generateArgTypeSummary({
            options: Object.values(INPUT_FIELD_TYPES),
          }),
        },
      },
    },
    value: { control: 'text' },
    placeholder: { control: 'text' },
    errorMessage: { control: 'text' },
    verifyLabel: {
      control: 'text',
      table: { defaultValue: { summary: INPUT_FIELD_VERIFY_LABEL } },
    },
    disabled: {
      control: 'boolean',
      table: { defaultValue: { summary: 'false' } },
    },
    readOnly: {
      control: 'boolean',
      table: { defaultValue: { summary: 'false' } },
    },
    conditions: { control: 'object' },
    isOpen: { control: 'boolean' },
    autoFocus: {
      control: 'boolean',
      table: { defaultValue: { summary: 'false' } },
    },
    tabIndex: { control: 'number' },
    maxLength: {
      control: 'number',
      table: { defaultValue: { summary: `${INPUT_DEFAULT_MAX_LENGTH}` } },
    },
  },
  args: {
    label: 'Label',
    placeholder: '안내사항',
  },
} satisfies Meta<InputFieldProps>;

export default meta;

type Story = StoryObj<InputFieldProps>;

export const Default: Story = {
  render: ({ value: initialValue, ...args }) => {
    const [value, setValue] = useState(initialValue ?? '');

    return (
      <InputField
        {...args}
        className={FIELD_WIDTH}
        value={value}
        onChange={({ target }: ChangeEvent<HTMLInputElement>) =>
          setValue(target.value)
        }
        onClear={() => setValue('')}
      />
    );
  },
};

export const Types: Story = {
  parameters: { controls: { disable: true } },
  render: ({ label, placeholder }) => (
    <Flex align={{ items: 'start' }} gap='24' wrap='wrap'>
      {Object.values(INPUT_FIELD_TYPES).map((type) => (
        <Flex direction='column' gap='12' key={type}>
          <Typography color='gray-500' variant='label-bold'>
            type = {type}
          </Typography>
          <InputField
            className={FIELD_WIDTH}
            label={label}
            placeholder={placeholder}
            type={type}
            value='입력완료'
            onChange={() => {}}
            onClear={() => {}}
          />
        </Flex>
      ))}
    </Flex>
  ),
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
          <InputField
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

export const PasswordConditions: Story = {
  parameters: { controls: { disable: true } },
  render: ({ label, placeholder }) => {
    const [value, setValue] = useState('password');

    return (
      <InputField
        className={FIELD_WIDTH}
        conditions={PASSWORD_CONDITIONS}
        label={label}
        placeholder={placeholder}
        type={INPUT_FIELD_TYPES.PASSWORD}
        value={value}
        onChange={({ target }: ChangeEvent<HTMLInputElement>) =>
          setValue(target.value)
        }
      />
    );
  },
};

export const Matrix: Story = {
  parameters: { controls: { disable: true } },
  render: ({ label, placeholder }) => (
    <Flex direction='column' gap='24'>
      {Object.values(INPUT_FIELD_TYPES).map((type) => (
        <Flex align={{ items: 'start' }} gap='16' key={type} wrap='wrap'>
          {FIGMA_STATES.map(({ name, ...state }) => (
            <Flex direction='column' gap='8' key={`${type}-${name}`}>
              <Typography color='gray-500' variant='caption'>
                {type} / {name}
              </Typography>
              <InputField
                {...state}
                className={FIELD_WIDTH}
                label={label}
                placeholder={placeholder}
                type={type}
                onChange={() => {}}
                onClear={() => {}}
              />
            </Flex>
          ))}
        </Flex>
      ))}
    </Flex>
  ),
};
