import { Badge, Checkbox, Flex, Typography } from '@bbodek/internal-ui';
import { toAbstractString, ToAbstractStringParam } from '@bbodek/utils';
import type { Meta, StoryObj } from '@storybook/react';
import { useEffect, useState } from 'react';

const meta = {
  title: 'core/utils/toAbstractString',
  argTypes: {
    values: {
      control: 'object',
      description: 'string array',
      type: {
        name: 'array',
        value: { name: 'string' },
        required: true,
      },
      table: {
        type: {
          summary: 'string[]',
        },
      },
    },
    suffix: {
      control: 'text',
      description: 'suffix',
      table: {
        defaultValue: {
          summary: '개',
        },
      },
    },
    max: {
      control: 'number',
      description: 'max',
      table: {
        defaultValue: {
          summary: '2',
        },
      },
    },
  },
} satisfies Meta<ToAbstractStringParam>;

export default meta;

type Story = StoryObj<ToAbstractStringParam>;

const fruit = ['딸기', '사과', '바나나', '포도', '레몬'];

export const Default: Story = {
  args: {
    values: fruit,
  },
  render: ({ values: argValues, ...args }: ToAbstractStringParam) => {
    const [values, setValues] = useState<string[]>([]);
    const result = toAbstractString({ values, ...args });

    useEffect(() => {
      setValues(argValues);
    }, [argValues]);

    return (
      <Flex direction='column' gap='4'>
        <Flex gap='16'>
          {argValues.map((item) => (
            <Checkbox
              checked={values.includes(item)}
              key={item}
              label={item}
              onChange={(e) => {
                setValues((prev) =>
                  e.target.checked
                    ? [...prev, item]
                    : prev.filter((preItem) => preItem !== item),
                );
              }}
            />
          ))}
        </Flex>
        <Typography>
          {result && (
            <Badge
              label={`${result.value} ${result.remaining}`}
              variant='filled'
            />
          )}
        </Typography>
      </Flex>
    );
  },
};
