import {
  CTA_BUTTON_SIZES,
  CTA_BUTTON_THEMES,
  CTA_BUTTON_VARIANTS,
  CtaButton,
  Flex,
  toast,
  Toaster,
  ToasterProps,
  Typography,
} from '@bbodek/biz-ui';
import { Decorator, Meta, StoryObj } from '@storybook/react';
import { useEffect, useState } from 'react';

const SCREEN_STYLE =
  'flex-v-stack h-[520px] w-[380px] gap-[8px] bg-gray-50 p-[20px]';

const CTA_AREA_STYLE =
  'flex-h-stack fixed inset-x-0 bottom-0 z-[900] bg-white p-[20px] shadow-8';

const CTA_OFFSET = '84px';

const ICON_KEY = 'check-circle';

const withScreen: Decorator = (Story) => (
  <div className={SCREEN_STYLE}>
    <Story />
    <Toaster />
  </div>
);

const showTransientToast = () =>
  toast.show({ iconKey: ICON_KEY, message: '주문이 등록되었어요' });

const showPersistentToast = () =>
  toast.show({
    action: { label: '보기', onClick: () => {} },
    iconKey: ICON_KEY,
    message: '주문이 등록되었어요',
    useDismiss: true,
  });

const meta = {
  title: 'core/biz-ui/Toaster',
  component: Toaster,
  decorators: [withScreen],
  parameters: { controls: { disable: true } },
  argTypes: {
    target: { control: 'text' },
    className: { control: 'text' },
  },
} satisfies Meta<ToasterProps>;

export default meta;

type Story = StoryObj<ToasterProps>;

export const Default: Story = {
  render: () => (
    <Flex align={{ items: 'start' }} direction='column' gap='8'>
      <CtaButton
        label='A — 버튼 없음 (5초 후 자동 소멸)'
        size={CTA_BUTTON_SIZES.SM}
        onClick={showTransientToast}
      />
      <CtaButton
        label='D — 액션 + 닫기 (조작해야 소멸)'
        size={CTA_BUTTON_SIZES.SM}
        onClick={showPersistentToast}
      />
      <CtaButton
        label='로딩 — dismiss 할 때까지 유지'
        size={CTA_BUTTON_SIZES.SM}
        theme={CTA_BUTTON_THEMES.GRAY}
        onClick={() => toast.loading({ message: '잠시만 기다려주세요' })}
      />
      <CtaButton
        label='예외 — 버튼 없이 유지 (마감 경과)'
        size={CTA_BUTTON_SIZES.SM}
        theme={CTA_BUTTON_THEMES.GRAY}
        onClick={() =>
          toast.show({
            duration: null,
            iconKey: 'warning-circle',
            message: '이번 주 주문 마감이 지났어요',
          })
        }
      />
      <CtaButton
        label='전부 닫기'
        size={CTA_BUTTON_SIZES.SM}
        theme={CTA_BUTTON_THEMES.GRAY}
        variant={CTA_BUTTON_VARIANTS.OUTLINED}
        onClick={() => toast.dismissAll()}
      />
    </Flex>
  ),
};

export const Feedback: Story = {
  render: () => (
    <Flex align={{ items: 'start' }} direction='column' gap='8'>
      <CtaButton
        label='success'
        size={CTA_BUTTON_SIZES.SM}
        onClick={() => toast.success({ message: '6월 5주 주문 완료' })}
      />
      <CtaButton
        label='info'
        size={CTA_BUTTON_SIZES.SM}
        onClick={() => toast.info({ message: '납품일을 입력해주세요' })}
      />
      <CtaButton
        label='warning'
        size={CTA_BUTTON_SIZES.SM}
        onClick={() => toast.warning({ message: '수량을 다시 확인해주세요' })}
      />
      <CtaButton
        label='error'
        size={CTA_BUTTON_SIZES.SM}
        onClick={() => toast.error({ message: '주문에 실패했어요' })}
      />
    </Flex>
  ),
};

// message가 ReactNode라 toast.show 경로에서도 강조부 위치를 소비자가 정한다
export const Highlight: Story = {
  render: () => (
    <Flex align={{ items: 'start' }} direction='column' gap='8'>
      <CtaButton
        label='앞쪽 강조'
        size={CTA_BUTTON_SIZES.SM}
        onClick={() =>
          toast.show({
            iconKey: ICON_KEY,
            message: (
              <>
                <strong>6월 15일</strong> 주문이 등록되었어요
              </>
            ),
          })
        }
      />
      <CtaButton
        label='문장 중간 강조'
        size={CTA_BUTTON_SIZES.SM}
        onClick={() =>
          toast.show({
            iconKey: ICON_KEY,
            message: (
              <>
                주문 <strong>3건</strong>이 등록되었어요
              </>
            ),
          })
        }
      />
    </Flex>
  ),
};

// 정책 337:4118 — A는 최신만 남기고 D는 큐에 순차 적재한다
export const Priority: Story = {
  render: () => (
    <Flex align={{ items: 'start' }} direction='column' gap='8'>
      <Typography color='gray-500' variant='label-bold'>
        A 중 새 A — 이전 것이 사라지고 최신만 남습니다
      </Typography>
      <CtaButton
        label='A 두 번 연속'
        size={CTA_BUTTON_SIZES.SM}
        onClick={() => {
          toast.show({ iconKey: ICON_KEY, message: '첫 번째 A' });
          toast.show({ iconKey: ICON_KEY, message: '두 번째 A' });
        }}
      />
      <Typography color='gray-500' variant='label-bold'>
        A 중 D — A가 즉시 사라지고 D가 뜹니다
      </Typography>
      <CtaButton
        label='A 띄우고 D'
        size={CTA_BUTTON_SIZES.SM}
        onClick={() => {
          toast.show({ iconKey: ICON_KEY, message: 'A는 밀려납니다' });
          showPersistentToast();
        }}
      />
      <Typography color='gray-500' variant='label-bold'>
        D 중 새 D — 닫아야 다음 것이 뜹니다
      </Typography>
      <CtaButton
        label='D 세 번 연속'
        size={CTA_BUTTON_SIZES.SM}
        onClick={() => {
          toast.show({ message: '첫 번째 D', useDismiss: true });
          toast.show({ message: '두 번째 D', useDismiss: true });
          toast.show({ message: '세 번째 D', useDismiss: true });
        }}
      />
    </Flex>
  ),
};

// 「CTA가 있을때는 CTA 상단으로 노출」 — 화면이 :root에 --toast-offset을 세팅한다
export const CtaOffset: Story = {
  render: () => {
    const [hasCta, setHasCta] = useState(false);

    useEffect(() => {
      const { style } = document.documentElement;

      if (hasCta) {
        style.setProperty('--toast-offset', CTA_OFFSET);
      } else {
        style.removeProperty('--toast-offset');
      }

      return () => {
        style.removeProperty('--toast-offset');
      };
    }, [hasCta]);

    return (
      <Flex align={{ items: 'start' }} direction='column' gap='8'>
        <CtaButton
          label={hasCta ? 'CTA 걷기' : 'CTA 깔기'}
          size={CTA_BUTTON_SIZES.SM}
          theme={CTA_BUTTON_THEMES.GRAY}
          onClick={() => setHasCta((prev) => !prev)}
        />
        <CtaButton
          label='토스트 띄우기'
          size={CTA_BUTTON_SIZES.SM}
          onClick={showTransientToast}
        />
        {hasCta && (
          <div className={CTA_AREA_STYLE}>
            <CtaButton className='w-full' label='주문하기' />
          </div>
        )}
      </Flex>
    );
  },
};
