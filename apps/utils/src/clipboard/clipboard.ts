import { ClipboardParams } from '@/clipboard/types';
import { toast } from '@/toast';

export const clipboard = async ({ text }: ClipboardParams) => {
  try {
    await navigator.clipboard.writeText(text);
    toast.success('복사되었습니다');
  } catch {
    toast.error('복사 실패했습니다');
  }
};
