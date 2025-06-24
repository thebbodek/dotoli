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
      content={tooltipContent}
      rootClassName='flex-h-stack items-center -space-x-[0.687rem]'
      className={tooltipClassName}
      placement='bottom'
    >
      {visibleItems.map((item) => (
        <Avatar key={item.name} {...item} />
      ))}
      {isOverflow && (
        <AvatarBase size='sm' theme='gray' className='text-body-12-m'>
          {`+${overflowCount}`}
        </AvatarBase>
      )}
    </Tooltip>
  );
};

export default AvatarGroup;
