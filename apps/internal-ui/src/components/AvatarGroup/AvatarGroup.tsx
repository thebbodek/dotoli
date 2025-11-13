import { Avatar } from '@/components/Avatar';
import AvatarBase from '@/components/Avatar/AvatarBase';
import { AVATAR_GROUP_DEFAULT_ITEM_LIMIT } from '@/components/AvatarGroup/constants';
import { AvatarGroupProps } from '@/components/AvatarGroup/types';
import { Tooltip } from '@/components/Tooltip';

const AvatarGroup = ({
  items,
  total = items.length,
  tooltipClassName,
}: AvatarGroupProps) => {
  const visibleItems = items.slice(0, AVATAR_GROUP_DEFAULT_ITEM_LIMIT);
  const overflowCount = total - visibleItems.length;
  const isOverflow = overflowCount > 0;
  const tooltipContent = items.map(({ name }) => name).join(',');

  return (
    <Tooltip
      className={tooltipClassName}
      content={tooltipContent}
      placement='bottom'
      rootClassName='in-flex-h-stack items-center -space-x-[0.687rem]'
    >
      {visibleItems.map((item) => (
        <Avatar key={item.name} {...item} />
      ))}
      {isOverflow && (
        <AvatarBase className='text-in-body-12-m' size='sm' theme='gray'>
          {`+${overflowCount}`}
        </AvatarBase>
      )}
    </Tooltip>
  );
};

export default AvatarGroup;
