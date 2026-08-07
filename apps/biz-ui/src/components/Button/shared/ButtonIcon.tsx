import { ButtonIconProps } from '@/components/Button/shared/types';
import { Icon } from '@/components/Icon';

/**
 * @description: Phosphor는 아이콘 폰트라 글리프 크기가 `font-size`를 따릅니다. 버튼이 이미
 * 사이즈별 타이포 토큰을 물고 있으므로 아이콘 크기를 따로 지정하지 않습니다.
 * */
const ButtonIcon = ({ iconKey, weight, className }: ButtonIconProps) => {
  return (
    <Icon className={className} iconKey={iconKey} weight={weight} aria-hidden />
  );
};

export default ButtonIcon;
