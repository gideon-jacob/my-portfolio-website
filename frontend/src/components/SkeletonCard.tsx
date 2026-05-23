import { Card, CardContent } from '@/components/ui/card';

export default function SkeletonCard() {
  return (
    <Card className="h-full flex flex-col min-h-[220px]">
      <CardContent className="flex-1 p-6">
        <div className="animate-pulse space-y-4">
          <div className="h-4 bg-muted rounded w-3/4" />
          <div className="h-3 bg-muted rounded w-1/2" />
          <div className="grid grid-cols-2 gap-3 mt-4">
            <div className="h-12 bg-muted rounded-lg" />
            <div className="h-12 bg-muted rounded-lg" />
            <div className="h-12 bg-muted rounded-lg" />
            <div className="h-12 bg-muted rounded-lg" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
