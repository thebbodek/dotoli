import { ButtonPrimitiveProps } from '@bbodek/internal-ui';

import { ButtonArgs } from '@/stories/internal-ui/Button/Button.stories';

export const getResponsive = ({
  responsiveMobile,
  responsiveTablet,
  responsiveDesktop,
}: Pick<
  ButtonArgs,
  'responsiveMobile' | 'responsiveTablet' | 'responsiveDesktop'
>) => {
  if (!responsiveMobile && !responsiveTablet && !responsiveDesktop) return;

  const responsive: NonNullable<ButtonPrimitiveProps['responsive']> = {};

  if (responsiveMobile) {
    responsive.mobile = responsiveMobile;
  }

  if (responsiveTablet) {
    responsive.tablet = responsiveTablet;
  }

  if (responsiveDesktop) {
    responsive.desktop = responsiveDesktop;
  }

  return responsive;
};
