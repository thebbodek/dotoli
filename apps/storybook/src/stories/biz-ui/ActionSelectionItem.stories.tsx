import {
  ActionSelectionItem,
  ActionSelectionItemProps,
  Flex,
  Typography,
} from '@bbodek/biz-ui';
import { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';

const BOOLEAN_VALUES = [false, true];

const DOCUMENT_FRAME_WIDTH = 'w-[340px]';

const COMPANIES = ['최고의 맛 한식뷔페', '백수저 한식뷔페', '뽀득 판교점'];

const IDLE_MESSAGE = '카드를 눌러 보세요';

const meta = {
  title: 'core/biz-ui/ActionSelectionItem',
  component: ActionSelectionItem,
  argTypes: {
    label: {
      control: 'text',
      type: { name: 'string', required: true },
    },
    isSelected: {
      control: 'boolean',
      type: { name: 'boolean', required: true },
    },
  },
  args: {
    label: '최고의 맛 한식뷔페',
    isSelected: false,
    onClick: () => {},
  },
} satisfies Meta<ActionSelectionItemProps>;

export default meta;

type Story = StoryObj<ActionSelectionItemProps>;

export const Default: Story = {
  render: (args) => (
    <Flex className={DOCUMENT_FRAME_WIDTH}>
      <ActionSelectionItem {...args} />
    </Flex>
  ),
};

// SelectionItem과 class 문자열이 같아야 한다 — 갈리면 shared가 깨진 것
export const States: Story = {
  parameters: { controls: { disable: true } },
  render: ({ label, onClick }) => (
    <Flex className={DOCUMENT_FRAME_WIDTH} direction='column' gap='12'>
      {BOOLEAN_VALUES.map((isSelected) => (
        <Flex direction='column' gap='8' key={`selected-${isSelected}`}>
          <Typography color='gray-500' variant='label-bold'>
            isSelected = {String(isSelected)}
          </Typography>
          <ActionSelectionItem
            isSelected={isSelected}
            label={label}
            onClick={onClick}
          />
        </Flex>
      ))}
    </Flex>
  ),
};

// 이 컴포넌트가 존재하는 이유 — 선택된 카드를 다시 눌러도 onClick이 온다
// radio(SelectionItem)였다면 재탭에서 change가 오지 않아 「시트만 닫힘」을 만들 수 없다
export const CompanySwitch: Story = {
  parameters: { controls: { disable: true } },
  render: () => {
    const [selected, setSelected] = useState(COMPANIES[0]);
    const [lastAction, setLastAction] = useState(IDLE_MESSAGE);

    return (
      <Flex className={DOCUMENT_FRAME_WIDTH} direction='column' gap='8'>
        {COMPANIES.map((company) => (
          <ActionSelectionItem
            isSelected={selected === company}
            key={company}
            label={company}
            onClick={() => {
              setLastAction(
                selected === company
                  ? '현재 업체 재탭 → 시트만 닫힘'
                  : `${company} 전환 → 시트 닫힘`,
              );
              setSelected(company);
            }}
          />
        ))}
        <Typography color='gray-500' variant='label-bold'>
          {lastAction}
        </Typography>
      </Flex>
    );
  },
};

export const LongLabel: Story = {
  parameters: { controls: { disable: true } },
  render: ({ onClick }) => (
    <Flex className={DOCUMENT_FRAME_WIDTH} direction='column' gap='8'>
      {BOOLEAN_VALUES.map((isSelected) => (
        <ActionSelectionItem
          isSelected={isSelected}
          key={`long-${isSelected}`}
          label='최고의 맛 한식뷔페 강남역 2호점 본관 지하 1층'
          onClick={onClick}
        />
      ))}
    </Flex>
  ),
};
