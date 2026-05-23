import { formatNumber } from '../../utils/formatters';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface RankCardProps {
  globalRank: number;
  countryRank: number;
}

export default function RankCard({ globalRank, countryRank }: RankCardProps) {
  return (
    <Card className="h-full">
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground uppercase">
          Rankings
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-6">
          <div>
            <p className="text-xs text-muted-foreground mb-1">🌍 Global Rank</p>
            <p className="text-3xl font-bold">#{formatNumber(globalRank)}</p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground mb-1">🇮🇳 Country Rank</p>
            <p className="text-3xl font-bold">#{formatNumber(countryRank)}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
