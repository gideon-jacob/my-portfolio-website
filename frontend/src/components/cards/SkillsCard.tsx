import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface SkillsCardProps {
  skills: Array<{ name: string; endorsements: number }>;
}

export default function SkillsCard({ skills }: SkillsCardProps) {
  const filteredSkills = skills.filter(s => s.name);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: 0.1 }}
      className="h-full"
    >
      <Card className="h-full flex flex-col hover:-translate-y-1 transition-all duration-300">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
            Top Skills
          </CardTitle>
        </CardHeader>
        <CardContent className="flex-1 flex flex-col">
          {filteredSkills.length > 0 ? (
            <div className="flex flex-wrap gap-2">
              {filteredSkills.map(skill => (
                <Badge
                  key={skill.name}
                  variant="secondary"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5"
                >
                  {skill.name}
                  {skill.endorsements > 0 && (
                    <span className="px-1.5 py-0.5 rounded-full bg-primary/20 text-[10px] font-medium">
                      {skill.endorsements}
                    </span>
                  )}
                </Badge>
              ))}
            </div>
          ) : (
            <p className="text-muted-foreground/60 text-sm">Add your skills to linkedin.json</p>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
}
