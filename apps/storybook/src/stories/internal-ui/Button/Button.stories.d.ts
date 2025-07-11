import { ButtonProps, ButtonSize } from '@bbodek/internal-ui';
import { Meta, StoryObj } from '@storybook/react';
export interface ButtonArgs extends Omit<ButtonProps, 'iconOption'> {
    iconKey: NonNullable<ButtonProps['iconOption']>['iconKey'];
    responsiveMobile: ButtonSize;
    responsiveTablet: ButtonSize;
    responsiveDesktop: ButtonSize;
}
declare const meta: Meta<ButtonArgs>;
export default meta;
type Story = StoryObj<ButtonArgs>;
export declare const Primary: Story;
export declare const Variant: Story;
export declare const Size: Story;
//# sourceMappingURL=Button.stories.d.ts.map