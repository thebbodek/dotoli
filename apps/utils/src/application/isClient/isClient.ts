import { isServer } from '@/application/isServer';

export const isClient = () => !isServer();
