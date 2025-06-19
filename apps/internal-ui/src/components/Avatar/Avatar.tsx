import AvatarBase from '@/components/Avatar/AvatarBase';
import AvatarImage from '@/components/Avatar/AvatarImage';
import { AVATAR_SIZES } from '@/components/Avatar/constants';
import { AvatarProps } from '@/components/Avatar/types';

const Avatar = ({ size = AVATAR_SIZES.SM, type, src, alt }: AvatarProps) => {
  return (
    <AvatarBase size={size} theme={'primary'}>
      <AvatarImage src={src} alt={alt} size={size} type={type} />
    </AvatarBase>
  );
};

export default Avatar;
