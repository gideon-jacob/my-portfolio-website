import { SiGithub } from 'react-icons/si';
import { useGitHub } from '../../hooks/useGitHub';
import SectionWrapper from '../SectionWrapper';
import SkeletonCard from '../SkeletonCard';
import ErrorCard from '../ErrorCard';
import ProfileStatsCard from '../cards/ProfileStatsCard';
import ContributionHeatmapCard from '../cards/ContributionHeatmapCard';
import PinnedRepoCard from '../cards/PinnedRepoCard';
import TopLanguagesCard from '../cards/TopLanguagesCard';
import { SECTION_IDS } from '../../utils/constants';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';

export default function GitHubSection() {
  const { data, isLoading, isError, refetch } = useGitHub();

  return (
    <SectionWrapper
      id={SECTION_IDS.github}
      title="GitHub"
      platformColor="#238636"
      platformIcon={SiGithub}
    >
      <Carousel opts={{ align: "start" }} className="w-full">
        <CarouselContent>
          {isLoading && (
            <>
              <CarouselItem className="md:basis-1/2 lg:basis-1/3">
                <SkeletonCard />
              </CarouselItem>
              <CarouselItem className="md:basis-1/2 lg:basis-1/3">
                <SkeletonCard />
              </CarouselItem>
              <CarouselItem className="md:basis-1/2 lg:basis-1/3">
                <SkeletonCard />
              </CarouselItem>
            </>
          )}
          {isError && (
            <CarouselItem className="md:basis-1/2 lg:basis-1/3">
              <ErrorCard platformName="GitHub" onRetry={() => refetch()} />
            </CarouselItem>
          )}
          {data && (
            <>
              <CarouselItem className="md:basis-1/2 lg:basis-1/3">
                <ProfileStatsCard
                  followers={data.profile.followers}
                  following={data.profile.following}
                  publicRepos={data.profile.public_repos}
                  totalStars={data.totalStars}
                />
              </CarouselItem>
              <CarouselItem className="md:basis-1/2 lg:basis-1/3">
                <ContributionHeatmapCard contributions={data.contributions} />
              </CarouselItem>
              {data.pinnedRepos.map((repo) => (
                <CarouselItem key={repo.id} className="md:basis-1/2 lg:basis-1/3">
                  <PinnedRepoCard repo={repo} />
                </CarouselItem>
              ))}
              <CarouselItem className="md:basis-1/2 lg:basis-1/3">
                <TopLanguagesCard topLanguages={data.topLanguages} />
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
