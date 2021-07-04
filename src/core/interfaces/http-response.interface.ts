/* deprecated unless return structure changes */
export type HttpResponse<T> = Promise<HttpResponseObject<T>>;

export interface HttpResponseObject<T> {
  data: T;
}