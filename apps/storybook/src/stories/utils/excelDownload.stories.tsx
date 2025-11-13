import { Button, Flex, Table } from '@bbodek/internal-ui';
import {
  ExcelCellOption,
  excelDownload,
  ExcelDownloadParams,
  now,
  toString,
} from '@bbodek/utils';
import type { Meta, StoryObj } from '@storybook/react';

import { generateArgTypeSummary } from '@/utils/generateArgTypeSummary';

const FILE_TYPES = ['base64', 'binary', 'buffer', 'file', 'array', 'string'];

interface ExcelDownloadArgs extends ExcelDownloadParams {
  fileName?: NonNullable<ExcelDownloadParams['fileNameOption']>['name'];
  fileNameHasTimestamp?: NonNullable<
    ExcelDownloadParams['fileNameOption']
  >['hasTimestamp'];
  rowValue?: ExcelCellOption['value'];
  rowLink?: ExcelCellOption['link'];
}

const meta = {
  title: 'core/utils/excelDownload',
  argTypes: {
    columns: {
      description: 'columns data',
      type: {
        name: 'array',
        value: { name: 'string' },
        required: true,
      },
      table: {
        type: { summary: 'string[]' },
      },
    },
    rows: {
      description: 'rows data',
      type: {
        name: 'array',
        value: { name: 'other', value: 'ExcelCellOption[]' },
        required: true,
      },
      table: {
        type: { summary: 'ExcelCellOption[][]' },
      },
    },
    rowValue: {
      name: 'value',
      control: 'text',
      description: 'row value',
      type: {
        name: 'other',
        required: true,
        value: 'string | number | boolean | Date | undefined',
      },
      table: {
        category: 'ExcelCellOption',
        type: {
          summary: generateArgTypeSummary({
            options: [
              'string',
              'number',
              'boolean',
              'Date',
              'undefined',
              'string array',
            ],
          }),
        },
      },
    },
    rowLink: {
      name: 'link',
      control: 'object',
      description: 'row link',
      table: {
        category: 'ExcelCellOption',
        type: {
          summary: 'HyperLink',
        },
      },
    },
    type: {
      control: 'select',
      description: 'file type',
      options: FILE_TYPES,
      table: {
        defaultValue: {
          summary: 'file',
        },
        type: {
          summary: generateArgTypeSummary({ options: FILE_TYPES }),
        },
      },
    },
    fileNameOption: {
      control: 'object',
      description: 'file name option',
      table: {
        type: {
          summary: 'object',
        },
      },
    },
    fileName: {
      control: 'text',
      name: 'name',
      description: 'file name',
      type: { name: 'string', required: true },
      table: {
        category: 'fileNameOption',
      },
    },
    fileNameHasTimestamp: {
      control: 'boolean',
      name: 'hasTimestamp',
      description: 'file name has timestamp',
      type: 'boolean',
      table: {
        category: 'fileNameOption',
      },
    },
    sheetName: {
      control: 'text',
      description: 'sheet name',
      type: 'string',
      table: {
        defaultValue: {
          summary: 'Sheet1',
        },
      },
    },
  },
} satisfies Meta<ExcelDownloadArgs>;

export default meta;

type Story = StoryObj<ExcelDownloadArgs>;

export const Default: Story = {
  args: {
    columns: ['제품명', '가격', '생산일', '카테고리', '링크'],
    rows: Array.from({ length: 5 }).map(() => [
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
  render: ({ fileName = 'test', fileNameHasTimestamp = true, ...args }) => {
    return (
      <Flex align={{ items: 'end' }} direction='column' gap='4'>
        <Button
          className='w-fit'
          iconOption={{ iconKey: 'download-simple' }}
          label='다운로드'
          size='sm'
          theme='green'
          onClick={() =>
            excelDownload({
              ...args,
              fileNameOption: {
                name: fileName,
                hasTimestamp: fileNameHasTimestamp,
              },
            })
          }
        />

        <Table>
          <Table.Head>
            <Table.Row>
              {args.columns.map((column) => (
                <Table.Cell className='w-[150px]' key={column}>
                  {column}
                </Table.Cell>
              ))}
            </Table.Row>
          </Table.Head>
          <Table.Body>
            {args.rows.map((row, index) => (
              <Table.Row key={index}>
                {row.map(({ value }) => (
                  <Table.Cell className='w-[150px]' key={String(value)}>
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
