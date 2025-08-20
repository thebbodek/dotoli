import { hasUserAgent, HasUserAgentParams } from '@/hasUserAgent';

export const isiOS = (params?: Pick<HasUserAgentParams, 'userAgent'>) =>
  hasUserAgent({
    target: /iPhone|iPad|iPod/i,
    userAgent: params?.userAgent,
  });
