import {
  Icon,
  SearchSelect,
  SearchSelectProps,
  Select,
  SingleSelectOnSelectParams,
} from '@bbodek/internal-ui';
import { highlightText } from '@bbodek/utils';
import { Meta, StoryObj } from '@storybook/react';
import { ChangeEvent, useState } from 'react';

const items = [
  '뽀득 유치원',
  '뽀득 어린이집',
  '뽀득 어학원',
  '뽀득 초등학교',
  '뽀득 중학교',
  '뽀득 고등학교',
  '뽀득 대학교',
  '뽀득 대학원',
  '뽀득 연구소',
  '뽀득 연구원',
];

const meta: Meta<typeof SearchSelect> = {
  title: 'core/internal-ui/Select/SearchSelect',
  component: SearchSelect,
  argTypes: {
    label: {
      control: 'text',
      description: 'SearchSelect label',
      type: {
        required: true,
        name: 'string',
      },
    },
    popoverOption: {
      control: 'object',
      description: 'SearchSelect popover option',
    },
    inputOption: {
      control: 'object',
      description: 'SearchSelect input option',
    },
    badge: {
      description: 'SearchSelect Label Badge',
      table: {
        type: {
          summary: 'ReactNode',
        },
      },
      type: {
        name: 'other',
        value: 'ReactNode',
        required: false,
      },
    },
    placeholder: {
      control: 'text',
      description: 'SearchSelect placeholder',
      table: {
        type: {
          summary: 'string',
        },
      },
    },
    isError: {
      control: 'boolean',
      description: 'is error',
      table: {
        defaultValue: {
          summary: 'false',
        },
        type: {
          summary: 'boolean',
        },
      },
    },
    disabled: {
      control: 'boolean',
      description: 'SearchSelect disabled',
      table: {
        defaultValue: {
          summary: 'false',
        },
        type: {
          summary: 'boolean',
        },
      },
    },
    required: {
      control: 'boolean',
      description: 'SearchSelect required',
      table: {
        defaultValue: {
          summary: 'false',
        },
        type: {
          summary: 'boolean',
        },
      },
    },
    feedback: {
      control: 'text',
      description: 'SearchSelect feedback',
      table: {
        type: {
          summary: 'string',
        },
      },
    },
    value: {
      control: 'text',
      description: 'SearchSelect current value',
      table: {
        type: {
          summary: 'string | number | null',
        },
      },
      type: {
        required: true,
        name: 'other',
        value: 'string | number | null',
      },
    },
    displayValue: {
      control: 'text',
      description: 'SearchSelect current display value',
      table: {
        type: {
          summary: 'string | number | null',
        },
      },
      type: {
        required: true,
        name: 'other',
        value: 'string | number | null',
      },
    },
    onSelect: {
      description: 'SearchSelect on select',
      table: {
        type: {
          summary: 'function',
        },
      },
      type: {
        required: true,
        name: 'function',
      },
    },
    useReset: {
      control: 'boolean',
      description: 'use reset button',
      table: {
        defaultValue: {
          summary: 'true',
        },
        type: {
          summary: 'boolean',
        },
      },
    },
  },
};

export default meta;

type Story = StoryObj<typeof Select>;

export const Default = {
  render: ({
    label = 'SearchSelect Label',
    ...args
  }: SearchSelectProps<string>) => {
    const [value, setValue] = useState<string>('');
    const [searchValue, setSearchValue] = useState<string>('');

    const onSelect = ({ value }: SingleSelectOnSelectParams<string>) => {
      setValue(value);
    };

    const onSearch = (
      e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    ) => {
      setSearchValue(e.target.value);
    };

    const filteredItems = items.filter((item) => item.includes(searchValue));

    return (
      <SearchSelect
        className='w-[15rem]'
        label={label}
        {...args}
        popoverOption={{
          onPopoverClose: () => setSearchValue(''),
        }}
        displayValue={value}
        inputOption={{ value: searchValue, onChange: onSearch }}
        value={value}
        onSelect={onSelect}
      >
        {filteredItems.map((item) => (
          <SearchSelect.Item key={item} label={item} value={item}>
            {highlightText({ text: item, targetText: searchValue })}
          </SearchSelect.Item>
        ))}
      </SearchSelect>
    );
  },
};

