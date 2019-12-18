export interface UseFetchResponse {
  data: any;
  isLoading: boolean;
  error: Error;
  retry: CallableFunction;
}
export interface FetchArgs {
  url: string;
  onUpdate?: Array<any>;
  options?: object;
  timeout?: number;
}
export interface Res {
  data: any;
  error: any;
}
