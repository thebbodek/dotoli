import { isAOS } from '@/device/isAOS';
import { isiOS } from '@/device/isiOS';
import { HasUserAgentParams } from '@/hasUserAgent';

export const isMobile = (params?: Pick<HasUserAgentParams, 'userAgent'>) =>
  isAOS(params) || isiOS(params);
