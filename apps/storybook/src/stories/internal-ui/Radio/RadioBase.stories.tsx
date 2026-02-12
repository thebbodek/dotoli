import {
  RADIO_SIZES,
  RadioBase,
  RadioBaseProps,
  RadioIcon,
  Typography,
} from '@bbodek/internal-ui';
import { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';

import { default as RadioMeta } from './Radio.stories';

const { checked, disabled, onChange, className } = RadioMeta.argTypes;

const meta = {
  title: 'core/internal-ui/Radio/RadioBase',
  component: RadioBase,
  argTypes: {
    checked,
    disabled,
    onChange,
    className,
  },
} satisfies Meta<typeof RadioBase>;

export default meta;

type Story = StoryObj<RadioBaseProps>;

export const Default: Story = {
  render: (args) => {
    const [checked, setChecked] = useState(false);

    return (
      <RadioBase
        {...args}
        checked={checked}
        className='flex gap-x-3'
        onChange={() => setChecked(!checked)}
      >
        <RadioIcon size={RADIO_SIZES.SM} />
        <Typography className='-mt-1' color='black' variant='body-16-r'>
          <Typography as='strong' variant='body-16-b'>
            [06167]{' '}
          </Typography>
          서울시 강남구 테헤란로 87길 5층 (삼성동)
          <br />
          진입키: 문앞화분 ㅣ 비밀번호: 1234 ㅣ 계단배송: 22
          <br />
          배송특이사항: 문앞 주차금지
        </Typography>
      </RadioBase>
    );
  },
};
