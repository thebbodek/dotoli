import { LottieComponentProps } from 'lottie-react';
import { HTMLAttributes } from 'react';

export interface LottieAnimationProps
  extends Pick<HTMLAttributes<HTMLDivElement>, 'className'>,
    Pick<LottieComponentProps, 'animationData'> {
  options?: Omit<LottieComponentProps, 'lottieRef' | 'animationData'>;
  isStop?: boolean;
}
