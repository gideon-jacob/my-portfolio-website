import { IoStar, IoGitBranch } from 'react-icons/io5';
import type { GitHubRepo } from '../../hooks/useGitHub';
import { LANGUAGE_COLORS } from '../../utils/constants';
import { truncateText } from '../../utils/formatters';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface PinnedRepoCardProps {
  repo: GitHubRepo;
}

export default function PinnedRepoCard({ repo }: PinnedRepoCardProps) {
  const langColor = repo.language ? LANGUAGE_COLORS[repo.language] || 'var(--muted-foreground)' : 'var(--muted-foreground)';

  return (
    <Card className="h-full flex flex-col">
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground uppercase">Pinned Repo</CardTitle>
      </CardHeader>
      <CardContent className="flex-1 flex flex-col">
        <h4 className="text-base font-bold mb-2">{repo.name}</h4>
        <p className="text-sm text-muted-foreground mb-4 line-clamp-2 flex-1">
          {repo.description ? truncateText(repo.description, 100) : 'No description'}
        </p>
        <div className="flex items-center justify-between mt-auto">
          <div className="flex items-center gap-3">
            {repo.language && (
              <div className="flex items-center gap-1.5">
                <div
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: langColor }}
                />
                <span className="text-xs text-muted-foreground">{repo.language}</span>
              </div>
            )}
            <div className="flex items-center gap-1">
              <IoStar className="text-xs text-muted-foreground" />
              <span className="text-xs text-muted-foreground">{repo.stargazers_count}</span>
            </div>
            <div className="flex items-center gap-1">
              <IoGitBranch className="text-xs text-muted-foreground" />
              <span className="text-xs text-muted-foreground">{repo.forks_count}</span>
            </div>
          </div>
          <a
            href={repo.html_url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs font-medium text-[#238636] hover:text-green-400 transition-colors"
          >
            View Repo →
          </a>
        </div>
      </CardContent>
    </Card>
  );
}
