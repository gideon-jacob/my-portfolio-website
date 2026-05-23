import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { formatNumber } from '../../utils/formatters';

interface TwitterProfileCardProps {
  handle: string;
  displayName: string;
  bio: string;
  followers: number;
  following: number;
  avatarUrl: string;
}

export default function TwitterProfileCard({
  handle,
  displayName,
  bio,
  followers,
  following,
  avatarUrl,
}: TwitterProfileCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="h-full"
    >
      <Card className="h-full flex flex-col hover:-translate-y-1 transition-all duration-300">
        <CardContent className="flex-1 flex flex-col p-6">
          <div className="flex items-start gap-4">
            <div className="w-14 h-14 rounded-full bg-gradient-to-br from-[#1DA1F2] to-[#0d8bd9] flex items-center justify-center flex-shrink-0 overflow-hidden">
              {avatarUrl ? (
                <img src={avatarUrl} alt={displayName} className="w-full h-full object-cover" />
              ) : (
                <span className="text-lg font-bold text-white">
                  {displayName ? displayName.charAt(0) : 'G'}
                </span>
              )}
            </div>
            <div className="min-w-0">
              <h4 className="text-base font-bold">{displayName || 'Display Name'}</h4>
              <p className="text-sm text-muted-foreground/80">{handle || '@handle'}</p>
            </div>
          </div>
          {bio && <p className="text-sm text-muted-foreground mt-3">{bio}</p>}
          <div className="flex items-center gap-6 mt-4 pt-4 border-t border-border mt-auto">
            <div>
              <span className="text-sm font-bold">{formatNumber(followers)}</span>
              <span className="text-xs text-muted-foreground/80 ml-1">Followers</span>
            </div>
            <div>
              <span className="text-sm font-bold">{formatNumber(following)}</span>
              <span className="text-xs text-muted-foreground/80 ml-1">Following</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
