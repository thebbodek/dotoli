import {
  BOTTOM_ACTION_BAR_VARIANTS,
  BottomSheet,
  BottomSheetProps,
  CtaButton,
} from '@bbodek/biz-ui';
import { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';

const TITLE = '제목';

const TRIGGER_LABEL = '바텀시트 열기';

const CONFIRM_LABEL = '확인';

const PAGE_STYLE =
  'flex-v-stack h-[620px] w-[380px] gap-[12px] bg-gray-50 p-[20px]';

const BODY_STYLE = 'flex-v-stack gap-[24px] px-[20px] py-[28px]';

const BLOCK_STYLE = 'h-[60px] shrink-0 rounded-8 bg-gray-100';

const SHORT_BLOCK_COUNT = 2;

const LONG_BLOCK_COUNT = 12;

const meta = {
  title: 'core/biz-ui/BottomSheet',
  component: BottomSheet,
  argTypes: {
    title: {
      control: 'text',
      type: { name: 'string', required: true },
    },
    isDimmed: {
      control: 'boolean',
      table: { defaultValue: { summary: 'true' } },
    },
    actionBarOption: { control: 'object' },
  },
  args: {
    title: TITLE,
    isDimmed: true,
  },
} satisfies Meta<BottomSheetProps>;

export default meta;

type Story = StoryObj<BottomSheetProps>;

// 스토리 전부 트리거로 연다. autodocs가 모든 스토리를 한 번에 마운트하는데
// 열린 채로 두면 z-[1000] 오버레이가 문서를 덮는다
// (docs/biz-ui/components/confirm-modal.md 「Storybook」)
export const Default: Story = {
  render: ({ title, isDimmed }) => {
    const [isOpen, setIsOpen] = useState(false);
    const close = () => setIsOpen(false);

    return (
      <div className={PAGE_STYLE}>
        <CtaButton label={TRIGGER_LABEL} onClick={() => setIsOpen(true)} />
        <BottomSheet
          actionBarOption={{ action: { label: CONFIRM_LABEL, onClick: close } }}
          isDimmed={isDimmed}
          isOpen={isOpen}
          title={title}
          onClose={close}
        >
          <div className={BODY_STYLE}>
            {Array.from({ length: SHORT_BLOCK_COUNT }, (_, index) => (
              <div className={BLOCK_STYLE} key={index} />
            ))}
          </div>
        </BottomSheet>
      </div>
    );
  },
};

// 절반 이하 짧은 시트만 딤을 내린다 (Figma 주석 504:1724)
export const Undimmed: Story = {
  parameters: { controls: { disable: true } },
  render: ({ title }) => {
    const [isOpen, setIsOpen] = useState(false);
    const close = () => setIsOpen(false);

    return (
      <div className={PAGE_STYLE}>
        <CtaButton label={TRIGGER_LABEL} onClick={() => setIsOpen(true)} />
        <BottomSheet
          actionBarOption={{ action: { label: CONFIRM_LABEL, onClick: close } }}
          isDimmed={false}
          isOpen={isOpen}
          title={title}
          onClose={close}
        >
          <div className={BODY_STYLE}>
            {Array.from({ length: SHORT_BLOCK_COUNT }, (_, index) => (
              <div className={BLOCK_STYLE} key={index} />
            ))}
          </div>
        </BottomSheet>
      </div>
    );
  },
};

// 액션 바가 없는 시트. actionBarOption을 안 넘기면 바디만 남는다
export const WithoutAction: Story = {
  parameters: { controls: { disable: true } },
  render: ({ title }) => {
    const [isOpen, setIsOpen] = useState(false);
    const close = () => setIsOpen(false);

    return (
      <div className={PAGE_STYLE}>
        <CtaButton label={TRIGGER_LABEL} onClick={() => setIsOpen(true)} />
        <BottomSheet isOpen={isOpen} title={title} onClose={close}>
          <div className={BODY_STYLE}>
            {Array.from({ length: SHORT_BLOCK_COUNT }, (_, index) => (
              <div className={BLOCK_STYLE} key={index} />
            ))}
          </div>
        </BottomSheet>
      </div>
    );
  },
};

// 헤더가 남고 바디만 스크롤되는지, floating 액션 바가 바닥에 붙어 따라오는지 본다
export const Scroll: Story = {
  parameters: { controls: { disable: true } },
  render: ({ title }) => {
    const [isOpen, setIsOpen] = useState(false);
    const close = () => setIsOpen(false);

    return (
      <div className={PAGE_STYLE}>
        <CtaButton label={TRIGGER_LABEL} onClick={() => setIsOpen(true)} />
        <BottomSheet
          actionBarOption={{ action: { label: CONFIRM_LABEL, onClick: close } }}
          isOpen={isOpen}
          title={title}
          isDimmed
          onClose={close}
        >
          <div className={BODY_STYLE}>
            {Array.from({ length: LONG_BLOCK_COUNT }, (_, index) => (
              <div className={BLOCK_STYLE} key={index} />
            ))}
          </div>
        </BottomSheet>
      </div>
    );
  },
};

// solid는 「scroll with parent」라 바닥에 안 붙고 콘텐츠와 함께 밀려 올라간다 (Figma 주석 337:3671)
export const SolidAction: Story = {
  parameters: { controls: { disable: true } },
  render: ({ title }) => {
    const [isOpen, setIsOpen] = useState(false);
    const close = () => setIsOpen(false);

    return (
      <div className={PAGE_STYLE}>
        <CtaButton label={TRIGGER_LABEL} onClick={() => setIsOpen(true)} />
        <BottomSheet
          actionBarOption={{
            action: { label: CONFIRM_LABEL, onClick: close },
            variant: BOTTOM_ACTION_BAR_VARIANTS.SOLID,
          }}
          isOpen={isOpen}
          title={title}
          isDimmed
          onClose={close}
        >
          <div className={BODY_STYLE}>
            {Array.from({ length: LONG_BLOCK_COUNT }, (_, index) => (
              <div className={BLOCK_STYLE} key={index} />
            ))}
          </div>
        </BottomSheet>
      </div>
    );
  },
};
