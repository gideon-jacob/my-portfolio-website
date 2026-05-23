import { ratingToStars, ratingToDivision } from '../../utils/formatters';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface RatingCardProps {
  currentRating: number;
  stars: string;
}

export default function RatingCard({ currentRating, stars }: RatingCardProps) {
  const starCount = ratingToStars(currentRating);
  const division = ratingToDivision(currentRating);

  return (
    <Card className="h-full">
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground uppercase">
          Rating
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-5xl font-bold mb-2">{currentRating}</p>
        <div className="flex items-center gap-1 mb-2">
          {Array.from({ length: starCount }).map((_, i) => (
            <span key={i} className="text-lg text-yellow-400">★</span>
          ))}
          {stars && <span className="text-xs text-muted-foreground ml-2">({stars})</span>}
        </div>
        <p className="text-sm text-muted-foreground">{division}</p>
      </CardContent>
    </Card>
  );
}
