import { motion } from 'framer-motion';
import { IoHeartOutline, IoChatbubbleOutline } from 'react-icons/io5';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { truncateText } from '../../utils/formatters';

interface RecentPostsCardProps {
  posts: Array<{
    preview: string;
    likes: number;
    comments: number;
    url: string;
  }>;
}

export default function RecentPostsCard({ posts }: RecentPostsCardProps) {
  const filteredPosts = posts.filter(p => p.preview);

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
            Recent Posts
          </CardTitle>
        </CardHeader>
        <CardContent className="flex-1 flex flex-col">
          {filteredPosts.length > 0 ? (
            <div className="space-y-3">
              {filteredPosts.slice(0, 3).map((post, i) => (
                <div key={i} className="p-3 rounded-lg bg-muted/50 border border-border">
                  <p className="text-xs text-muted-foreground line-clamp-3 mb-2 flex-1">
                    {truncateText(post.preview, 120)}
                  </p>
                  <div className="flex items-center justify-between mt-auto">
                    <div className="flex items-center gap-3">
                      <span className="flex items-center gap-1 text-xs text-muted-foreground/80">
                        <IoHeartOutline /> {post.likes}
                      </span>
                      <span className="flex items-center gap-1 text-xs text-muted-foreground/80">
                        <IoChatbubbleOutline /> {post.comments}
                      </span>
                    </div>
                    {post.url && (
                      <a
                        href={post.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[10px] font-medium text-[#0A66C2] hover:text-blue-300 transition-colors"
                      >
                        View Post →
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-muted-foreground/60 text-sm">Add your posts to linkedin.json</p>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
}
