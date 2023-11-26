import axios from 'axios';
import { resolvePromise } from '@lib/errorHandler';

interface UsernameExist {
  message: boolean;
}

export interface UserData {
  username: string;
  roomId: string;
}

/**
 *
 * @param   {string} value
 * @returns Promise
 */
export const checkUserExists = async (
  value: string
): Promise<UsernameExist> => {
  const [data, error] = await resolvePromise<UsernameExist>(
    axios.get(`/api/check_username_exist/?value=${value}`)
  );

  if (data) return data;
  if (error) throw Error(error.detail);
  throw Error('No error message from the server');
};

/**
 * @param  {UserData} body
 * @returns Promise
 */
export const createUser = async (body: UserData): Promise<UserData> => {
  const [data, error] = await resolvePromise<UserData>(
    axios.post(`/api/user`, body)
  );

  if (data) return data;
  if (error) throw Error(error.detail);
  throw Error('No error message from the server');
};

/**
 * @param  {number} username
 * @returns Promise
 */
export const deleteUser = async (username: string): Promise<void> => {
  const [, error] = await resolvePromise(axios.delete(`/api/user/${username}`));

  if (error) throw Error(error.detail);
};
