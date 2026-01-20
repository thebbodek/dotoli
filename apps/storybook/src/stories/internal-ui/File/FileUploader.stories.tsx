import { useDropzone } from '@bbodek/hooks';
import { FileUploader, IconButton, Typography } from '@bbodek/internal-ui';
import type { Meta, StoryObj } from '@storybook/react';

const meta = {
  title: 'core/internal-ui/File/FileUploader',
  component: FileUploader,
  parameters: {
    docs: {
      description: {
        component: '`useDropzone` hook과 함께 사용하는 컴포넌트입니다.',
      },
    },
  },
  argTypes: {
    accept: {
      control: 'object',
      description: 'accept file types (string or array)',
      type: {
        name: 'array',
        value: { name: 'string' },
      },
    },
    disabled: {
      control: 'boolean',
      description: 'disable uploader',
      type: 'boolean',
    },
    rejectedFiles: {
      control: 'object',
      description: 'rejected files',
      table: {
        type: {
          summary: 'object',
        },
      },
    },
    rootProps: {
      control: 'object',
      description: 'root props',
      table: {
        type: {
          summary: 'object',
        },
      },
    },
    inputProps: {
      control: 'object',
      description: 'input props',
      table: {
        type: {
          summary: 'object',
        },
      },
    },
    className: {
      control: 'text',
      description: 'custom classname',
      type: 'string',
    },
  },
} satisfies Meta<typeof FileUploader>;

export default meta;

type Story = StoryObj<typeof FileUploader>;

export const Default: Story = {
  args: { accept: ['png'], disabled: false },
  render: ({ disabled, accept, ...args }) => {
    const {
      rootProps,
      inputProps,
      state: { acceptedFiles, rejectedFiles },
      deleteFile,
    } = useDropzone({
      multiple: true,
      disabled,
      accept,
    });

    return (
      <div className='in-flex-v-stack w-[360px] max-w-full gap-y-4'>
        <FileUploader
          {...args}
          accept={accept}
          disabled={disabled}
          inputProps={args.inputProps ?? inputProps}
          rejectedFiles={args.rejectedFiles ?? rejectedFiles}
          rootProps={args.rootProps ?? rootProps}
        />
        {acceptedFiles.map(({ id, blob, name }) => (
          <div
            className='rounded-in-6 border-in-gray-03 flex w-full items-center justify-between border p-2'
            key={id}
          >
            <div className='flex items-center gap-x-2'>
              <div className='rounded-in-4 h-10 w-10 overflow-hidden'>
                <img
                  alt={name}
                  className='h-full w-full object-cover'
                  src={blob}
                />
              </div>
              <Typography color='gray-08' variant='body-14-m'>
                {name}
              </Typography>
            </div>
            <IconButton
              aria-label='삭제'
              iconKey='trash'
              onClick={() => {
                deleteFile({ id });
              }}
            />
          </div>
        ))}
      </div>
    );
  },
};
