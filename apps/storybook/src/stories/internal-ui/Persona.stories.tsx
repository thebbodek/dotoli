import {
  AVATAR_SIZES,
  Persona,
  PERSONA_PROFILE_COLORS,
  PERSONA_TYPES,
} from '@bbodek/internal-ui';
import type { Meta, StoryObj } from '@storybook/react';

import { generateArgTypeSummary } from '@/utils/generateArgTypeSummary';
import { default as AvatarMeta } from './Avatar.stories';

const { size } = AvatarMeta.argTypes ?? {};

const meta: Meta<typeof Persona> = {
  title: 'core/internal-ui/Persona',
  component: Persona,
  globals: AvatarMeta.globals,
  argTypes: {
    size,
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
    color: {
      control: 'select',
      description: 'Persona Profile color',
      options: Object.values(PERSONA_PROFILE_COLORS),
      type: 'string',
      table: {
        defaultValue: {
          summary: PERSONA_PROFILE_COLORS.BLACK,
        },
        type: {
          summary: generateArgTypeSummary({
            options: Object.values(PERSONA_PROFILE_COLORS),
          }),
        },
      },
    },
    type: {
      control: 'select',
      description: 'Persona Type',
      options: Object.values(PERSONA_TYPES),
      table: {
        defaultValue: {
          summary: PERSONA_TYPES.SINGLE,
        },
        type: {
          summary: generateArgTypeSummary({
            options: Object.values(PERSONA_TYPES),
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
  },
};

export const WithPersonaImage: Story = {
  args: {
    name: '강준영',
    src: 'https://ca.slack-edge.com/T01HSRM9C0Z-U0673TXRU2U-7184f5cfe3fe-512',
  },
};

export const WithDescription: Story = {
  args: {
    name: '강준영',
    description: '플랫폼팀',
  },
};

export const PersonaVariants: Story = {
  args: {
    name: '강준영',
    description: '플랫폼팀',
  },
  render: (args) => (
    <div className='flex-v-stack gap-y-4'>
      <Persona {...args} type={PERSONA_TYPES.SINGLE} />
      <Persona {...args} type={PERSONA_TYPES.GROUP} />
    </div>
  ),
};

export const PersonaSizes: Story = {
  args: {
    name: '강준영',
    description: '플랫폼팀',
  },
  render: (args) => (
    <div className='flex-v-stack gap-y-4'>
      <Persona {...args} size={AVATAR_SIZES.SM} />
      <Persona {...args} size={AVATAR_SIZES.MD} />
    </div>
  ),
};
