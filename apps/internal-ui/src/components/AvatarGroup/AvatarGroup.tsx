import { Avatar } from '@/components/Avatar';
import { AVATAR_GROUP_DEFAULT_ITEM_LIMIT } from '@/components/AvatarGroup/constants';
import { AvatarGroupProps } from '@/components/AvatarGroup/types';
import PersonaAvatar from '@/components/Persona/PersonaAvatar';
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
      rootClassName='flex-h-stack items-center -space-x-[0.687rem]'
      content={tooltipContent}
      placement='bottom'
      className={tooltipClassName}
    >
      {visibleItems.map((item) => (
        <PersonaAvatar key={item.name} {...item} />
      ))}
      {isOverflow && (
        <Avatar
          variant='text'
          text={`+${overflowCount}`}
          size='sm'
          theme='gray'
        />
      )}
    </Tooltip>
  );
};

export default AvatarGroup;
