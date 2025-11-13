import {
  Flex,
  FLEX_ALIGN_CONTENT_STYLES,
  FLEX_ALIGN_ITEM_STYLES,
  FLEX_ALIGN_SELF_STYLES,
  FLEX_BASES,
  FLEX_DIRECTIONS,
  FLEX_ELEMENTS,
  FLEX_GAPS,
  FLEX_GROW_AND_SHRINK_AND_BASIS,
  FLEX_GROWS,
  FLEX_JUSTIFY_CONTENT_STYLES,
  FLEX_JUSTIFY_CONTENTS,
  FLEX_JUSTIFY_ITEM_STYLES,
  FLEX_JUSTIFY_SELF_STYLES,
  FLEX_ORDERS,
  FLEX_SHRINKS,
  FLEX_WRAPS,
  FlexAlignContent,
  FlexAlignItems,
  FlexAlignSelf,
  FlexGap,
  FlexJustifyContent,
  FlexJustifyItems,
  FlexJustifySelf,
  FlexProps,
} from '@bbodek/internal-ui';
import type { Meta, StoryObj } from '@storybook/react';
import { PropsWithChildren } from 'react';

import { generateArgTypeSummary } from '@/utils/generateArgTypeSummary';

interface FlexArgs
  extends PropsWithChildren<Omit<FlexProps, 'align' | 'justify' | 'gap'>> {
  alignContent: FlexAlignContent;
  alignItems: FlexAlignItems;
  alignSelf: FlexAlignSelf;
  justifyContent: FlexJustifyContent;
  justifyItems: FlexJustifyItems;
  justifySelf: FlexJustifySelf;
  gap: FlexGap;
  gapColumn: FlexGap;
  gapRow: FlexGap;
}

