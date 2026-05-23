import { FaLinkedin } from 'react-icons/fa';
import SectionWrapper from '../SectionWrapper';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import LinkedInProfileCard from '../cards/LinkedInProfileCard';
import SkillsCard from '../cards/SkillsCard';
import ExperienceCard from '../cards/ExperienceCard';
import RecentPostsCard from '../cards/RecentPostsCard';
import { SECTION_IDS } from '../../utils/constants';
import linkedInData from '../../data/linkedin.json';

export default function LinkedInSection() {
  return (
    <SectionWrapper
      id={SECTION_IDS.linkedin}
      title="LinkedIn"
      platformColor="#0A66C2"
      platformIcon={FaLinkedin}
    >
      <Carousel opts={{ align: "start" }} className="w-full">
        <CarouselContent>
          <CarouselItem className="md:basis-1/2 lg:basis-1/3">
            <LinkedInProfileCard
              name={linkedInData.name}
              title={linkedInData.title}
              college={linkedInData.college}
              location={linkedInData.location}
              profileUrl={linkedInData.profileUrl}
              avatarUrl={linkedInData.avatarUrl}
            />
          </CarouselItem>
          <CarouselItem className="md:basis-1/2 lg:basis-1/3">
            <SkillsCard skills={linkedInData.skills} />
          </CarouselItem>
          <CarouselItem className="md:basis-1/2 lg:basis-1/3">
            <ExperienceCard experience={linkedInData.experience} />
          </CarouselItem>
          <CarouselItem className="md:basis-1/2 lg:basis-1/3">
            <RecentPostsCard posts={linkedInData.recentPosts} />
          </CarouselItem>
        </CarouselContent>
        <div className="hidden md:block">
          <CarouselPrevious />
          <CarouselNext />
        </div>
      </Carousel>
    </SectionWrapper>
  );
}
