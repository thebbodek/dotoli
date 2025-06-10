import { Icon, SearchSelect, Select, SelectProps } from '@bbodek/internal-ui';
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
    value: {
      control: 'text',
      description: 'SearchSelect value',
      table: {
        type: {
          summary: 'string | null | number',
        },
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
        required: true,
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
  },
  args: {
    label: 'SearchSelect Label',
    placeholder: 'Placeholder',
    className: 'w-[20rem]',
  },
};

export default meta;

type Story = StoryObj<typeof Select>;

export const Default = {
  render: (args: SelectProps) => {
    const [value, setValue] = useState<string | null>(null);
    const [searchValue, setSearchValue] = useState<string>('');

    const onSearch = (
      e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    ) => {
      setSearchValue(e.target.value);
    };

    const filteredItems = items.filter((item) => item.includes(searchValue));

    return (
      <SearchSelect
        {...args}
        value={value}
        inputOption={{ value: searchValue, onChange: onSearch }}
      >
        {filteredItems.map((item) => (
          <SearchSelect.Item
            key={item}
            onSelect={() => {
              setValue(item);
            }}
            selected={value === item}
          >
            {item}
          </SearchSelect.Item>
        ))}
      </SearchSelect>
    );
  },
};

export const WithBadge: Story = {
  args: {
    badge: <Icon iconKey='info' weight='fill' />,
  },
  render: ({ badge, placeholder, className }) => {
    const [value, setValue] = useState<string | null>(null);
    const [searchValue, setSearchValue] = useState<string>('');

    const onSearch = (
      e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    ) => {
      setSearchValue(e.target.value);
    };

    const filteredItems = items.filter((item) => item.includes(searchValue));

    return (
      <SearchSelect
        className={className}
        label='Select Label'
        value={value}
        badge={badge}
        placeholder={placeholder}
        inputOption={{ value: searchValue, onChange: onSearch }}
      >
        {filteredItems.map((item) => (
          <SearchSelect.Item
            key={item}
            onSelect={() => {
              setValue(item);
            }}
            selected={value === item}
          >
            {item}
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
  render: ({ isError, feedback, placeholder, className }) => {
    const [value, setValue] = useState<string | null>(null);
    const [searchValue, setSearchValue] = useState<string>('');

    const onSearch = (
      e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    ) => {
      setSearchValue(e.target.value);
    };

    const filteredItems = items.filter((item) => item.includes(searchValue));

    return (
      <SearchSelect
        label='Select Label'
        value={value}
        isError={isError}
        feedback={feedback}
        placeholder={placeholder}
        className={className}
        inputOption={{ value: searchValue, onChange: onSearch }}
      >
        {filteredItems.map((item) => (
          <SearchSelect.Item
            key={item}
            onSelect={() => {
              setValue(item);
            }}
            selected={value === item}
          >
            {item}
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
  render: ({ disabled, placeholder, className }) => {
    const [value, setValue] = useState<string | null>(null);
    const [searchValue, setSearchValue] = useState<string>('');

    const onSearch = (
      e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    ) => {
      setSearchValue(e.target.value);
    };

    const filteredItems = items.filter((item) => item.includes(searchValue));

    return (
      <SearchSelect
        label='Select Label'
        value={value}
        disabled={disabled}
        placeholder={placeholder}
        className={className}
        inputOption={{ value: searchValue, onChange: onSearch }}
      >
        {filteredItems.map((item) => (
          <SearchSelect.Item
            key={item}
            onSelect={() => {
              setValue(item);
            }}
            selected={value === item}
          >
            {item}
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
  render: ({ required, placeholder }) => {
    const [value, setValue] = useState<string | null>(null);
    const [searchValue, setSearchValue] = useState<string>('');

    const onSearch = (
      e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    ) => {
      setSearchValue(e.target.value);
    };

    const filteredItems = items.filter((item) => item.includes(searchValue));

    return (
      <SearchSelect
        label='Select Label'
        value={value}
        required={required}
        placeholder={placeholder}
        inputOption={{ value: searchValue, onChange: onSearch }}
      >
        {filteredItems.map((item) => (
          <SearchSelect.Item
            key={item}
            onSelect={() => {
              setValue(item);
            }}
            selected={value === item}
          >
            {item}
          </SearchSelect.Item>
        ))}
      </SearchSelect>
    );
  },
};
