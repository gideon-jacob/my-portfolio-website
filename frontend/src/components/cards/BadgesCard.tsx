import type { LeetCodeBadge } from '../../hooks/useLeetCode';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface BadgesCardProps {
  badges: LeetCodeBadge[];
}

export default function BadgesCard({ badges }: BadgesCardProps) {
  if (badges.length === 0) {
    return (
      <Card className="h-full">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground uppercase">
            Badges
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground text-sm">No badges earned yet. Keep solving!</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="h-full">
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground uppercase">
          Badges
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-wrap gap-3">
          {badges.map(badge => (
            <div key={badge.id} className="flex flex-col items-center gap-1">
              <img
                src={badge.icon}
                alt={badge.displayName}
                className="w-12 h-12 object-contain"
              />
              <span className="text-[10px] text-muted-foreground text-center max-w-[60px] leading-tight">
                {badge.displayName}
              </span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
