import { Alert, Flex, InputField } from '@bbodek/internal-ui';
import {
  DATE_FORMATS,
  DateIsValidParams,
  isValid,
  now,
  toString,
} from '@bbodek/utils';
import { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';

import { generateArgTypeSummary } from '@/utils/generateArgTypeSummary';

const meta: Meta<DateIsValidParams> = {
  title: 'core/utils/date/isValid',
  argTypes: {
    date: {
      description: 'Date value',
      control: {
        type: 'text',
      },
      type: {
        required: true,
        name: 'string',
      },
      table: {
        type: {
          summary: 'string',
        },
      },
    },
    format: {
      control: 'select',
      description: 'Date format of isValid',
      options: Object.keys(DATE_FORMATS),
      table: {
        defaultValue: {
          summary: DATE_FORMATS['YYYY-MM-DD'],
        },
        type: {
          summary: generateArgTypeSummary({
            options: Object.keys(DATE_FORMATS),
          }),
        },
      },
    },
  },
  args: {
    date: toString({
      date: now(),
      format: DATE_FORMATS['YYYY-MM-DD'],
    }),
    format: DATE_FORMATS['YYYY-MM-DD'],
  },
};

export default meta;

type Story = StoryObj<DateIsValidParams>;

export const Default: Story = {
  render: (args) => {
    const [value, setValue] = useState(args.date);
    const isError = !isValid({
      date: value,
      format: args.format,
    });

    return (
      <Flex direction='column' gap='2' className='w-[20rem]'>
        <InputField
          label='날짜 유효성 검증 테스트'
          value={value?.toString() || ''}
          onChange={(e) => setValue(e.target.value)}
        />
        <Alert
          content={isError ? '유효하지 않은 날짜입니다.' : '유효한 날짜입니다.'}
          theme={isError ? 'red' : 'green'}
        />
      </Flex>
    );
  },
};
