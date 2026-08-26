import { LottieComponentProps, LottieRefCurrentProps } from 'lottie-react';
import { ComponentType, useEffect, useRef, useState } from 'react';

import { LottieAnimationProps } from '@/components/LottieAnimation/types';

const LottieAnimation = ({
  animationData,
  options,
  isStop = false,
  className,
}: LottieAnimationProps) => {
  const lottieRef = useRef<LottieRefCurrentProps | null>(null);
  const [LottieComponent, setLottieComponent] =
    useState<ComponentType<LottieComponentProps> | null>(null);
  const LottieFallback = <div className={className} />;

  useEffect(() => {
    let isUnmounted = false;

    /* effect에서 로드해 클라이언트에서만 import 되고, 로드 전에는 fallback이 렌더된다 */
    import('lottie-react').then(({ default: Lottie }) => {
      if (isUnmounted) return;

      setLottieComponent(() => Lottie);
    });

    return () => {
      isUnmounted = true;
    };
  }, []);

  useEffect(() => {
    if (!lottieRef.current) return;

    const { current } = lottieRef;

    if (isStop) {
      current.stop();
    } else {
      current.play();
    }
  }, [isStop, lottieRef]);

  if (LottieComponent === null) return LottieFallback;

  return (
    <LottieComponent
      animationData={animationData}
      className={className}
      lottieRef={lottieRef}
      renderer='svg'
      autoplay
      loop
      {...options}
    />
  );
};

export default LottieAnimation;
