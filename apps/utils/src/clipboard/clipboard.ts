import { toast } from '@/toast';

export const clipboard = async (text: string) => {
  try {
    await navigator.clipboard.writeText(text);
    toast.success('복사 성공');
  } catch (e) {
    toast.error('복사 실패');
  }
};
