import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { formatNumber, formatDate } from '../../utils/formatters';

interface TwitterSummaryCardProps {
  totalTweets: number;
  joinedDate: string;
  profileUrl: string;
}

export default function TwitterSummaryCard({
  totalTweets,
  joinedDate,
  profileUrl,
}: TwitterSummaryCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: 0.3 }}
      className="h-full"
    >
      <Card className="h-full flex flex-col hover:-translate-y-1 transition-all duration-300">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
            Summary
          </CardTitle>
        </CardHeader>
        <CardContent className="flex-1 flex flex-col">
          <div className="space-y-3 mb-5">
            <div>
              <p className="text-2xl font-bold">{formatNumber(totalTweets)}</p>
              <p className="text-xs text-muted-foreground/80">Total Tweets</p>
            </div>
            {joinedDate && (
              <div>
                <p className="text-sm text-muted-foreground">Joined {formatDate(joinedDate)}</p>
              </div>
            )}
          </div>
          <a
            href={profileUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-auto inline-block px-5 py-2.5 rounded-full bg-[#1DA1F2] hover:bg-[#1a8cd8]
              text-sm font-semibold text-white transition-colors duration-200 text-center"
          >
            Follow →
          </a>
        </CardContent>
      </Card>
    </motion.div>
  );
}
