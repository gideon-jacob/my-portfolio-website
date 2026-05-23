import { useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface StreakCardProps {
  streak: number;
  totalActiveDays: number;
  submissionCalendar: Record<string, number>;
}

export default function StreakCard({
  streak,
  totalActiveDays,
  submissionCalendar,
}: StreakCardProps) {
  const heatmapData = useMemo(() => {
    const now = new Date();
    const oneYearAgo = new Date(now);
    oneYearAgo.setFullYear(now.getFullYear() - 1);

    // Adjust to start from the beginning of the week (Sunday)
    const startDay = new Date(oneYearAgo);
    startDay.setDate(startDay.getDate() - startDay.getDay());

    const cells: Array<{ date: string; count: number }> = [];
    const current = new Date(startDay);

    while (current <= now) {
      const timestamp = Math.floor(current.getTime() / 1000).toString();
      cells.push({
        date: current.toISOString().split('T')[0],
        count: submissionCalendar[timestamp] || 0,
      });
      current.setDate(current.getDate() + 1);
    }

    return cells;
  }, [submissionCalendar]);

  const getOpacity = (count: number) => {
    if (count === 0) return 0.05;
    if (count <= 2) return 0.3;
    if (count <= 5) return 0.55;
    if (count <= 10) return 0.75;
    return 1;
  };

  // Find the longest streak from calendar
  const longestStreak = useMemo(() => {
    const sortedDates = Object.keys(submissionCalendar)
      .map(Number)
      .sort()
      .filter(ts => submissionCalendar[ts.toString()] > 0);
    
    if (sortedDates.length === 0) return 0;
    
    let maxStreak = 1;
    let currentStreak = 1;
    const DAY = 86400;
    
    for (let i = 1; i < sortedDates.length; i++) {
      if (sortedDates[i] - sortedDates[i - 1] === DAY) {
        currentStreak++;
        maxStreak = Math.max(maxStreak, currentStreak);
      } else {
        currentStreak = 1;
      }
    }
    return maxStreak;
  }, [submissionCalendar]);

  // Group cells into weeks (columns of 7)
  const weeks: Array<Array<{ date: string; count: number }>> = [];
  for (let i = 0; i < heatmapData.length; i += 7) {
    weeks.push(heatmapData.slice(i, i + 7));
  }

  return (
    <Card className="h-full">
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground uppercase">
          Streak & Activity
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-3 gap-3 mb-4">
          <div>
            <p className="text-xl font-bold text-[#FFA116]">{streak}</p>
            <p className="text-[10px] text-muted-foreground">Current Streak</p>
          </div>
          <div>
            <p className="text-xl font-bold">{longestStreak}</p>
            <p className="text-[10px] text-muted-foreground">Longest Streak</p>
          </div>
          <div>
            <p className="text-xl font-bold">{totalActiveDays}</p>
            <p className="text-[10px] text-muted-foreground">Active Days</p>
          </div>
        </div>

        {/* Mini Heatmap */}
        <div className="overflow-hidden">
          <div className="flex gap-[2px]">
            {weeks.map((week, wi) => (
              <div key={wi} className="flex flex-col gap-[2px]">
                {week.map((day, di) => (
                  <div
                    key={`${wi}-${di}`}
                    className="w-[4px] h-[4px] rounded-[1px]"
                    style={{
                      backgroundColor: `rgba(34, 197, 94, ${getOpacity(day.count)})`,
                    }}
                    title={`${day.date}: ${day.count} submissions`}
                  />
                ))}
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
