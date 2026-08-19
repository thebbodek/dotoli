/**
 * @description: `last:border-b-0`은 형제로 나열될 때만 걸립니다. 목록 컴포넌트를 두지 않은
 * 이유는 docs/biz-ui/components/navigation-list-item.md 「결정」에 있습니다.
 * */
export const NAVIGATION_LIST_ITEM_BASE_STYLE =
  'flex-h-stack w-full cursor-pointer items-center justify-between gap-[6px] border-b border-gray-100 bg-white px-[13px] py-[14px] last:border-b-0';

export const NAVIGATION_LIST_ITEM_LABEL_STYLE = 'min-w-0 truncate text-left';

export const NAVIGATION_LIST_ITEM_TRAILING_STYLE =
  'flex-h-stack shrink-0 items-center gap-[2px]';

export const NAVIGATION_LIST_ITEM_CARET_STYLE = 'text-[16px] text-gray-400';
