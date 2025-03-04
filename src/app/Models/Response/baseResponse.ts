export class BaseResponse<T> {
  statusCode: number | undefined;
  message: string | undefined;
  result: T | T[] | undefined;
}
