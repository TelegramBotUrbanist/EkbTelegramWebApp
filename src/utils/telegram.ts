import { TelegramUser, UserProfile } from '../pages/Account/account.types.ts';
import { User } from '@telegram-apps/sdk';

export const formatTelegramUser = (user: User): UserProfile => {
  return {
    id: user.id,
    displayName: user.firstName + (user.lastName ? ` ${user.lastName}` : ''),
    username: user.username ? `@${user.username}` : `id${user.id}`,
    photoUrl: user.photoUrl || null
  };
};