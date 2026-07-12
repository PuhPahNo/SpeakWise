import { withAuth } from '@/lib/api/route-handler';
import { userRateLimitResponse } from '@/lib/security/rate-limit';
import { getDashboard } from '@/server/services/progress';
import { Models, chatStructured } from '@speakwise/ai';
import { ProgressReportOutputSchema } from '@speakwise/schemas';

export async function GET() {
  return withAuth(async ({ userId }) => {
    const limited = userRateLimitResponse('progress-report', userId, 10, 15 * 60_000);
    if (limited) return limited;
    const dashboard = await getDashboard(userId);
    const result = await chatStructured({
      promptKey: 'progress.report',
      purpose: 'progress.report',
      schema: ProgressReportOutputSchema,
      model: Models.fast,
      vars: { REPORT_DATA_JSON: JSON.stringify(dashboard) },
    });
    return result.data;
  });
}
