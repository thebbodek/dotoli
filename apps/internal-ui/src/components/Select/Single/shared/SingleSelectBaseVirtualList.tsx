import {
  Children,
  FocusEvent,
  isValidElement,
  PropsWithChildren,
  useState,
} from 'react';

import { SINGLE_SELECT_VIRTUAL_LIST_OPTION } from '@/components/Select/Single/shared/constants';
import {
  SingleSelectVirtualItemProvider,
  useSingleSelectListContext,
} from '@/components/Select/Single/shared/context';
import { getSingleSelectVirtualListIndexes } from '@/components/Select/Single/shared/utils';
import { DynamicVirtualList } from '@/components/VirtualList/DynamicVirtualList';

const SingleSelectBaseVirtualList = ({ children }: PropsWithChildren) => {
  const { id, labelId } = useSingleSelectListContext();
  const [focusedIndex, setFocusedIndex] = useState<number | null>(null);
  const items = Children.toArray(children);
  const itemsTotalCount = items.length;

  const onOptionBlur = (e: FocusEvent<HTMLElement>) => {
    const { relatedTarget } = e;

    if (!(relatedTarget instanceof Node)) return;

    if (document.getElementById(id)?.contains(relatedTarget)) return;

    setFocusedIndex(null);
  };

  return (
    <DynamicVirtualList
      listOptions={{
        id,
        role: 'listbox',
        'aria-labelledby': labelId,
      }}
      className='flex-1'
      gap={SINGLE_SELECT_VIRTUAL_LIST_OPTION.GAP}
      initialItemHeight={SINGLE_SELECT_VIRTUAL_LIST_OPTION.INITIAL_ITEM_HEIGHT}
      itemsTotalCount={itemsTotalCount}
      overScanCount={SINGLE_SELECT_VIRTUAL_LIST_OPTION.OVER_SCAN_COUNT}
    >
      {({ startIndex, endIndex }) =>
        getSingleSelectVirtualListIndexes({
          startIndex,
          endIndex,
          itemsTotalCount,
          focusedIndex,
        }).map((dataIndex) => {
          const item = items[dataIndex];

          return (
            <DynamicVirtualList.Item
              index={dataIndex - startIndex}
              key={isValidElement(item) ? item.key : dataIndex}
            >
              <SingleSelectVirtualItemProvider
                aria-posinset={dataIndex + 1}
                aria-setsize={itemsTotalCount}
                onBlur={onOptionBlur}
                onFocus={() => setFocusedIndex(dataIndex)}
              >
                {item}
              </SingleSelectVirtualItemProvider>
            </DynamicVirtualList.Item>
          );
        })
      }
    </DynamicVirtualList>
  );
};

export default SingleSelectBaseVirtualList;
