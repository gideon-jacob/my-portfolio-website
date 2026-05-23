import { SiLeetcode } from 'react-icons/si';
import { useLeetCode } from '../../hooks/useLeetCode';
import SectionWrapper from '../SectionWrapper';
import SkeletonCard from '../SkeletonCard';
import ErrorCard from '../ErrorCard';
import StatsOverviewCard from '../cards/StatsOverviewCard';
import DifficultyBreakdownCard from '../cards/DifficultyBreakdownCard';
import StreakCard from '../cards/StreakCard';
import BadgesCard from '../cards/BadgesCard';
import { SECTION_IDS } from '../../utils/constants';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';

export default function LeetCodeSection() {
  const { data, isLoading, isError, refetch } = useLeetCode();

  return (
    <SectionWrapper
      id={SECTION_IDS.leetcode}
      title="LeetCode"
      platformColor="#FFA116"
      platformIcon={SiLeetcode}
    >
      <Carousel opts={{ align: "start" }} className="w-full">
        <CarouselContent>
          {isLoading && (
            <>
              <CarouselItem className="md:basis-1/2 lg:basis-1/3"><SkeletonCard /></CarouselItem>
              <CarouselItem className="md:basis-1/2 lg:basis-1/3"><SkeletonCard /></CarouselItem>
              <CarouselItem className="md:basis-1/2 lg:basis-1/3"><SkeletonCard /></CarouselItem>
            </>
          )}
          {isError && (
            <CarouselItem className="md:basis-1/2 lg:basis-1/3">
              <ErrorCard platformName="LeetCode" onRetry={() => refetch()} />
            </CarouselItem>
          )}
          {data && (
            <>
              <CarouselItem className="md:basis-1/2 lg:basis-1/3">
                <StatsOverviewCard
                  totalSolved={data.totalSolved}
                  ranking={data.ranking}
                  acceptanceRate={data.acceptanceRate}
                  contributionPoints={data.contributionPoints}
                />
              </CarouselItem>
              <CarouselItem className="md:basis-1/2 lg:basis-1/3">
                <DifficultyBreakdownCard
                  easySolved={data.easySolved}
                  mediumSolved={data.mediumSolved}
                  hardSolved={data.hardSolved}
                  totalEasy={data.totalEasy}
                  totalMedium={data.totalMedium}
                  totalHard={data.totalHard}
                />
              </CarouselItem>
              <CarouselItem className="md:basis-1/2 lg:basis-1/3">
                <StreakCard
                  streak={data.streak}
                  totalActiveDays={data.totalActiveDays}
                  submissionCalendar={data.submissionCalendar}
                />
              </CarouselItem>
              <CarouselItem className="md:basis-1/2 lg:basis-1/3">
                <BadgesCard badges={data.badges} />
              </CarouselItem>
            </>
          )}
        </CarouselContent>
        <div className="hidden md:block">
          <CarouselPrevious />
          <CarouselNext />
        </div>
      </Carousel>
    </SectionWrapper>
  );
}
