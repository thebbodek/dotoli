import {
  Flex,
  INPUT_DEFAULT_MAX_LENGTH,
  SEARCH_INPUT_PLACEHOLDER,
  SEARCH_INPUT_STATES,
  SearchInput,
  SearchInputProps,
  Typography,
} from '@bbodek/biz-ui';
import { Meta, StoryObj } from '@storybook/react';
import { ChangeEvent, useState } from 'react';

const FIELD_WIDTH = 'w-[300px]';

const SAMPLE_QUERY = '왕이 궁에 들어가기 싫으면?';

const ERROR_MESSAGE = '에러 메시지가 표시됩니다';

// typing은 포커스에서 파생돼 정적으로 만들 수 없다. autoFocus로 하나만 실제 포커스를 준다
const FIGMA_STATES = [
  { name: SEARCH_INPUT_STATES.DEFAULT, value: '' },
  { name: SEARCH_INPUT_STATES.TYPING, value: SAMPLE_QUERY, autoFocus: true },
  { name: SEARCH_INPUT_STATES.FILL, value: SAMPLE_QUERY },
  {
    name: SEARCH_INPUT_STATES.ERROR,
    value: SAMPLE_QUERY,
    errorMessage: ERROR_MESSAGE,
  },
] satisfies Array<{ name: string } & Partial<SearchInputProps>>;

const meta = {
  title: 'core/biz-ui/Input/SearchInput',
  component: SearchInput,
  argTypes: {
    value: {
      control: 'text',
      type: { name: 'string', required: true },
    },
    placeholder: {
      control: 'text',
      table: { defaultValue: { summary: SEARCH_INPUT_PLACEHOLDER } },
    },
    errorMessage: { control: 'text' },
    autoFocus: {
      control: 'boolean',
      table: { defaultValue: { summary: 'false' } },
    },
    tabIndex: { control: 'number' },
    maxLength: {
      control: 'number',
      table: { defaultValue: { summary: `${INPUT_DEFAULT_MAX_LENGTH}` } },
    },
    'aria-label': { control: 'text' },
  },
  args: {
    value: '',
    'aria-label': '자주 묻는 질문 검색',
  },
} satisfies Meta<SearchInputProps>;

export default meta;

type Story = StoryObj<SearchInputProps>;

export const Default: Story = {
  render: ({ value: initialValue, ...args }) => {
    const [value, setValue] = useState(initialValue);

    return (
      <SearchInput
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

export const States: Story = {
  parameters: { controls: { disable: true } },
  render: ({ placeholder }) => (
    <Flex align={{ items: 'start' }} gap='24' wrap='wrap'>
      {FIGMA_STATES.map(({ name, ...state }) => (
        <Flex direction='column' gap='12' key={name}>
          <Typography color='gray-500' variant='label-bold'>
            state = {name}
          </Typography>
          <SearchInput
            {...state}
            aria-label={name}
            className={FIELD_WIDTH}
            placeholder={placeholder}
            onChange={() => {}}
            onClear={() => {}}
          />
        </Flex>
      ))}
    </Flex>
  ),
};
