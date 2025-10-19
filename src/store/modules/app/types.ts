export type SystemInfo = UniApp.GetSystemInfoResult | UniApp.GetWindowInfoResult;

export interface AppState {
  systemInfo: SystemInfo;
}
