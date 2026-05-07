import { withAuth } from '@/lib/api/route-handler';
import { Models, chatStructured } from '@speakwise/ai';
import { ProgressReportOutputSchema } from '@speakwise/schemas';
import { getDashboard } from '@/server/services/progress';

export async function GET() {
  return withAuth(async ({ userId }) => {
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
