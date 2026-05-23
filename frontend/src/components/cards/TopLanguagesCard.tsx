import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from 'recharts';
import { LANGUAGE_COLORS } from '../../utils/constants';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface TopLanguagesCardProps {
  topLanguages: Array<{ name: string; value: number }>;
}

export default function TopLanguagesCard({ topLanguages }: TopLanguagesCardProps) {
  return (
    <Card className="h-full flex flex-col">
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground uppercase">Top Languages</CardTitle>
      </CardHeader>
      <CardContent className="flex-1 flex flex-col">
        <div className="h-48 w-full mt-auto" style={{ minWidth: 200, minHeight: 192 }}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={topLanguages} layout="vertical" margin={{ left: 0, right: 10 }}>
              <XAxis
                type="number"
                tick={{ fill: 'var(--muted-foreground)', fontSize: 10 }}
                axisLine={false}
                tickLine={false}
              />
              <YAxis
                type="category"
                dataKey="name"
                tick={{ fill: 'var(--muted-foreground)', fontSize: 11 }}
                axisLine={false}
                tickLine={false}
                width={80}
              />
              <Tooltip
                contentStyle={{
                  background: 'var(--popover)',
                  border: '1px solid var(--border)',
                  borderRadius: '8px',
                  color: 'var(--popover-foreground)',
                  fontSize: '12px',
                }}
                formatter={(value: any) => [`${value} repos`, 'Count']}
              />
              <Bar dataKey="value" radius={[0, 4, 4, 0]} barSize={16}>
                {topLanguages.map((entry) => (
                  <Cell
                    key={entry.name}
                    fill={LANGUAGE_COLORS[entry.name] || 'var(--muted)'}
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
