import { useDropzone } from '@bbodek/hooks';
import {
  File,
  FileUploader,
  PreviewFileData,
  PreviewMulti,
} from '@bbodek/internal-ui';
import type { Meta, StoryObj } from '@storybook/react';
import { overlay } from 'overlay-kit';
import { useState } from 'react';

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
  args: { disabled: false },
  render: ({ disabled, accept, ...args }) => {
    const [files, setFiles] = useState<PreviewFileData[]>([]);

    const {
      rootProps,
      inputProps,
      state: { acceptedFiles, rejectedFiles },
      deleteFile,
    } = useDropzone({
      multiple: true,
      disabled,
      accept,
      onDropAccepted: ({ acceptedFiles }) => {
        setFiles(acceptedFiles);
      },
    });

    const openPreview = ({ file }: { file: PreviewFileData }) => {
      overlay.open(({ isOpen, unmount }) => (
        <PreviewMulti
          files={files}
          initialFile={file}
          isOpen={isOpen}
          onClose={unmount}
        />
      ));
    };

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
        {acceptedFiles.map(({ id, ...file }) => (
          <File
            file={{ id, ...file }}
            key={id}
            onDelete={() => {
              deleteFile({ id });
              setFiles(files.filter((file) => file.id !== id));
            }}
            onPreview={openPreview}
          />
        ))}
      </div>
    );
  },
};
