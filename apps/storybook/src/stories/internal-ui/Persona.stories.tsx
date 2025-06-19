import {
  AVATAR_SIZES,
  Persona,
  PERSONA_PROFILE_THEMES,
} from '@bbodek/internal-ui';
import type { Meta, StoryObj } from '@storybook/react';

import { generateArgTypeSummary } from '@/utils/generateArgTypeSummary';
import { default as AvatarMeta } from './Avatar.stories';

const { size, type } = AvatarMeta.argTypes ?? {};

const meta: Meta<typeof Persona> = {
  title: 'core/internal-ui/Persona',
  component: Persona,
  globals: AvatarMeta.globals,
  argTypes: {
    size,
    type,
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
    src: {
      control: 'text',
      description: 'Persona Image src',
      type: 'string',
    },
    profileTheme: {
      control: 'select',
      description: 'Persona Profile color',
      options: Object.values(PERSONA_PROFILE_THEMES),
      type: 'string',
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
};

export default meta;

type Story = StoryObj<typeof Persona>;

export const Default: Story = {
  args: {
    name: '강준영',
    type: 'single',
  },
};

export const WithPersonaImage: Story = {
  args: {
    name: '강준영',
    src: 'https://ca.slack-edge.com/T01HSRM9C0Z-U0673TXRU2U-7184f5cfe3fe-512',
    type: 'single',
  },
};

export const WithDescription: Story = {
  args: {
    name: '강준영',
    description: '플랫폼팀',
    type: 'single',
  },
};

export const PersonaSizes: Story = {
  args: {
    name: '강준영',
    description: '플랫폼팀',
    type: 'single',
  },
  render: (args) => (
    <div className='flex-v-stack gap-y-4'>
      <Persona {...args} size={AVATAR_SIZES.SM} />
      <Persona {...args} size={AVATAR_SIZES.MD} />
    </div>
  ),
};
