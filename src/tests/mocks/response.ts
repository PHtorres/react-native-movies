import { AxiosResponse } from 'axios';

const axiosResponseBaseProps = {
  config: { headers: undefined },
};

export const clientErrorResponse = <T>(data: T): AxiosResponse<T> => {
  return {
    ...axiosResponseBaseProps,
    status: 400,
    data,
  };
};

export const successResponse = <T>(data: T): AxiosResponse<T> => {
  return {
    ...axiosResponseBaseProps,
    status: 200,
    data,
  };
};
