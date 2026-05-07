import { prisma } from '@speakwise/db';
import type { UserEventPayloadMap, UserEventType } from '@speakwise/types';

export async function emitUserEvent<T extends UserEventType>(
  userId: string | null,
  eventType: T,
  payload: UserEventPayloadMap[T],
): Promise<void> {
  await prisma.userEvent.create({
    data: {
      userId: userId ?? undefined,
      eventType,
      payload: payload as object,
    },
  });
}

export async function emitMany(
  events: Array<{ userId: string | null; eventType: UserEventType; payload: unknown }>,
): Promise<void> {
  if (events.length === 0) return;
  await prisma.userEvent.createMany({
    data: events.map((e) => ({
      userId: e.userId ?? undefined,
      eventType: e.eventType,
      payload: e.payload as object,
    })),
  });
}
