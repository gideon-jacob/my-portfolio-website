import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface DifficultyBreakdownCardProps {
  easySolved: number;
  mediumSolved: number;
  hardSolved: number;
  totalEasy: number;
  totalMedium: number;
  totalHard: number;
}

const COLORS = ['#00b8a3', '#ffc01e', '#ef4743'];

export default function DifficultyBreakdownCard({
  easySolved,
  mediumSolved,
  hardSolved,
  totalEasy,
  totalMedium,
  totalHard,
}: DifficultyBreakdownCardProps) {
  const data = [
    { name: 'Easy', solved: easySolved, total: totalEasy },
    { name: 'Medium', solved: mediumSolved, total: totalMedium },
    { name: 'Hard', solved: hardSolved, total: totalHard },
  ];

  const chartData = data.map(d => ({ name: d.name, value: d.solved }));

  return (
    <Card className="h-full flex flex-col">
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground uppercase">
          Difficulty Breakdown
        </CardTitle>
      </CardHeader>
      <CardContent className="flex-1 flex flex-col justify-end">
        <div className="flex items-center gap-4 mt-auto">
          <div className="w-28 h-28 flex-shrink-0" style={{ minWidth: 112, minHeight: 112 }}>
            <ResponsiveContainer width="100%" height="100%" aspect={1}>
              <PieChart>
                <Pie
                  data={chartData}
                  cx="50%"
                  cy="50%"
                  innerRadius={30}
                  outerRadius={50}
                  paddingAngle={3}
                  dataKey="value"
                  strokeWidth={0}
                >
                  {chartData.map((_, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index]} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    background: 'var(--background, #161b22)',
                    border: '1px solid var(--border, rgba(255,255,255,0.1))',
                    borderRadius: '8px',
                    color: 'var(--foreground, #fff)',
                    fontSize: '12px',
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="space-y-2">
            {data.map((d, i) => (
              <div key={d.name} className="flex items-center gap-2">
                <div
                  className="w-2.5 h-2.5 rounded-full"
                  style={{ backgroundColor: COLORS[i] }}
                />
                <span className="text-xs text-muted-foreground">
                  {d.name}: <span className="font-medium text-foreground">{d.solved}</span>
                  <span className="opacity-50">/{d.total}</span>
                </span>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
