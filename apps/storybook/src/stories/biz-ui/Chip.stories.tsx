import {
  Chip,
  CHIP_DEFAULT_SELECT_MODE,
  CHIP_SELECT_MODES,
  ChipProps,
  Flex,
  Typography,
} from '@bbodek/biz-ui';
import { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';

import { generateArgTypeSummary } from '@/utils/generateArgTypeSummary';

const BOOLEAN_VALUES = [false, true];

const DOCUMENT_FRAME_WIDTH = 'w-[340px]';

const SUGGESTED_QUESTIONS = [
  '질문이 들어갑니다 질문이',
  '질문이 들어가니',
  '왕이 궁에 들어가기 싫으면?',
  '한 5개 정도 들어감',
];

const meta = {
  title: 'core/biz-ui/Chip',
  component: Chip,
  argTypes: {
    label: {
      control: 'text',
      type: { name: 'string', required: true },
    },
    checked: {
      control: 'boolean',
      type: { name: 'boolean', required: true },
    },
    selectMode: {
      control: 'inline-radio',
      options: Object.values(CHIP_SELECT_MODES),
      table: {
        defaultValue: { summary: CHIP_DEFAULT_SELECT_MODE },
        type: {
          summary: generateArgTypeSummary({
            options: Object.values(CHIP_SELECT_MODES),
          }),
        },
      },
    },
  },
  args: {
    label: '라벨',
    checked: false,
    onChange: () => {},
  },
} satisfies Meta<ChipProps>;

export default meta;

type Story = StoryObj<ChipProps>;

export const Default: Story = {};

// Figma 문서 프레임과 같은 배치 — selectMode가 열, checked가 행
export const Matrix: Story = {
  parameters: { controls: { disable: true } },
  render: ({ label, onChange }) => (
    <Flex align={{ items: 'start' }} gap='24'>
      {Object.values(CHIP_SELECT_MODES).map((selectMode) => (
        <Flex
          align={{ items: 'start' }}
          direction='column'
          gap='12'
          key={selectMode}
        >
          <Typography color='gray-500' variant='label-bold'>
            selectMode = {selectMode}
          </Typography>
          {BOOLEAN_VALUES.map((checked) => (
            <Chip
              checked={checked}
              key={`${selectMode}-${checked}`}
              label={label}
              selectMode={selectMode}
              onChange={onChange}
            />
          ))}
        </Flex>
      ))}
    </Flex>
  ),
};

export const MultipleSelect: Story = {
  parameters: { controls: { disable: true } },
  render: () => {
    const [selected, setSelected] = useState<string[]>([
      SUGGESTED_QUESTIONS[2],
    ]);

    return (
      <Flex className={DOCUMENT_FRAME_WIDTH} gap='10' wrap='wrap'>
        {SUGGESTED_QUESTIONS.map((question) => (
          <Chip
            checked={selected.includes(question)}
            key={question}
            label={question}
            name='questions'
            value={question}
            onChange={({ target }) =>
              setSelected((prev) =>
                target.checked
                  ? [...prev, question]
                  : prev.filter((item) => item !== question),
              )
            }
          />
        ))}
      </Flex>
    );
  },
};

export const SingleSelect: Story = {
  parameters: { controls: { disable: true } },
  render: () => {
    const [selected, setSelected] = useState(SUGGESTED_QUESTIONS[0]);

    return (
      <Flex className={DOCUMENT_FRAME_WIDTH} gap='10' wrap='wrap'>
        {SUGGESTED_QUESTIONS.map((question) => (
          <Chip
            checked={selected === question}
            key={question}
            label={question}
            name='question'
            selectMode={CHIP_SELECT_MODES.SINGLE}
            value={question}
            onChange={() => setSelected(question)}
          />
        ))}
      </Flex>
    );
  },
};
