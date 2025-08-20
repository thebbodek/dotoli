export interface StorageParams {
  key: string;
}

export interface StorageHasParams extends StorageParams {}

export interface StorageGetParams extends StorageParams {}

export interface StorageSetParams extends StorageParams {
  value: unknown;
}

export interface StorageRemoveParams extends StorageParams {}
