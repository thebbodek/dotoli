import { ACCEPT_FILE_EXT } from '@/shared/constants/ext';

export type AcceptFileExt =
  (typeof ACCEPT_FILE_EXT)[keyof typeof ACCEPT_FILE_EXT];

export interface ExtFnParams {
  str: string;
  accept?: AcceptFileExt[];
}
