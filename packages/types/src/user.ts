import type { ISODateTime, Language, UUID } from './primitives';

export const USER_ROLES = [
  'learner',
  'admin',
  'tutor',
  'student',
  'organization_admin',
] as const;
export type UserRole = (typeof USER_ROLES)[number];

export interface User {
  id: UUID;
  username: string;
  /** bcrypt hash; never sent to clients */
  passwordHash: string;
  name: string;
  email: string | null;
  role: UserRole;
  nativeLanguage: Language;
  targetLanguage: Language;
  timezone: string | null;
  createdAt: ISODateTime;
  updatedAt: ISODateTime;
  lastActiveAt: ISODateTime | null;
}

/** User shape safe to send to clients (passwordHash stripped). */
export type PublicUser = Omit<User, 'passwordHash'>;
