type LogLevel = 'info' | 'warn' | 'error';

function serializeError(error: unknown) {
  if (!(error instanceof Error)) return { message: String(error) };
  return {
    name: error.name,
    message: error.message,
    ...(process.env.NODE_ENV !== 'production' && error.stack ? { stack: error.stack } : {}),
  };
}

function write(level: LogLevel, event: string, context: Record<string, unknown> = {}) {
  const entry = JSON.stringify({
    timestamp: new Date().toISOString(),
    level,
    event,
    ...context,
  });
  console[level](entry);
}

export const logger = {
  info: (event: string, context?: Record<string, unknown>) => write('info', event, context),
  warn: (event: string, context?: Record<string, unknown>) => write('warn', event, context),
  error: (event: string, error: unknown, context?: Record<string, unknown>) =>
    write('error', event, { ...context, error: serializeError(error) }),
};
