import { isClient } from '@/application';
import { HasUserAgentParams } from '@/hasUserAgent/types';

export const hasUserAgent = ({ target, userAgent }: HasUserAgentParams) => {
  const ua = userAgent || (isClient() ? window.navigator.userAgent : null);

  if (ua === null) {
    return false;
  }

  if (typeof target !== 'string') {
    return ua.match(target) !== null;
  }

  const lowerTarget = target.toLowerCase();

  return ua.toLowerCase().includes(lowerTarget);
};
