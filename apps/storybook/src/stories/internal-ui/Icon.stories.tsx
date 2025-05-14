import { Icon, IconProps } from '@bbodek/internal-ui';
import { icons, IconStyle } from '@phosphor-icons/core';

const meta = {
  title: 'core/internal-ui/Icon',
  argTypes: {
    iconKey: {
      control: 'select',
      options: icons.map((icon) => icon.name),
      description: '@phosphor-icons/web icon name',
    },
    weight: {
      control: 'select',
      options: Object.values(IconStyle),
      defaultValue: IconStyle.REGULAR,
      description: '@phosphor-icons/web icon weight',
    },
  },
};

export default meta;

export const Default = (props: IconProps) => {
  const { iconKey = 'baby', ...rest } = props;

  return <Icon iconKey={iconKey} {...rest} />;
};
