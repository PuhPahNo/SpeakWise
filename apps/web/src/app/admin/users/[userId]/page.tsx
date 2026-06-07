import { NotFoundError } from '@/lib/api/route-handler';
import { getUserDetail } from '@/server/services/admin/users';
import { notFound } from 'next/navigation';
import { UserEditor } from './user-editor';

export const dynamic = 'force-dynamic';

export default async function AdminUserPage({ params }: { params: Promise<{ userId: string }> }) {
  const { userId } = await params;
  try {
    const data = await getUserDetail(userId);
    return <UserEditor data={data} />;
  } catch (e) {
    if (e instanceof NotFoundError) notFound();
    throw e;
  }
}
