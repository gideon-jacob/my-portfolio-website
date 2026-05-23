import { SiCodechef } from 'react-icons/si';
import { useCodeChef } from '../../hooks/useCodeChef';
import SectionWrapper from '../SectionWrapper';
import SkeletonCard from '../SkeletonCard';
import ErrorCard from '../ErrorCard';
import RatingCard from '../cards/RatingCard';
import RankCard from '../cards/RankCard';
import RatingHistoryCard from '../cards/RatingHistoryCard';
import RecentContestsCard from '../cards/RecentContestsCard';
import { SECTION_IDS } from '../../utils/constants';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';

export default function CodeChefSection() {
  const { data, isLoading, isError, refetch } = useCodeChef();

  return (
    <SectionWrapper
      id={SECTION_IDS.codechef}
      title="CodeChef"
      platformColor="#5B4638"
      platformIcon={SiCodechef}
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
              <ErrorCard platformName="CodeChef" onRetry={() => refetch()} />
            </CarouselItem>
          )}
          {data && (
            <>
              <CarouselItem className="md:basis-1/2 lg:basis-1/3">
                <RatingCard currentRating={data.currentRating} stars={data.stars} />
              </CarouselItem>
              <CarouselItem className="md:basis-1/2 lg:basis-1/3">
                <RankCard globalRank={data.globalRank} countryRank={data.countryRank} />
              </CarouselItem>
              <CarouselItem className="md:basis-1/2 lg:basis-1/3">
                <RatingHistoryCard ratingHistory={data.ratingHistory} />
              </CarouselItem>
              <CarouselItem className="md:basis-1/2 lg:basis-1/3">
                <RecentContestsCard ratingHistory={data.ratingHistory} />
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
