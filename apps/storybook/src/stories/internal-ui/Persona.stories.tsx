import {
  AVATAR_SIZES,
  Persona,
  PERSONA_PROFILE_THEMES,
} from '@bbodek/internal-ui';
import type { Meta, StoryObj } from '@storybook/react';

import { default as AvatarMeta } from './Avatar.stories';
import { generateArgTypeSummary } from '@/utils/generateArgTypeSummary';

const { size, type, src } = AvatarMeta.argTypes ?? {};

const meta = {
  title: 'core/internal-ui/Persona',
  component: Persona,
  globals: AvatarMeta.globals,
  argTypes: {
    size,
    type,
    src,
    name: {
      control: 'text',
      description: 'Persona Name',
      type: {
        required: true,
        name: 'string',
      },
    },
    description: {
      control: 'text',
      description: 'Persona Description',
      type: 'string',
    },
    profileTheme: {
      control: 'select',
      description: 'Persona Profile color',
      options: Object.values(PERSONA_PROFILE_THEMES),
      table: {
        defaultValue: {
          summary: PERSONA_PROFILE_THEMES.LIGHT,
        },
        type: {
          summary: generateArgTypeSummary({
            options: Object.values(PERSONA_PROFILE_THEMES),
          }),
        },
      },
    },
  },
} satisfies Meta<typeof Persona>;

export default meta;

type Story = StoryObj<typeof Persona>;

export const Default: Story = {
  args: {
    name: '김뽀득',
    type: 'single',
  },
};

export const WithImage: Story = {
  args: {
    name: '김뽀득',
    src: 'https://image.thebbodek.com/logo/logo-color-symbol-bg.png',
    type: 'single',
  },
};

export const WithDescription: Story = {
  args: {
    name: '김뽀득',
    description: '플랫폼팀',
    type: 'single',
  },
};

export const PersonaSizes: Story = {
  args: {
    name: '김뽀득',
    description: '플랫폼팀',
    type: 'single',
  },
  render: (args) => (
    <div className='in-flex-v-stack gap-y-4'>
      <Persona {...args} size={AVATAR_SIZES.SM} />
      <Persona {...args} size={AVATAR_SIZES.MD} />
    </div>
  ),
};