const meta = {
  title: 'core/internal-ui/Flex',
  component: Flex,
  argTypes: {
    as: {
      control: 'select',
      options: Object.values(FLEX_ELEMENTS),
      description: 'Flex element',
      table: {
        type: {
          summary: generateArgTypeSummary({
            options: Object.values(FLEX_ELEMENTS),
          }),
        },
        defaultValue: {
          summary: FLEX_ELEMENTS.DIV,
        },
      },
    },
    direction: {
      control: 'select',
      options: Object.values(FLEX_DIRECTIONS),
      description: 'Flex direction',
      table: {
        type: {
          summary: generateArgTypeSummary({
            options: Object.values(FLEX_DIRECTIONS),
          }),
        },
        defaultValue: {
          summary: FLEX_DIRECTIONS.ROW,
        },
      },
    },
    alignContent: {
      table: {
        category: 'align',
        type: {
          summary: generateArgTypeSummary({
            options: Object.keys(FLEX_ALIGN_CONTENT_STYLES),
          }),
        },
      },
      name: 'content',
      control: 'select',
      options: Object.keys(FLEX_ALIGN_CONTENT_STYLES),
    },
    alignItems: {
      table: {
        category: 'align',
        type: {
          summary: generateArgTypeSummary({
            options: Object.keys(FLEX_ALIGN_ITEM_STYLES),
          }),
        },
      },
      name: 'items',
      control: 'select',
      options: Object.keys(FLEX_ALIGN_ITEM_STYLES),
    },
    alignSelf: {
      table: {
        category: 'align',
        type: {
          summary: generateArgTypeSummary({
            options: Object.keys(FLEX_ALIGN_SELF_STYLES),
          }),
        },
      },
      name: 'self',
      control: 'select',
      options: Object.keys(FLEX_ALIGN_SELF_STYLES),
    },
    justifyContent: {
      table: {
        category: 'justify',
        type: {
          summary: generateArgTypeSummary({
            options: Object.keys(FLEX_JUSTIFY_CONTENT_STYLES),
          }),
        },
      },
      name: 'content',
      control: 'select',
      options: Object.keys(FLEX_JUSTIFY_CONTENT_STYLES),
    },
    justifyItems: {
      table: {
        category: 'justify',
        type: {
          summary: generateArgTypeSummary({
            options: Object.keys(FLEX_JUSTIFY_ITEM_STYLES),
          }),
        },
      },
      name: 'items',
      control: 'select',
      options: Object.keys(FLEX_JUSTIFY_ITEM_STYLES),
    },
    justifySelf: {
      table: {
        category: 'justify',
        type: {
          summary: generateArgTypeSummary({
            options: Object.keys(FLEX_JUSTIFY_SELF_STYLES),
          }),
        },
      },
      name: 'self',
      control: 'select',
      options: Object.keys(FLEX_JUSTIFY_SELF_STYLES),
    },
    gap: {
      table: {
        category: 'gap',
        type: {
          summary: generateArgTypeSummary({
            options: Object.values(FLEX_GAPS),
          }),
        },
      },
      name: 'gap',
      control: 'select',
      options: Object.values(FLEX_GAPS),
    },
    gapColumn: {
      table: {
        category: 'gap',
        type: {
          summary: generateArgTypeSummary({
            options: Object.values(FLEX_GAPS),
          }),
        },
      },
      name: 'gap-column',
      control: 'select',
      options: Object.values(FLEX_GAPS),
    },
    gapRow: {
      table: {
        category: 'gap',
        type: {
          summary: generateArgTypeSummary({
            options: Object.values(FLEX_GAPS),
          }),
        },
      },
      name: 'gap-row',
      control: 'select',
      options: Object.values(FLEX_GAPS),
    },
    wrap: {
      control: 'select',
      options: Object.values(FLEX_WRAPS),
      description: 'Flex wrap',
      table: {
        type: {
          summary: generateArgTypeSummary({
            options: Object.values(FLEX_WRAPS),
          }),
        },
      },
    },
    basis: {
      control: 'select',
      options: Object.values(FLEX_BASES),
      description: 'Flex basis',
      table: {
        type: {
          summary: generateArgTypeSummary({
            options: Object.values(FLEX_BASES),
          }),
        },
      },
    },
    shrink: {
      control: 'select',
      options: Object.values(FLEX_SHRINKS),
      description: 'Flex shrink',
      table: {
        type: {
          summary: generateArgTypeSummary({
            options: Object.values(FLEX_SHRINKS),
          }),
        },
      },
    },
    grow: {
      control: 'select',
      options: Object.values(FLEX_GROWS),
      description: 'Flex grow',
      table: {
        type: {
          summary: generateArgTypeSummary({
            options: Object.values(FLEX_GROWS),
          }),
        },
      },
    },
    flex: {
      control: 'select',
      options: Object.values(FLEX_GROW_AND_SHRINK_AND_BASIS),
      description: 'Flex flex',
      table: {
        type: {
          summary: generateArgTypeSummary({
            options: Object.values(FLEX_GROW_AND_SHRINK_AND_BASIS),
          }),
        },
      },
    },
    order: {
      control: 'select',
      options: Object.values(FLEX_ORDERS),
      description: 'Flex order',
      table: {
        type: {
          summary: generateArgTypeSummary({
            options: Object.values(FLEX_ORDERS),
          }),
        },
      },
    },
    children: {
      description: 'children',
      table: {
        type: {
          summary: 'ReactNode',
        },
      },
    },
    className: {
      description: 'className',
      control: 'text',
      type: 'string',
    },
  },
} satisfies Meta<FlexArgs>;

export default meta;

type Story = StoryObj<FlexArgs>;

const FlexItem = ({ children }: PropsWithChildren) => {
  return (
    <div className='bg-in-green-02 text-in-green-06 rounded-in-4 px-2 py-1'>
      {children}
    </div>
  );
};

export const Default: Story = {
  args: {
    children: <FlexItem>Flex</FlexItem>,
  },
};

export const WithChildren: Story = {
  render: (args) => {
    const {
      alignContent,
      alignItems,
      alignSelf,
      justifyContent = FLEX_JUSTIFY_CONTENTS.CENTER,
      justifyItems,
      justifySelf,
      gap,
      gapColumn,
      gapRow,
      ...originalProps
    } = args;

    const align = {
      content: alignContent,
      items: alignItems,
      self: alignSelf,
    };

    const justify = {
      content: justifyContent,
      items: justifyItems,
      self: justifySelf,
    };

    const items = Array.from({ length: 10 }, (_, index) => (
      <FlexItem key={index}>Flex {index + 1}</FlexItem>
    ));

    return (
      <Flex
        className='w-[1000px] px-4'
        {...originalProps}
        gap={
          gap || {
            column: gapColumn,
            row: gapRow || '6',
          }
        }
        align={align}
        justify={justify}
      >
        {items}
      </Flex>
    );
  },
};
