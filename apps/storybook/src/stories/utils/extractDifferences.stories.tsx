import { Button, Flex, Icon, Typography } from '@bbodek/internal-ui';
import { extractDifferences } from '@bbodek/utils';
import { useState } from 'react';

const meta = {
  title: 'core/utils/extractDifferences',
  argTypes: {
    values: {
      control: {
        type: 'object',
      },
      type: 'object',
    },
    originalValues: {
      control: {
        type: 'object',
      },
      type: 'object',
    },
  },
};

export default meta;

interface Obj {
  a: number;
  b: number;
  c: number;
}

const Item = ({ label, values }: { label: string; values: Partial<Obj> }) => (
  <Flex
    direction='column'
    gap={{ column: '2' }}
    className='bg-in-primary-01 rounded-in-8 w-full min-w-[132px] px-4 py-2'
  >
    {label && (
      <Typography color='primary-06' variant='body-16-m'>
        {label}
      </Typography>
    )}
    <Flex direction='column'>
      {Object.entries(values).map(([key, value]) => (
        <Typography key={key}>{`${key}: ${value}`}</Typography>
      ))}
    </Flex>
  </Flex>
);

export const Default = {
  render: () => {
    const originalValues = { a: 1, b: 2, c: 3 };
    const values = { a: 1, b: 3, c: 30 };
    const [differences, setDifferences] = useState<Partial<Obj> | null>(null);

    const onClick = () => {
      setDifferences(extractDifferences({ values, originalValues }));
    };

    return (
      <Flex
        direction='column'
        gap={{ column: '4' }}
        align={{ items: 'center' }}
      >
        <Flex gap={{ row: '4' }}>
          <Item label='기존 객체' values={originalValues} />
          <Item label='변경 객체' values={values} />
          {differences && (
            <>
              <Icon iconKey='arrow-right' className='text-in-gray-06' />
              <Item label='추출 결과' values={differences} />
            </>
          )}
        </Flex>
        <Button
          label='변경된 객체 추출하기'
          onClick={onClick}
          className='w-[300px]'
        />
      </Flex>
    );
  },
};
