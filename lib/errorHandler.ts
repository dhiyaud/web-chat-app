import type { AxiosError } from 'axios';

interface ErrorData {
  code: number;
  detail: string;
}

/**
 * @param  {Promise<{data:T;}>} promise
 * @returns Promise
 */
export const resolvePromise = async <T>(
  promise: Promise<{
    data: T;
  }>
): Promise<readonly [T, null] | readonly [null, ErrorData]> => {
  try {
    const { data } = await promise;
    return [data, null] as const;
  } catch (error) {
    if (error instanceof Error) {
      return [
        null,
        resolveErrorClient(error as AxiosError<ErrorData>),
      ] as const;
    } else {
      return [
        null,
        {
          code: 500,
          detail: 'Something went wrong',
        },
      ] as const;
    }
  }
};

/**
 * @param  {AxiosError<ErrorData>} error
 * @returns ErrorData
 */
export const resolveErrorClient = (error: AxiosError<ErrorData>): ErrorData => {
  if (error.response) {
    return {
      code: error.response.status,
      detail: error.response.data.detail || error.response.statusText,
    };
  } else if (error.request) {
    return {
      code: 500,
      detail: 'The request was made but no response was received',
    };
  } else {
    return {
      code: 500,
      detail: 'Something happened in setting up the request',
    };
  }
};
