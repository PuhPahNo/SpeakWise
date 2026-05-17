/**
 * 30-day activity heatmap. Renders as a 5-wide × 6-tall grid of dots
 * (oldest top-left, today bottom-right). Each dot's color intensity
 * scales with the number of sessions on that day.
 */
import type { ActivityDay } from '@/server/services/dashboard';

export function ActivityHeatmap({ days }: { days: ActivityDay[] }) {
  // Cap intensity at 3+ sessions/day → max color
  const max = Math.max(1, ...days.map((d) => d.sessions));

  return (
    <div className="surface rounded-2xl p-4 sm:p-5">
      <div className="grid grid-cols-10 sm:grid-cols-15 gap-1.5">
        {days.map((d) => {
          const intensity = Math.min(1, d.sessions / Math.min(3, max));
          const empty = d.sessions === 0;
          return (
            <div
              key={d.date}
              title={`${d.date} — ${d.sessions} session${d.sessions === 1 ? '' : 's'}`}
              className={`aspect-square rounded-md ${
                empty ? 'bg-white/4' : ''
              }`}
              style={
                empty
                  ? undefined
                  : {
                      backgroundColor: `rgba(224, 136, 24, ${0.25 + intensity * 0.6})`,
                    }
              }
              aria-label={`${d.date}, ${d.sessions} sessions`}
            />
          );
        })}
      </div>
      <div className="flex items-center justify-between mt-3 text-[10px] text-ink-300">
        <span>30 days ago</span>
        <div className="flex items-center gap-1">
          <span>less</span>
          <div className="w-2 h-2 rounded-sm bg-white/4" />
          <div className="w-2 h-2 rounded-sm" style={{ backgroundColor: 'rgba(224,136,24,0.35)' }} />
          <div className="w-2 h-2 rounded-sm" style={{ backgroundColor: 'rgba(224,136,24,0.6)' }} />
          <div className="w-2 h-2 rounded-sm" style={{ backgroundColor: 'rgba(224,136,24,0.85)' }} />
          <span>more</span>
        </div>
        <span>today</span>
      </div>
    </div>
  );
}
