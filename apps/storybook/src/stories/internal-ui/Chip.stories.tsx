import {
  Chip,
  ChipGroup,
  ChipProps,
  COLOR_VARIANTS,
} from '@bbodek/internal-ui';

const meta = {
  title: 'core/internal-ui/Chip',
  argTypes: {
    label: {
      control: 'text',
      description: 'Chip label',
    },
    disabled: {
      control: 'boolean',
      defaultValue: false,
      description: 'Chip disabled',
    },
    className: {
      control: 'text',
      description: 'Chip className',
    },
    color: {
      control: 'select',
      options: Object.values(COLOR_VARIANTS),
      defaultValue: COLOR_VARIANTS.PRIMARY_06,
      description: 'Chip text color',
    },
    backgroundColor: {
      control: 'select',
      options: Object.values(COLOR_VARIANTS),
      defaultValue: COLOR_VARIANTS.PRIMARY_02,
      description: 'Chip background color',
    },
  },
};

export default meta;

export const Default = ({
  label = '뽀득 고등학교',
  ...rest
}: Omit<ChipProps, 'onClick'>) => {
  return <Chip label={label} onClick={() => alert('clicked')} {...rest} />;
};

export const ChipWithGroup = () => {
  const data = ['뽀득 고등학교', '뽀득 중학교', '뽀득 초등학교'];

  return (
    <ChipGroup>
      {data.map((label) => (
        <Chip label={label} onClick={() => alert('clicked')} />
      ))}
    </ChipGroup>
  );
};
