import { useMemo, useState } from 'react';
import type { ContributionDay } from '../../hooks/useGitHub';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface ContributionHeatmapCardProps {
  contributions: ContributionDay[];
}

export default function ContributionHeatmapCard({ contributions }: ContributionHeatmapCardProps) {
  const [tooltip, setTooltip] = useState<{ date: string; count: number; x: number; y: number } | null>(null);

  const { weeks, maxCount } = useMemo(() => {
    // Get last 52 weeks of data
    const now = new Date();
    const oneYearAgo = new Date(now);
    oneYearAgo.setFullYear(now.getFullYear() - 1);

    const filteredContribs = contributions.filter(c => {
      const date = new Date(c.date);
      return date >= oneYearAgo && date <= now;
    });

    // Create a map for quick lookup
    const contribMap = new Map<string, number>();
    filteredContribs.forEach(c => contribMap.set(c.date, c.count));

    // Build weeks array
    const startDay = new Date(oneYearAgo);
    startDay.setDate(startDay.getDate() - startDay.getDay());

    const weeksList: Array<Array<{ date: string; count: number }>> = [];
    let currentWeek: Array<{ date: string; count: number }> = [];
    const current = new Date(startDay);
    let maxC = 0;

    while (current <= now) {
      const dateStr = current.toISOString().split('T')[0];
      const count = contribMap.get(dateStr) || 0;
      maxC = Math.max(maxC, count);
      currentWeek.push({ date: dateStr, count });

      if (currentWeek.length === 7) {
        weeksList.push(currentWeek);
        currentWeek = [];
      }
      current.setDate(current.getDate() + 1);
    }
    if (currentWeek.length > 0) {
      weeksList.push(currentWeek);
    }

    return { weeks: weeksList, maxCount: maxC };
  }, [contributions]);

  const getColor = (count: number) => {
    if (count === 0) return 'var(--muted)';
    const intensity = Math.min(count / Math.max(maxCount, 1), 1);
    if (intensity <= 0.25) return '#0e4429';
    if (intensity <= 0.5) return '#006d32';
    if (intensity <= 0.75) return '#26a641';
    return '#39d353';
  };

  return (
    <Card className="h-full flex flex-col relative">
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground uppercase">Contributions</CardTitle>
      </CardHeader>
      <CardContent className="flex-1 flex flex-col">
        <div className="overflow-x-auto scrollbar-hide mt-auto pb-1">
          <div className="flex gap-[3px] relative">
            {weeks.map((week, wi) => (
              <div key={wi} className="flex flex-col gap-[3px]">
                {week.map((day, di) => (
                  <div
                    key={`${wi}-${di}`}
                    className={`w-[10px] h-[10px] rounded-sm cursor-pointer ${day.count === 0 ? 'bg-muted' : ''}`}
                    style={day.count === 0 ? undefined : { backgroundColor: getColor(day.count) }}
                    onMouseEnter={(e) => {
                      const rect = e.currentTarget.getBoundingClientRect();
                      setTooltip({
                        date: day.date,
                        count: day.count,
                        x: rect.left,
                        y: rect.top - 40,
                      });
                    }}
                    onMouseLeave={() => setTooltip(null)}
                  />
                ))}
              </div>
            ))}
          </div>
        </div>

        {tooltip && (
          <div
            className="fixed z-50 px-3 py-1.5 rounded-md bg-popover border border-border
              text-xs text-popover-foreground shadow-lg pointer-events-none"
            style={{ left: tooltip.x, top: tooltip.y }}
          >
            <span className="font-medium">{tooltip.count}</span> contributions on{' '}
            <span className="text-muted-foreground">{tooltip.date}</span>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
