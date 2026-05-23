import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface ExperienceCardProps {
  experience: Array<{
    company: string;
    role: string;
    duration: string;
    description: string;
  }>;
}

export default function ExperienceCard({ experience }: ExperienceCardProps) {
  const filtered = experience.filter(e => e.company || e.role);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: 0.2 }}
      className="h-full"
    >
      <Card className="h-full flex flex-col hover:-translate-y-1 transition-all duration-300">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
            Experience
          </CardTitle>
        </CardHeader>
        <CardContent className="flex-1 flex flex-col">
          {filtered.length > 0 ? (
            <div className="space-y-4">
              {filtered.map((exp, i) => (
                <div key={i} className="border-l-2 border-[#0A66C2]/40 pl-4">
                  <h4 className="text-sm font-semibold">{exp.role || 'Role'}</h4>
                  <p className="text-xs text-muted-foreground mt-0.5">{exp.company || 'Company'}</p>
                  {exp.duration && (
                    <p className="text-xs text-muted-foreground/60 mt-0.5">{exp.duration}</p>
                  )}
                  {exp.description && (
                    <p className="text-xs text-muted-foreground/80 mt-1 line-clamp-2">{exp.description}</p>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <p className="text-muted-foreground/60 text-sm">Add your experience to linkedin.json</p>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
}
