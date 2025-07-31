import { Button, Flex, Table } from '@bbodek/internal-ui';
import {
  excelDownload,
  ExcelDownloadParams,
  now,
  toString,
} from '@bbodek/utils';
import type { Meta, StoryObj } from '@storybook/react';

import { generateArgTypeSummary } from '@/utils/generateArgTypeSummary';

const fileTypes = ['base64', 'binary', 'buffer', 'file', 'array', 'string'];

const meta: Meta<ExcelDownloadParams> = {
  title: 'core/utils/excelDownload',
  argTypes: {
    columns: {
      control: 'object',
      description: 'columns data',
      table: {
        type: { summary: 'string[]' },
      },
    },
    rows: {
      control: 'object',
      description: 'rows data',
      table: {
        type: { summary: 'ExcelCellOption[][]' },
      },
    },
    type: {
      control: 'select',
      description: 'file type',
      options: fileTypes,
      table: {
        defaultValue: {
          summary: 'file',
        },
        type: {
          summary: generateArgTypeSummary({ options: fileTypes }),
        },
      },
    },
    fileNameOption: {
      control: 'object',
      description: 'file name option',
      table: {
        type: {
          summary: '{ name: string, hasTimestamp?: boolean (default: true) }',
        },
      },
    },
    sheetName: {
      control: 'text',
      description: 'sheetName',
      table: {
        type: { summary: 'string' },
      },
    },
  },
};

export default meta;

type Story = StoryObj<ExcelDownloadParams>;

export const Default: Story = {
  args: {
    columns: ['제품명', '가격', '생산일', '카테고리', '링크'],
    rows: Array.from({ length: 10 }).map(() => [
      { value: '식기세척기' },
      { value: 10000 },
      { value: toString({ date: now() }) },
      { value: ['가전', '주방', '세척기'] },
      {
        value: 'https://bbodek.com',
        link: { Target: 'https://bbodek.com', tooltip: 'bbodek 홈페이지' },
      },
    ]),
  },
  render: (args) => {
    return (
      <Flex direction='column' align={{ items: 'end' }} gap={2}>
        <Button
          label='다운로드'
          size='sm'
          theme='green'
          className='w-fit'
          iconOption={{ iconKey: 'download-simple' }}
          onClick={() => excelDownload(args)}
        />

        <Table>
          <Table.Head>
            <Table.Row>
              {args.columns.map((column) => (
                <Table.Cell key={column} className='w-[150px]'>
                  {column}
                </Table.Cell>
              ))}
            </Table.Row>
          </Table.Head>
          <Table.Body>
            {args.rows.map((row, index) => (
              <Table.Row key={index}>
                {row.map(({ value }) => (
                  <Table.Cell key={String(value)} className='w-[150px]'>
                    {String(value)}
                  </Table.Cell>
                ))}
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      </Flex>
    );
  },
};
