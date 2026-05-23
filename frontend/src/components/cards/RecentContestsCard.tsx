import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface RecentContestsCardProps {
  ratingHistory: Array<{
    contestName: string;
    rating: number;
    rank: number;
  }>;
}

export default function RecentContestsCard({ ratingHistory }: RecentContestsCardProps) {
  const recentContests = ratingHistory.slice(-5).reverse();

  return (
    <Card className="h-full">
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground uppercase">
          Recent Contests
        </CardTitle>
      </CardHeader>
      <CardContent>
        {recentContests.length > 0 ? (
          <div className="space-y-3">
            {recentContests.map((contest, i) => {
              const prevRating = i < recentContests.length - 1 ? recentContests[i + 1]?.rating : contest.rating;
              const delta = contest.rating - (prevRating ?? contest.rating);

              return (
                <div
                  key={`${contest.contestName}-${i}`}
                  className="flex items-center justify-between py-2 border-b border-white/5 last:border-0"
                >
                  <div className="flex-1 min-w-0">
                    <p className="text-sm truncate">{contest.contestName}</p>
                    <p className="text-xs text-muted-foreground">Rank #{contest.rank}</p>
                  </div>
                  <span
                    className={`text-sm font-semibold ml-3 ${
                      delta >= 0 ? 'text-green-400' : 'text-red-400'
                    }`}
                  >
                    {delta >= 0 ? '+' : ''}{delta}
                  </span>
                </div>
              );
            })}
          </div>
        ) : (
          <p className="text-muted-foreground text-sm">No contest data available</p>
        )}
      </CardContent>
    </Card>
  );
}
