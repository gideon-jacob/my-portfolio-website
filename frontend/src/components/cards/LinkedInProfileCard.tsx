import { motion } from 'framer-motion';
import { IoLocationOutline, IoSchoolOutline } from 'react-icons/io5';
import { Card, CardContent } from '@/components/ui/card';

interface LinkedInProfileCardProps {
  name: string;
  title: string;
  college: string;
  location: string;
  profileUrl: string;
  avatarUrl: string;
}

export default function LinkedInProfileCard({
  name,
  title,
  college,
  location,
  profileUrl,
  avatarUrl,
}: LinkedInProfileCardProps) {
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
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#0A66C2] to-[#0077B5] flex items-center justify-center flex-shrink-0 overflow-hidden">
              {avatarUrl ? (
                <img src={avatarUrl} alt={name} className="w-full h-full object-cover" />
              ) : (
                <span className="text-xl font-bold text-white">
                  {name ? name.charAt(0) : 'G'}
                </span>
              )}
            </div>
            <div className="min-w-0">
              <h4 className="text-lg font-bold">{name || 'Your Name'}</h4>
              <p className="text-sm text-muted-foreground mb-2">{title || 'Your Title'}</p>
              {college && (
                <p className="text-xs text-muted-foreground/80 flex items-center gap-1">
                  <IoSchoolOutline /> {college}
                </p>
              )}
              {location && (
                <p className="text-xs text-muted-foreground/80 flex items-center gap-1 mt-1">
                  <IoLocationOutline /> {location}
                </p>
              )}
            </div>
          </div>
          <a
            href={profileUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-auto pt-4 inline-block px-4 py-2 rounded-lg bg-[#0A66C2] hover:bg-[#004182]
              text-sm font-medium text-white transition-colors duration-200 text-center"
          >
            Connect →
          </a>
        </CardContent>
      </Card>
    </motion.div>
  );
}
