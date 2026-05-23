import { IoWarningOutline } from 'react-icons/io5';
import { Card, CardContent } from '@/components/ui/card';

interface ErrorCardProps {
  platformName: string;
  onRetry: () => void;
}

export default function ErrorCard({ platformName, onRetry }: ErrorCardProps) {
  return (
    <Card className="h-full flex flex-col min-h-[220px]">
      <CardContent className="flex-1 flex flex-col items-center justify-center text-center gap-4 p-6">
        <IoWarningOutline className="text-4xl text-destructive" />
        <p className="text-muted-foreground text-center">
          Failed to load <span className="font-semibold text-foreground">{platformName}</span> data
        </p>
        <button
          onClick={onRetry}
          className="px-5 py-2 rounded-lg bg-secondary hover:bg-secondary/80
            text-sm font-medium text-secondary-foreground transition-colors duration-200
            border border-border cursor-pointer"
        >
          Retry
        </button>
      </CardContent>
    </Card>
  );
}
