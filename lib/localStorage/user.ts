import type { UserData } from '@lib/fetcher/user';

const UserKey = 'user';

/**
 * @param  {'list'|'grid'} status
 * @returns void
 */
export const saveUserData = (status: UserData): void => {
  localStorage.setItem(UserKey, JSON.stringify(status));
};

/**
 * @returns list | grid
 */
export const getUserData = (): UserData => {
  const data = localStorage.getItem(UserKey);
  return data ? JSON.parse(data) : null;
};

/**
 * @returns void
 */
export const deleteUserData = (): void => {
  localStorage.removeItem(UserKey);
};
