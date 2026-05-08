export class AIError extends Error {
  readonly provider: string;
  readonly purpose: string;
  override readonly cause?: unknown;
  constructor(opts: { provider: string; purpose: string; message: string; cause?: unknown }) {
    super(opts.message);
    this.name = 'AIError';
    this.provider = opts.provider;
    this.purpose = opts.purpose;
    this.cause = opts.cause;
  }
}

export class AISchemaValidationError extends AIError {
  readonly raw: string;
  readonly issues: unknown;
  constructor(opts: {
    provider: string;
    purpose: string;
    message: string;
    raw: string;
    issues: unknown;
  }) {
    super(opts);
    this.name = 'AISchemaValidationError';
    this.raw = opts.raw;
    this.issues = opts.issues;
  }
}
