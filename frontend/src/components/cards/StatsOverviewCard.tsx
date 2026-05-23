import { formatNumber } from '../../utils/formatters';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface StatsOverviewCardProps {
  totalSolved: number;
  ranking: number;
  acceptanceRate: number;
  contributionPoints: number;
}

export default function StatsOverviewCard({
  totalSolved,
  ranking,
  acceptanceRate,
  contributionPoints,
}: StatsOverviewCardProps) {
  const stats = [
    { label: 'Problems Solved', value: formatNumber(totalSolved) },
    { label: 'Global Ranking', value: formatNumber(ranking) },
    { label: 'Acceptance Rate', value: `${acceptanceRate.toFixed(1)}%` },
    { label: 'Contributions', value: formatNumber(contributionPoints) },
  ];

  return (
    <Card className="h-full">
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground uppercase">
          Overview
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-4">
          {stats.map(stat => (
            <div key={stat.label}>
              <p className="text-2xl font-bold">{stat.value}</p>
              <p className="text-xs text-muted-foreground mt-0.5">{stat.label}</p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
