import {
  Badge,
  Button,
  PreviewFileData,
  PreviewSingle,
} from '@bbodek/internal-ui';
import { getUUID } from '@bbodek/utils';
import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';

const meta: Meta<typeof PreviewSingle> = {
  title: 'core/internal-ui/Preview/PreviewSingle',
  component: PreviewSingle,
  argTypes: {
    isOpen: {
      control: 'boolean',
      description: 'is open',
      type: {
        required: true,
        name: 'boolean',
      },
    },
    file: {
      control: 'text',
      description: 'preview file source url',
      type: {
        required: true,
        name: 'string',
      },
      table: {
        type: {
          summary: 'FileData | Pick<FileData, "id" | "name" | "type"> | null',
        },
        defaultValue: { summary: 'null' },
      },
    },
    badge: {
      description: 'title badge',
      table: {
        type: {
          summary: 'ReactNode',
        },
      },
    },
    isLoading: {
      control: 'boolean',
      description: 'is loading',
      table: {
        defaultValue: {
          summary: 'false',
        },
        type: {
          summary: 'boolean',
        },
      },
    },
    onClose: {
      description: 'on close',
      type: {
        required: true,
        name: 'function',
      },
    },
  },
};

export default meta;

type Story = StoryObj<typeof PreviewSingle>;

export const Default: Story = {
  args: {},
  render: () => {
    const [isOpen, setIsOpen] = useState(false);
    const [file, setFile] = useState<PreviewFileData | null>(null);

    return (
      <>
        <input
          type='file'
          onChange={({ target }) => {
            const [file] = target.files ?? [];
            const { name, size, type, lastModified, webkitRelativePath } = file;

            file &&
              setFile({
                id: getUUID(),
                name,
                size,
                type,
                lastModified,
                webkitRelativePath,
                blob: URL.createObjectURL(file),
                original: file,
              });
          }}
        />
        <Button
          disabled={!file}
          label='Preview Open'
          onClick={() => setIsOpen(true)}
        />
        {isOpen && (
          <PreviewSingle
            badge={<Badge label='신규' variant='filled' />}
            className='h-[500px]'
            file={file}
            isOpen={isOpen}
            onClose={() => setIsOpen(false)}
          />
        )}
      </>
    );
  },
};
