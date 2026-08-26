import base from './base.eslint.config.js';

/* eslint-config-next는 optional peer — 미설치 환경(utils·hooks·RN)에서
 * default(base) import까지 깨지지 않도록 지연 로드한다 */
let next;

try {
  ({ default: next } = await import('./next.eslint.config.js'));
} catch (error) {
  /* 미설치 폴백만 의도 — 그 외 에러(설정 버그 등)는 숨기지 않고 그대로 던진다 */
  if (error.code !== 'ERR_MODULE_NOT_FOUND') {
    throw error;
  }

  next = undefined;
}

export { base, next };
export default base;
