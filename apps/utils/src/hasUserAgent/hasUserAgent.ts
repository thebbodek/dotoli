import { HasUserAgentParams } from '@/hasUserAgent/types';

export const hasUserAgent = ({ target, userAgent }: HasUserAgentParams) => {
  const ua =
    userAgent ||
    (typeof window !== 'undefined' ? window.navigator.userAgent : null);

  if (ua === null) {
    return false;
  }

  if (typeof target !== 'string') {
    return ua.match(target) !== null;
  }

  const lowerTarget = target.toLowerCase();

  return ua.toLowerCase().includes(lowerTarget);
};