export const WithBadge: Story = {
  render: () => {
    const [value, setValue] = useState<string>('');
    const [searchValue, setSearchValue] = useState<string>('');

    const onSelect = ({ value }: SingleSelectOnSelectParams<string>) => {
      setValue(value);
    };

    const onSearch = (
      e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    ) => {
      setSearchValue(e.target.value);
    };

    const filteredItems = items.filter((item) => item.includes(searchValue));

    return (
      <SearchSelect
        popoverOption={{
          onPopoverClose: () => setSearchValue(''),
        }}
        badge={<Icon iconKey='info' weight='fill' />}
        className='w-[15rem]'
        displayValue={value}
        inputOption={{ value: searchValue, onChange: onSearch }}
        label='Select Label'
        value={value}
        onSelect={onSelect}
      >
        {filteredItems.map((item) => (
          <SearchSelect.Item key={item} label={item} value={item}>
            {highlightText({ text: item, targetText: searchValue })}
          </SearchSelect.Item>
        ))}
      </SearchSelect>
    );
  },
};

export const Error: Story = {
  args: {
    isError: true,
    feedback: '에러가 발생했어요.',
  },
  render: ({ isError, feedback }) => {
    const [value, setValue] = useState<string>('');
    const [searchValue, setSearchValue] = useState<string>('');

    const onSelect = ({ value }: SingleSelectOnSelectParams<string>) => {
      setValue(value);
    };

    const onSearch = (
      e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    ) => {
      setSearchValue(e.target.value);
    };

    const filteredItems = items.filter((item) => item.includes(searchValue));

    return (
      <SearchSelect
        popoverOption={{
          onPopoverClose: () => setSearchValue(''),
        }}
        className='w-[15rem]'
        displayValue={value}
        feedback={feedback}
        inputOption={{ value: searchValue, onChange: onSearch }}
        isError={isError}
        label='SearchSelect Label'
        value={value}
        onSelect={onSelect}
      >
        {filteredItems.map((item) => (
          <SearchSelect.Item key={item} label={item} value={item}>
            {highlightText({ text: item, targetText: searchValue })}
          </SearchSelect.Item>
        ))}
      </SearchSelect>
    );
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
  },
  render: ({ disabled }) => {
    const [value, setValue] = useState<string>('');
    const [searchValue, setSearchValue] = useState<string>('');

    const onSelect = ({ value }: SingleSelectOnSelectParams<string>) => {
      setValue(value);
    };

    const onSearch = (
      e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    ) => {
      setSearchValue(e.target.value);
    };

    const filteredItems = items.filter((item) => item.includes(searchValue));

    return (
      <SearchSelect
        popoverOption={{
          onPopoverClose: () => setSearchValue(''),
        }}
        className='w-[15rem]'
        disabled={disabled}
        displayValue={value}
        inputOption={{ value: searchValue, onChange: onSearch }}
        label='SearchSelect Label'
        value={value}
        onSelect={onSelect}
      >
        {filteredItems.map((item) => (
          <SearchSelect.Item key={item} label={item} value={item}>
            {highlightText({ text: item, targetText: searchValue })}
          </SearchSelect.Item>
        ))}
      </SearchSelect>
    );
  },
};

export const Required: Story = {
  args: {
    required: true,
  },
  render: ({ required }) => {
    const [value, setValue] = useState<string>('');
    const [searchValue, setSearchValue] = useState<string>('');

    const onSelect = ({ value }: SingleSelectOnSelectParams<string>) => {
      setValue(value);
    };

    const onSearch = (
      e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    ) => {
      setSearchValue(e.target.value);
    };

    const filteredItems = items.filter((item) => item.includes(searchValue));

    return (
      <SearchSelect
        popoverOption={{
          onPopoverClose: () => setSearchValue(''),
        }}
        className='w-[15rem]'
        displayValue={value}
        inputOption={{ value: searchValue, onChange: onSearch }}
        label='SearchSelect Label'
        required={required}
        value={value}
        onSelect={onSelect}
      >
        {filteredItems.map((item) => (
          <SearchSelect.Item key={item} label={item} value={item}>
            {highlightText({ text: item, targetText: searchValue })}
          </SearchSelect.Item>
        ))}
      </SearchSelect>
    );
  },
};
