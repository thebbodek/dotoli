import { hasUserAgent, HasUserAgentParams } from '@/hasUserAgent';

export const isAOS = (params?: Pick<HasUserAgentParams, 'userAgent'>) =>
  hasUserAgent({ target: /Android/i, userAgent: params?.userAgent });
