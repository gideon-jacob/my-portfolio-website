import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

export interface LeetCodeSubmitStats {
  difficulty: string;
  count: number;
  submissions: number;
}

export interface LeetCodeBadge {
  id: string;
  displayName: string;
  icon: string;
  creationDate: string;
}

export interface LeetCodeProfile {
  ranking: number;
  reputation: number;
  starRating: number;
}

export interface LeetCodeCalendar {
  activeYears: number[];
  streak: number;
  totalActiveDays: number;
  submissionCalendar: string;
}

export interface LeetCodeData {
  totalSolved: number;
  easySolved: number;
  mediumSolved: number;
  hardSolved: number;
  totalEasy: number;
  totalMedium: number;
  totalHard: number;
  acceptanceRate: number;
  ranking: number;
  reputation: number;
  contributionPoints: number;
  streak: number;
  totalActiveDays: number;
  submissionCalendar: Record<string, number>;
  badges: LeetCodeBadge[];
}

interface LeetCodeGraphQLResponse {
  data: {
    matchedUser: {
      submitStatsGlobal: {
        acSubmissionNum: Array<{
          difficulty: string;
          count: number;
          submissions: number;
        }>;
      };
      profile: {
        ranking: number;
        reputation: number;
        starRating: number;
      };
      badges: LeetCodeBadge[];
      contributions: {
        points: number;
      };
      userCalendar: {
        activeYears: number[];
        streak: number;
        totalActiveDays: number;
        submissionCalendar: string;
      };
    };
    allQuestionsCount: Array<{
      difficulty: string;
      count: number;
    }>;
  };
}

const LEETCODE_QUERY = `
  query userProfile($username: String!) {
    matchedUser(username: $username) {
      submitStatsGlobal {
        acSubmissionNum {
          difficulty
          count
          submissions
        }
      }
      profile {
        ranking
        reputation
        starRating
      }
      badges {
        id
        displayName
        icon
        creationDate
      }
      contributions {
        points
      }
      userCalendar {
        activeYears
        streak
        totalActiveDays
        submissionCalendar
      }
    }
    allQuestionsCount {
      difficulty
      count
    }
  }
`;

async function fetchLeetCodeData(username: string): Promise<LeetCodeData> {
  const { data } = await axios.post<LeetCodeGraphQLResponse>(
    '/leetcode-api/graphql',
    {
      query: LEETCODE_QUERY,
      variables: { username },
    }
  );

  const user = data.data.matchedUser;
  const allQuestions = data.data.allQuestionsCount;
  const acStats = user.submitStatsGlobal.acSubmissionNum;

  const totalSolved = acStats.find(s => s.difficulty === 'All')?.count ?? 0;
  const easySolved = acStats.find(s => s.difficulty === 'Easy')?.count ?? 0;
  const mediumSolved = acStats.find(s => s.difficulty === 'Medium')?.count ?? 0;
  const hardSolved = acStats.find(s => s.difficulty === 'Hard')?.count ?? 0;

  const totalEasy = allQuestions.find(q => q.difficulty === 'Easy')?.count ?? 0;
  const totalMedium = allQuestions.find(q => q.difficulty === 'Medium')?.count ?? 0;
  const totalHard = allQuestions.find(q => q.difficulty === 'Hard')?.count ?? 0;

  const totalSubmissions = acStats.reduce((acc, s) => acc + s.submissions, 0);
  const totalAll = acStats.find(s => s.difficulty === 'All')?.submissions ?? 1;
  const acceptanceRate = totalSubmissions > 0 ? (totalSolved / totalAll) * 100 : 0;

  const calendarJson: Record<string, number> = JSON.parse(
    user.userCalendar.submissionCalendar || '{}'
  );

  return {
    totalSolved,
    easySolved,
    mediumSolved,
    hardSolved,
    totalEasy,
    totalMedium,
    totalHard,
    acceptanceRate,
    ranking: user.profile.ranking,
    reputation: user.profile.reputation,
    contributionPoints: user.contributions.points,
    streak: user.userCalendar.streak,
    totalActiveDays: user.userCalendar.totalActiveDays,
    submissionCalendar: calendarJson,
    badges: user.badges,
  };
}

export function useLeetCode() {
  const username = import.meta.env.VITE_LEETCODE_USERNAME || 'gideonjacob';

  return useQuery<LeetCodeData, Error>({
    queryKey: ['leetcode', username],
    queryFn: () => fetchLeetCodeData(username),
    staleTime: 10 * 60 * 1000,
    retry: 2,
  });
}
