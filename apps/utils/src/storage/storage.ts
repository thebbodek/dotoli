import {
  StorageGetParams,
  StorageHasParams,
  StorageRemoveParams,
  StorageSetParams,
} from '@/storage/types';

const storageError = () => {
  if (typeof window === 'undefined')
    return console.error('localStorage is only available to client-side');
};

export const storage = {
  get: ({ key }: StorageGetParams) => {
    storageError();

    if (storage.has({ key })) {
      const storageValue = localStorage.getItem(key) as string;
      const isObjValue =
        storageValue.startsWith('{') || storageValue.startsWith('[');

      return isObjValue ? JSON.parse(storageValue) : storageValue;
    }

    return null;
  },
  set: ({ key, value }: StorageSetParams) => {
    storageError();

    const isString = typeof value === 'string';
    const payload = !isString ? JSON.stringify(value) : value;

    localStorage.setItem(key, payload);
  },
  has: ({ key }: StorageHasParams) => {
    storageError();

    return localStorage.getItem(key) !== null;
  },
  remove: ({ key }: StorageRemoveParams) => {
    storageError();

    storage.has({ key }) && localStorage.removeItem(key);
  },
};
