import {
  Flex,
  ToggleListItem,
  ToggleListItemProps,
  Typography,
} from '@bbodek/biz-ui';
import { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';

const BOOLEAN_VALUES = [false, true];

const DOCUMENT_FRAME_WIDTH = 'w-[340px]';

const ALARMS = [
  { label: '정산 안내', description: '한 달 이용료 최종 확정시 알림' },
  { label: '주문 마감 독촉', description: '주문 마감 2시간 전 알림' },
  { label: '배송 출발', description: '주문한 상품이 출발했을 때 알림' },
];

const meta = {
  title: 'core/biz-ui/ToggleListItem',
  component: ToggleListItem,
  argTypes: {
    label: {
      control: 'text',
      type: { name: 'string', required: true },
    },
    description: {
      control: 'text',
      type: { name: 'string', required: true },
    },
    checked: {
      control: 'boolean',
      type: { name: 'boolean', required: true },
    },
  },
  args: {
    label: '정산 안내',
    description: '한 달 이용료 최종 확정시 알림',
    checked: false,
    onChange: () => {},
  },
} satisfies Meta<ToggleListItemProps>;

export default meta;

type Story = StoryObj<ToggleListItemProps>;

export const Default: Story = {
  render: (args) => (
    <Flex className={DOCUMENT_FRAME_WIDTH}>
      <ToggleListItem {...args} />
    </Flex>
  ),
};

export const States: Story = {
  parameters: { controls: { disable: true } },
  render: ({ label, description, onChange }) => (
    <Flex className={DOCUMENT_FRAME_WIDTH} direction='column' gap='12'>
      {BOOLEAN_VALUES.map((checked) => (
        <Flex direction='column' gap='8' key={`checked-${checked}`}>
          <Typography color='gray-500' variant='label-bold'>
            checked = {String(checked)}
          </Typography>
          <ToggleListItem
            checked={checked}
            description={description}
            label={label}
            onChange={onChange}
          />
        </Flex>
      ))}
    </Flex>
  ),
};

// 사용처(MYP-502 알람 관리)와 같은 배치. 저장 버튼 없이 즉시 반영된다
export const AlarmList: Story = {
  parameters: { controls: { disable: true } },
  render: () => {
    const [checkedLabels, setCheckedLabels] = useState<string[]>([
      ALARMS[0].label,
    ]);

    return (
      <Flex className={DOCUMENT_FRAME_WIDTH} direction='column' gap='24'>
        {ALARMS.map(({ label, description }) => (
          <ToggleListItem
            checked={checkedLabels.includes(label)}
            description={description}
            key={label}
            label={label}
            name={label}
            onChange={({ target }) =>
              setCheckedLabels((prev) =>
                target.checked
                  ? [...prev, label]
                  : prev.filter((item) => item !== label),
              )
            }
          />
        ))}
      </Flex>
    );
  },
};

export const LongText: Story = {
  parameters: { controls: { disable: true } },
  render: ({ onChange }) => (
    <Flex className={DOCUMENT_FRAME_WIDTH}>
      <ToggleListItem
        description='한 달 이용료가 최종 확정되었을 때 등록된 담당자에게 알림을 보냅니다'
        label='정산 안내 및 이용료 확정 알림'
        checked
        onChange={onChange}
      />
    </Flex>
  ),
};
