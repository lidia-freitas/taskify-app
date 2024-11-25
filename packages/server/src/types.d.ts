export type Task = {
  id: number;
  name: string;
  checked: boolean;
};

export interface responseResult<T> {
  statusCode: number;
  message: string;
  data: T | Error;
}

