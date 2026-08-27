/**
 * @description: `shrink-0` · `whitespace-nowrap`이 없으면 칩이 좁은 컨테이너에서 찌그러집니다.
 * 근거는 docs/biz-ui/components/chip.md 「칩은 찌그러지지 않습니다」.
 * */
export const CHIP_BASE_STYLE =
  'flex-h-stack-center relative h-[32px] w-fit shrink-0 cursor-pointer gap-[4px] rounded-full px-[20px] whitespace-nowrap text-label-semibold transition-colors';

export const CHIP_DEFAULT_CONTAINER_STYLE =
  'bg-white text-gray-900 inset-ring inset-ring-gray-200';
