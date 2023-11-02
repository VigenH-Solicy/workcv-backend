import { IResponse } from '../interfaces/response.interface';

export const responseSender = <T>(
  message: string,
  code: number,
  data?: T,
): IResponse => {
  return {
    message,
    code,
    data,
  };
};
