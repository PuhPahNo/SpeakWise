import { listUsers } from '@/server/services/admin/users';
import { UsersClient } from './users-client';

export const dynamic = 'force-dynamic';

export default async function AdminUsersPage() {
  const users = await listUsers({});
  return <UsersClient initialUsers={users} />;
}
