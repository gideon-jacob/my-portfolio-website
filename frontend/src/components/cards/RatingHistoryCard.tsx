import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface RatingHistoryCardProps {
  ratingHistory: Array<{
    contestName: string;
    rating: number;
    date: string;
  }>;
}

export default function RatingHistoryCard({ ratingHistory }: RatingHistoryCardProps) {
  const chartData = ratingHistory.map(entry => ({
    name: entry.contestName,
    rating: entry.rating,
    date: entry.date,
  }));

  return (
    <Card className="h-full">
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground uppercase">
          Rating History
        </CardTitle>
      </CardHeader>
      <CardContent>
        {chartData.length > 0 ? (
          <div className="h-40 w-full" style={{ minWidth: 200, minHeight: 160 }}>
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData}>
                <XAxis
                  dataKey="date"
                  tick={{ fill: 'var(--muted-foreground)', fontSize: 10 }}
                  axisLine={false}
                  tickLine={false}
                  interval={Math.max(0, Math.floor(chartData.length / 4) - 1)}
                />
                <YAxis
                  tick={{ fill: 'var(--muted-foreground)', fontSize: 10 }}
                  axisLine={false}
                  tickLine={false}
                  width={40}
                />
                <Tooltip
                  contentStyle={{
                    background: 'var(--background, #161b22)',
                    border: '1px solid var(--border, rgba(255,255,255,0.1))',
                    borderRadius: '8px',
                    color: 'var(--foreground, #fff)',
                    fontSize: '12px',
                  }}
                  labelFormatter={(label) => `Contest: ${label}`}
                />
                <Line
                  type="monotone"
                  dataKey="rating"
                  stroke="#5B4638"
                  strokeWidth={2}
                  dot={{ fill: '#5B4638', r: 3 }}
                  activeDot={{ r: 5 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        ) : (
          <p className="text-muted-foreground text-sm">No contest history available</p>
        )}
      </CardContent>
    </Card>
  );
}
