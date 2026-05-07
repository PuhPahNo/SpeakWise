import type { ISODateTime, Language, UUID } from './primitives.js';

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
  clerkUserId: string;
  name: string;
  email: string;
  role: UserRole;
  nativeLanguage: Language;
  targetLanguage: Language;
  timezone: string | null;
  createdAt: ISODateTime;
  updatedAt: ISODateTime;
  lastActiveAt: ISODateTime | null;
}
