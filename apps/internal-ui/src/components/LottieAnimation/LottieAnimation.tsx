import { LottieComponentProps, LottieRefCurrentProps } from 'lottie-react';
import dynamic from 'next/dynamic';
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

  const loadLottie = () => {
    const Lottie = dynamic(() => import('lottie-react'), {
      ssr: false,
      loading: () => LottieFallback,
    });

    setLottieComponent(Lottie);
  };

  useEffect(loadLottie, []);

  useEffect(() => {
    if (!lottieRef.current) return;

    const { current } = lottieRef;

    isStop ? current.stop() : current.play();
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
