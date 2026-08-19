import { Flex, Tag, TagProps } from '@bbodek/biz-ui';
import { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';

const DOCUMENT_FRAME_WIDTH = 'w-[340px]';

const ACCOUNTS = [
  '뽀득 강남점',
  '본사',
  '뽀득 판교 테크노밸리점',
  '물류센터',
  '뽀득 여의도점',
];

const meta = {
  title: 'core/biz-ui/Tag',
  component: Tag,
  argTypes: {
    label: {
      control: 'text',
      type: { name: 'string', required: true },
    },
    'aria-label': { control: 'text' },
    onClick: { action: 'click' },
  },
  args: {
    label: '계정명',
  },
} satisfies Meta<TagProps>;

export default meta;

type Story = StoryObj<TagProps>;

export const Default: Story = {};

// 태그는 한 줄을 유지하고 그룹 안에서 다음 줄로 넘어간다. 누르면 목록에서 빠진다
export const List: Story = {
  parameters: { controls: { disable: true } },
  render: () => {
    const [accounts, setAccounts] = useState(ACCOUNTS);

    return (
      <Flex className={DOCUMENT_FRAME_WIDTH} gap='10' wrap='wrap'>
        {accounts.map((account) => (
          <Tag
            key={account}
            label={account}
            onClick={() =>
              setAccounts((prev) => prev.filter((item) => item !== account))
            }
          />
        ))}
      </Flex>
    );
  },
};

// 컨테이너보다 넓은 태그는 줄바꿈으로 해결되지 않아 그대로 넘친다
export const LongLabel: Story = {
  parameters: { controls: { disable: true } },
  render: ({ onClick }) => (
    <Flex className={DOCUMENT_FRAME_WIDTH} gap='10' wrap='wrap'>
      <Tag
        label='아주 길어서 컨테이너를 넘치는 계정명이 들어가는 경우입니다'
        onClick={onClick}
      />
    </Flex>
  ),
};
