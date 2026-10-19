export interface GetOptionPosInSetParams {
  option: HTMLElement;
}

export interface GetIsAdjacentOptionParams extends GetOptionPosInSetParams {
  targetOption: HTMLElement;
}

export interface FocusAdjacentOptionParams extends GetOptionPosInSetParams {
  targetOption?: HTMLElement;
}
