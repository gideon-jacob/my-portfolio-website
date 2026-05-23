import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { PINNED_REPOS } from '../utils/constants';

export interface GitHubRepo {
  id: number;
  name: string;
  full_name: string;
  description: string | null;
  html_url: string;
  language: string | null;
  stargazers_count: number;
  forks_count: number;
  fork: boolean;
  updated_at: string;
  topics: string[];
}

export interface GitHubProfile {
  login: string;
  name: string | null;
  avatar_url: string;
  html_url: string;
  bio: string | null;
  public_repos: number;
  followers: number;
  following: number;
}

export interface ContributionDay {
  date: string;
  count: number;
  level: number;
}

export interface GitHubData {
  profile: GitHubProfile;
  repos: GitHubRepo[];
  pinnedRepos: GitHubRepo[];
  totalStars: number;
  topLanguages: Array<{ name: string; value: number }>;
  contributions: ContributionDay[];
}

interface ContributionsAPIResponse {
  total: Record<string, number>;
  contributions: Array<{
    date: string;
    count: number;
    level: number;
  }>;
}

async function fetchGitHubData(username: string): Promise<GitHubData> {
  const [profileRes, reposRes, contribRes] = await Promise.all([
    axios.get<GitHubProfile>(`https://api.github.com/users/${username}`),
    axios.get<GitHubRepo[]>(
      `https://api.github.com/users/${username}/repos?sort=updated&per_page=100`
    ),
    axios.get<ContributionsAPIResponse>(
      `https://github-contributions-api.jogruber.de/v4/${username}`
    ),
  ]);

  const profile = profileRes.data;
  const repos = reposRes.data.filter(r => !r.fork);
  const totalStars = repos.reduce((sum, r) => sum + r.stargazers_count, 0);

  // Pinned repos: use PINNED_REPOS constant if set, otherwise top 6 by stars
  let pinnedRepos: GitHubRepo[];
  if (PINNED_REPOS.length > 0) {
    pinnedRepos = PINNED_REPOS
      .map(name => repos.find(r => r.name === name))
      .filter((r): r is GitHubRepo => r !== undefined);
  } else {
    pinnedRepos = [...repos]
      .sort((a, b) => b.stargazers_count - a.stargazers_count)
      .slice(0, 6);
  }

  // Calculate top languages
  const languageCounts: Record<string, number> = {};
  repos.forEach(repo => {
    if (repo.language) {
      languageCounts[repo.language] = (languageCounts[repo.language] || 0) + 1;
    }
  });
  const topLanguages = Object.entries(languageCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 8)
    .map(([name, value]) => ({ name, value }));

  const contributions = contribRes.data.contributions || [];

  return {
    profile,
    repos,
    pinnedRepos,
    totalStars,
    topLanguages,
    contributions,
  };
}

export function useGitHub() {
  const username = import.meta.env.VITE_GITHUB_USERNAME || 'gideon-jacob';

  return useQuery<GitHubData, Error>({
    queryKey: ['github', username],
    queryFn: () => fetchGitHubData(username),
    staleTime: 10 * 60 * 1000,
    retry: 2,
  });
}
