import { useDropzone, useForm } from '@bbodek/hooks';
import {
  File,
  FILE_UPLOAD_STATES,
  FileGroup,
  FileUploader,
  PreviewFileData,
  PreviewSingle,
} from '@bbodek/internal-ui';
import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';

import { generateArgTypeSummary } from '@/utils/generateArgTypeSummary';

const meta = {
  title: 'core/internal-ui/File/File',
  component: File,
  argTypes: {
    file: {
      description: 'file data',
      control: 'object',
      type: {
        name: 'object',
        required: true,
        value: {
          id: { name: 'string', required: true },
          name: { name: 'string', required: true },
          type: { name: 'string', required: true },
          size: { name: 'string', required: false },
          blob: { name: 'string', required: false },
          lastModified: { name: 'string', required: false },
          webkitRelativePath: { name: 'string', required: false },
          original: { name: 'string', required: false },
        },
      },
      table: {
        type: {
          summary: 'FileData | Pick<FileData, "id" | "name" | "type">',
        },
      },
    },
    createdAt: {
      description: 'created at',
      control: 'text',
      type: 'string',
    },
    state: {
      description: 'File state',
      control: 'select',
      options: Object.values(FILE_UPLOAD_STATES),
      table: {
        type: {
          summary: generateArgTypeSummary({
            options: Object.values(FILE_UPLOAD_STATES),
          }),
        },
        defaultValue: {
          summary: FILE_UPLOAD_STATES.DEFAULT,
        },
      },
    },
    onDelete: {
      description: 'on delete',
      type: 'function',
    },
    onPreview: {
      description: 'on preview',
      type: {
        name: 'function',
        required: true,
      },
    },
    onEdit: {
      description: 'on edit',
      type: 'function',
    },
    errorFeedback: {
      description: 'error feedback',
      control: 'text',
      type: 'string',
      table: {
        defaultValue: {
          summary: '업로드 실패! 삭제 후 알맞은 확장자로 다시 올려주세요',
        },
      },
    },
    disabled: {
      description: 'disabled',
      control: 'boolean',
      type: 'boolean',
      table: {
        defaultValue: {
          summary: 'false',
        },
      },
    },
  },
} satisfies Meta<typeof File>;

export default meta;

type Story = StoryObj<typeof File>;

export const Default: Story = {
  render: (args) => {
    const { values, setValues } = useForm<{ files: PreviewFileData[] }>({
      initialValues: {
        files: [],
      },
    });
    const {
      rootProps,
      inputProps,
      state: { rejectedFiles },
      deleteFile,
    } = useDropzone({
      multiple: true,
      onDropAccepted: ({ acceptedFiles }) => {
        setValues({ files: acceptedFiles });
      },
    });
    const [previewFile, setPreviewFile] = useState<PreviewFileData | null>(
      null,
    );

    return (
      <div className='in-tablet:w-[37.5rem] in-flex-v-stack w-[22.5rem] gap-y-4'>
        <FileUploader
          inputProps={inputProps}
          rejectedFiles={rejectedFiles}
          rootProps={rootProps}
        />
        {values.files.length > 0 && (
          <FileGroup label='신규'>
            {values.files.map((file) => {
              return (
                <File
                  createdAt={args.createdAt ?? new Date().toISOString()}
                  disabled={args.disabled ?? false}
                  errorFeedback={args.errorFeedback}
                  file={file}
                  key={file.id}
                  state={args.state}
                  url='https://ontheline.trincoll.edu/images/bookdown/sample-local-pdf.pdf'
                  onDelete={({ id }) => {
                    deleteFile({ id });
                    setValues({
                      files: values.files.filter((file) => file.id !== id),
                    });
                  }}
                  onEdit={({ id, value }) => {
                    setValues({
                      files: values.files.map((file) =>
                        file.id === id ? { ...file, name: value } : file,
                      ),
                    });
                  }}
                  onPreview={({ file }) => setPreviewFile(file)}
                />
              );
            })}
          </FileGroup>
        )}
        {previewFile && (
          <PreviewSingle
            className='h-[500px]'
            file={previewFile}
            isOpen
            onClose={() => setPreviewFile(null)}
          />
        )}
      </div>
    );
  },
};
