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

// Figma 문서 프레임이 300px이다. hug가 아니라 부모 폭을 채우는 컴포넌트라 스토리에서 폭을 준다
const FIELD_WIDTH = 'w-[300px]';

const PASSWORD_CONDITIONS = [
  { label: '영문', isSatisfied: true },
  { label: '숫자', isSatisfied: true },
  { label: '특수문자', isSatisfied: false },
  { label: '8자 이상', isSatisfied: false },
];

// default·focus는 CSS 상태라 정적으로 깔 수 없다. 값 유무로 갈리는 것만 나열한다
const STATIC_STATES = [
  { name: 'default', value: '' },
  { name: 'filled', value: '입력완료' },
  {
    name: 'error',
    value: '아이디에&&**',
    errorMessage: '에러 메시지가 표시됩니다',
  },
  { name: 'disabled', value: '', disabled: true },
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
    // select이 여는 바텀시트의 열림 상태. 스타일이 아니라 aria-expanded에만 실린다
    isOpen: { control: 'boolean' },
    // 순차 입력 전환(Figma 355:1307)은 화면 몫이고 컴포넌트는 이 셋만 열어 둔다
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
      {STATIC_STATES.map(({ name, ...state }) => (
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
          {STATIC_STATES.map(({ name, ...state }) => (
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
