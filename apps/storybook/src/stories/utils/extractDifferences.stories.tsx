import { Button, Flex, Icon, Typography } from '@bbodek/internal-ui';
import { extractDifferences, ExtractDifferencesParams } from '@bbodek/utils';
import { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';

interface Obj {
  a: number;
  b: number;
  c: number;
}
type Props = ExtractDifferencesParams<Obj>;

const meta = {
  title: 'core/utils/extractDifferences',
  argTypes: {
    values: {
      description: 'new values',
      table: {
        type: {
          summary: 'object',
        },
      },
    },
    originalValues: {
      description: 'original values',
      table: {
        type: {
          summary: 'object',
        },
      },
    },
  },
} satisfies Meta<Props>;

export default meta;

type Story = StoryObj<Props>;

const Item = ({ label, values }: { label: string; values: Partial<Obj> }) => (
  <Flex
    className='bg-in-primary-01 rounded-in-8 w-full min-w-[132px] px-4 py-2'
    direction='column'
    gap={{ column: '8' }}
  >
    <Typography color='primary-06' variant='body-16-m'>
      {label}
    </Typography>
    <Flex direction='column'>
      {Object.entries(values).map(([key, value]) => (
        <Typography key={key}>{`${key}: ${value}`}</Typography>
      ))}
    </Flex>
  </Flex>
);

export const Default: Story = {
  render: () => {
    const originalValues = { a: 1, b: 2, c: 3 };
    const values = { a: 1, b: 3, c: 30 };
    const [differences, setDifferences] = useState<Partial<Obj> | null>(null);

    const onClick = () => {
      setDifferences(extractDifferences({ values, originalValues }));
    };

    return (
      <Flex
        align={{ items: 'center' }}
        direction='column'
        gap={{ column: '16' }}
      >
        <Flex gap={{ row: '16' }}>
          <Item label='기존 객체' values={originalValues} />
          <Item label='변경 객체' values={values} />
          {differences && (
            <>
              <Icon className='text-in-gray-06' iconKey='arrow-right' />
              <Item label='추출 결과' values={differences} />
            </>
          )}
        </Flex>
        <Button
          className='w-[300px]'
          label='변경된 객체 추출하기'
          onClick={onClick}
        />
      </Flex>
    );
  },
};
