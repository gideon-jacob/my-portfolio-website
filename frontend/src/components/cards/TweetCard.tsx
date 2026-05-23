import { motion } from 'framer-motion';
import { IoHeartOutline } from 'react-icons/io5';
import { FaRetweet } from 'react-icons/fa6';
import { Card, CardContent } from '@/components/ui/card';
import { formatDate, truncateText } from '../../utils/formatters';

interface TweetCardProps {
  text: string;
  date: string;
  likes: number;
  retweets: number;
  url: string;
  index: number;
}

export default function TweetCard({ text, date, likes, retweets, url, index }: TweetCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: 0.1 * index }}
      className="h-full"
    >
      <Card className="h-full flex flex-col hover:-translate-y-1 transition-all duration-300">
        <CardContent className="flex-1 flex flex-col p-6">
          <p className="text-sm text-muted-foreground mb-3 line-clamp-4">
            {text ? truncateText(text, 200) : 'Add tweet text to twitter.json'}
          </p>
          {date && (
            <p className="text-xs text-muted-foreground/60 mb-3">{formatDate(date)}</p>
          )}
          <div className="flex items-center justify-between mt-auto pt-4 border-t border-border">
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-1 text-xs text-muted-foreground/80">
                <IoHeartOutline className="text-red-400" /> {likes}
              </span>
              <span className="flex items-center gap-1 text-xs text-muted-foreground/80">
                <FaRetweet className="text-green-400" /> {retweets}
              </span>
            </div>
            {url && (
              <a
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-medium text-[#1DA1F2] hover:text-blue-300 transition-colors"
              >
                View Tweet →
              </a>
            )}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
