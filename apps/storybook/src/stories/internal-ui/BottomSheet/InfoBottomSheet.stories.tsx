import { Button, InfoBottomSheet } from '@bbodek/internal-ui';
import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';

import { default as ConfirmBottomSheetMeta } from '@/stories/internal-ui/BottomSheet/ConfirmBottomSheet.stories';
import { default as InfoModalMeta } from '@/stories/internal-ui/Modal/InfoModal.stories';

const { isOpen, title } = ConfirmBottomSheetMeta.argTypes ?? {};

const meta: Meta<typeof InfoBottomSheet> = {
  title: 'core/internal-ui/BottomSheet/InfoBottomSheet',
  component: InfoBottomSheet,
  argTypes: {
    ...(InfoModalMeta.argTypes ?? {}),
    isOpen,
    title,
  },
};

export default meta;

type Story = StoryObj<typeof InfoBottomSheet>;

const Box = () => (
  <div className='bg-in-gray-01 rounded-in-8 h-[11.687rem] w-full' />
);

export const Default: Story = {
  args: {
    title: '한줄 타이틀이 들어갑니다',
    confirmButtonLabel: '확인 완료',
  },
  render: (args) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
      <>
        <Button label='Open BottomSheet' onClick={() => setIsOpen(true)} />
        <InfoBottomSheet
          {...args}
          isOpen={isOpen}
          onConfirm={() => setIsOpen(false)}
        >
          <Box />
          <InfoBottomSheet.Description
            description={
              <>
                설명글이 세 줄 이상 들어가나요? <br />
                이 타입의 모달을 사용하여 줄글로 설명을 적어보세요 <br />
                사용자에게 안내 메세지를 전달하세요
              </>
            }
          />
        </InfoBottomSheet>
      </>
    );
  },
};

export const WithClose: Story = {
  args: {
    title: '배송 유형이란?',
    confirmButtonLabel: '바로가기',
  },
  render: (args) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
      <>
        <Button label='Open BottomSheet' onClick={() => setIsOpen(true)} />
        <InfoBottomSheet
          {...args}
          isOpen={isOpen}
          onConfirm={() => setIsOpen(false)}
          onCancel={() => setIsOpen(false)}
          className='max-w-sm'
        >
          <InfoBottomSheet.Description
            description={
              <>
                사용수량을 직전 영업일에 배송하는 일반배송 외 <br />
                주말/공휴일에도 배송하는 유형을 지정할 수 있습니다. <br />
                <span className='text-in-primary-05'>
                  ※ 토요일/일요일 배송은 공휴일 여부와 상관없이 배송됩니다.
                </span>
              </>
            }
          />
          <Box />
        </InfoBottomSheet>
      </>
    );
  },
};
