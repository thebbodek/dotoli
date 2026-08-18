import {
  Flex,
  HEADER_BAR_THEMES,
  HEADER_BAR_TYPES,
  HeaderBar,
  Typography,
} from '@bbodek/biz-ui';
import { Meta, StoryObj } from '@storybook/react';

import { generateArgTypeSummary } from '@/utils/generateArgTypeSummary';

const BOOLEAN_VALUES = [false, true];

const DOCUMENT_FRAME_WIDTH = 'w-[380px]';

// dark는 배경 없이 밝은 글자만 남는다. Figma 문서 프레임도 어두운 판 위에 깐다
const DARK_THEME_BACKDROP = 'bg-gray-500';

const HOME_TITLE = '최고의 맛 한식뷔페';

const NAVIGATION_TITLE = '6월 5주 - 7월 1주 주문';

const BOTTOM_SHEET_TITLE = '제목';

const TITLES = {
  [HEADER_BAR_TYPES.HOME]: HOME_TITLE,
  [HEADER_BAR_TYPES.NAVIGATION]: NAVIGATION_TITLE,
  [HEADER_BAR_TYPES.BOTTOM_SHEET]: BOTTOM_SHEET_TITLE,
};

const PROGRESS_STEPS = [1, 2, 3];

const TOTAL_STEPS = 3;

const noop = () => {};

const meta = {
  title: 'core/biz-ui/HeaderBar',
  component: HeaderBar,
  argTypes: {
    title: {
      control: 'text',
      type: { name: 'string', required: true },
    },
    type: {
      control: 'inline-radio',
      options: Object.values(HEADER_BAR_TYPES),
      table: {
        defaultValue: { summary: HEADER_BAR_TYPES.HOME },
        type: {
          summary: generateArgTypeSummary({
            options: Object.values(HEADER_BAR_TYPES),
          }),
        },
      },
    },
    theme: {
      control: 'inline-radio',
      options: Object.values(HEADER_BAR_THEMES),
      table: {
        defaultValue: { summary: HEADER_BAR_THEMES.LIGHT },
        type: {
          summary: generateArgTypeSummary({
            options: Object.values(HEADER_BAR_THEMES),
          }),
        },
      },
    },
    hasUnreadNotification: {
      control: 'boolean',
      table: { defaultValue: { summary: 'false' } },
    },
    progressOption: { control: 'object' },
  },
  args: {
    title: HOME_TITLE,
    type: HEADER_BAR_TYPES.HOME,
    hasUnreadNotification: true,
    onTitleClick: noop,
    onNotificationClick: noop,
    onBack: noop,
    onClose: noop,
  },
} satisfies Meta<typeof HeaderBar>;

export default meta;

type Story = StoryObj<typeof HeaderBar>;

export const Default: Story = {
  render: (args) => (
    <Flex className={DOCUMENT_FRAME_WIDTH}>
      <HeaderBar {...args} />
    </Flex>
  ),
};

export const Types: Story = {
  parameters: { controls: { disable: true } },
  render: (args) => (
    <Flex className={DOCUMENT_FRAME_WIDTH} direction='column' gap='24'>
      {Object.values(HEADER_BAR_TYPES).map((type) => (
        <Flex direction='column' gap='8' key={type}>
          <Typography color='gray-500' variant='label-bold'>
            type = {type}
          </Typography>
          <HeaderBar {...args} title={TITLES[type]} type={type} />
        </Flex>
      ))}
    </Flex>
  ),
};

// dark 심볼은 Figma에 type=home만 있다 (docs/biz-ui/components/header-bar.md)
export const Themes: Story = {
  parameters: { controls: { disable: true } },
  render: (args) => (
    <Flex className={DOCUMENT_FRAME_WIDTH} direction='column' gap='24'>
      {Object.values(HEADER_BAR_THEMES).map((theme) => (
        <Flex direction='column' gap='8' key={theme}>
          <Typography color='gray-500' variant='label-bold'>
            theme = {theme}
          </Typography>
          <Flex
            className={
              theme === HEADER_BAR_THEMES.DARK ? DARK_THEME_BACKDROP : undefined
            }
          >
            <HeaderBar {...args} theme={theme} type={HEADER_BAR_TYPES.HOME} />
          </Flex>
        </Flex>
      ))}
    </Flex>
  ),
};

// onTitleClick을 넘긴 쪽만 화살표가 붙고 버튼이 된다
export const CompanySelector: Story = {
  parameters: { controls: { disable: true } },
  render: ({ onTitleClick, ...args }) => (
    <Flex className={DOCUMENT_FRAME_WIDTH} direction='column' gap='24'>
      <Flex direction='column' gap='8'>
        <Typography color='gray-500' variant='label-bold'>
          onTitleClick 전달
        </Typography>
        <HeaderBar
          {...args}
          type={HEADER_BAR_TYPES.HOME}
          onTitleClick={onTitleClick}
        />
      </Flex>
      <Flex direction='column' gap='8'>
        <Typography color='gray-500' variant='label-bold'>
          onTitleClick 미전달
        </Typography>
        <HeaderBar {...args} type={HEADER_BAR_TYPES.HOME} />
      </Flex>
    </Flex>
  ),
};

export const UnreadNotification: Story = {
  parameters: { controls: { disable: true } },
  render: (args) => (
    <Flex className={DOCUMENT_FRAME_WIDTH} direction='column' gap='24'>
      {BOOLEAN_VALUES.map((hasUnreadNotification) => (
        <Flex
          direction='column'
          gap='8'
          key={`unread-${hasUnreadNotification}`}
        >
          <Typography color='gray-500' variant='label-bold'>
            hasUnreadNotification = {String(hasUnreadNotification)}
          </Typography>
          <HeaderBar
            {...args}
            hasUnreadNotification={hasUnreadNotification}
            type={HEADER_BAR_TYPES.HOME}
          />
        </Flex>
      ))}
    </Flex>
  ),
};

export const Progress: Story = {
  parameters: { controls: { disable: true } },
  render: (args) => (
    <Flex className={DOCUMENT_FRAME_WIDTH} direction='column' gap='24'>
      {PROGRESS_STEPS.map((currentStep) => (
        <Flex direction='column' gap='8' key={currentStep}>
          <Typography color='gray-500' variant='label-bold'>
            {currentStep} / {TOTAL_STEPS}
          </Typography>
          <HeaderBar
            {...args}
            progressOption={{ currentStep, totalSteps: TOTAL_STEPS }}
            title={NAVIGATION_TITLE}
            type={HEADER_BAR_TYPES.NAVIGATION}
          />
        </Flex>
      ))}
    </Flex>
  ),
};
