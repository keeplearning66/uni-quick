import type { ProxyOptions } from 'vite';

type ProxyTargetList = Record<string, ProxyOptions>;

export function createViteProxy(env: Record<string, string>) {
  const { VITE_APP_PROXY, VITE_API_PREFIX, VITE_API_BASE_URL } = env;
  if (!JSON.parse(VITE_APP_PROXY)) return undefined;
  const proxy: ProxyTargetList = {
    [VITE_API_PREFIX]: {
      target: VITE_API_BASE_URL,
      changeOrigin: true,
      rewrite: path => path.replace(new RegExp(`^${VITE_API_PREFIX}`), ''),
    },
  };
  return proxy;
};
