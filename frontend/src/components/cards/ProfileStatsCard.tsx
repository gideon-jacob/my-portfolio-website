import { formatNumber } from '../../utils/formatters';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface ProfileStatsCardProps {
  followers: number;
  following: number;
  publicRepos: number;
  totalStars: number;
}

export default function ProfileStatsCard({
  followers,
  following,
  publicRepos,
  totalStars,
}: ProfileStatsCardProps) {
  const stats = [
    { label: 'Followers', value: formatNumber(followers) },
    { label: 'Following', value: formatNumber(following) },
    { label: 'Public Repos', value: formatNumber(publicRepos) },
    { label: 'Total Stars', value: formatNumber(totalStars) },
  ];

  return (
    <Card className="h-full flex flex-col">
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground uppercase">Profile Stats</CardTitle>
      </CardHeader>
      <CardContent className="flex-1 flex flex-col justify-center">
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
