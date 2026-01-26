import { Badge, PreviewInline, PreviewMultiFile } from '@bbodek/internal-ui';
import { getUUID } from '@bbodek/utils';
import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';

import PreviewMultiMeta from './PreviewMulti.stories';

const { isLoading, onClose, files, initialFile } =
  PreviewMultiMeta.argTypes ?? {};

const meta: Meta<typeof PreviewInline> = {
  title: 'core/internal-ui/Preview/PreviewInline',
  component: PreviewInline,
  argTypes: {
    isLoading,
    onClose,
    files,
    initialFile,
    isExpanded: {
      control: 'boolean',
      description: 'is expanded',
      type: {
        required: true,
        name: 'boolean',
      },
    },
    onExpand: {
      action: 'clicked',
      description: 'on expand',
      type: {
        name: 'function',
        required: true,
      },
    },
  },
};

export default meta;

type Story = StoryObj<typeof PreviewInline>;

export const Default: Story = {
  render: () => {
    const [isExpanded, setIsExpanded] = useState(true);
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
        <div className='w-[1200px]'>
          <div className='in-flex-h-stack h-[500px] w-full items-stretch gap-x-4'>
            <PreviewInline
              className='h-full w-[800px]'
              files={files}
              isExpanded={isExpanded}
              onClose={() => setIsExpanded(false)}
              onExpand={() => !isExpanded && setIsExpanded(true)}
            />
            <div className='bg-in-gray-06 rounded-in-8 h-full flex-1' />
          </div>
        </div>
      </div>
    );
  },
};
