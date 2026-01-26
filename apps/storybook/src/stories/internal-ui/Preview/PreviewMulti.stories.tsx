import {
  Badge,
  Button,
  PreviewMulti,
  PreviewMultiFile,
} from '@bbodek/internal-ui';
import { getUUID } from '@bbodek/utils';
import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';

import previewSingleMeta from './PreviewSingle.stories';

const { isOpen, isLoading, onClose } = previewSingleMeta.argTypes ?? {};

const meta: Meta<typeof PreviewMulti> = {
  title: 'core/internal-ui/Preview/PreviewMulti',
  component: PreviewMulti,
  argTypes: {
    isOpen,
    isLoading,
    onClose,
    files: {
      control: 'object',
      description: 'preview multi file array',
      table: {
        type: {
          summary: 'PreviewMultiFile[]',
        },
      },
    },
    initialFile: {
      control: 'object',
      description: 'preview multi initial file',
      table: {
        type: {
          summary: 'PreviewMultiFile',
        },
      },
    },
  },
};

export default meta;

type Story = StoryObj<typeof PreviewMulti>;

export const Default: Story = {
  render: () => {
    const [isOpen, setIsOpen] = useState(false);
    const [files, setFiles] = useState<PreviewMultiFile[]>([]);

    return (
      <div className='in-flex-v-stack gap-2'>
        <input
          type='file'
          multiple
          onChange={(e) => {
            const files = e.target.files;

            if (!files) return;

            setFiles((prev) => {
              return [
                ...prev,
                ...Array.from(files).map((file) => {
                  const { name, size, type, lastModified, webkitRelativePath } =
                    file;

                  return {
                    badge: <Badge label='신규' variant='filled' />,
                    id: getUUID(),
                    name,
                    size,
                    type,
                    lastModified,
                    webkitRelativePath,
                    blob: URL.createObjectURL(file),
                    original: file,
                  };
                }),
              ];
            });
          }}
        />
        <Button
          disabled={files.length === 0}
          label='Preview Open'
          onClick={() => setIsOpen(true)}
        />
        {isOpen && (
          <PreviewMulti
            className='h-[500px] w-[500px]'
            files={files}
            isOpen={isOpen}
            onClose={() => setIsOpen(false)}
          />
        )}
      </div>
    );
  },
};
