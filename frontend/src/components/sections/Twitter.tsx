import { FaXTwitter } from 'react-icons/fa6';
import SectionWrapper from '../SectionWrapper';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import TwitterProfileCard from '../cards/TwitterProfileCard';
import TweetCard from '../cards/TweetCard';
import TwitterSummaryCard from '../cards/TwitterSummaryCard';
import { SECTION_IDS } from '../../utils/constants';
import twitterData from '../../data/twitter.json';

export default function TwitterSection() {
  return (
    <SectionWrapper
      id={SECTION_IDS.twitter}
      title="Twitter / X"
      platformColor="#1DA1F2"
      platformIcon={FaXTwitter}
    >
      <Carousel opts={{ align: "start" }} className="w-full">
        <CarouselContent>
          <CarouselItem className="md:basis-1/2 lg:basis-1/3">
            <TwitterProfileCard
              handle={twitterData.handle}
              displayName={twitterData.displayName}
              bio={twitterData.bio}
              followers={twitterData.followers}
              following={twitterData.following}
              avatarUrl={twitterData.avatarUrl}
            />
          </CarouselItem>
          {twitterData.recentTweets.map((tweet, i) => (
            <CarouselItem key={i} className="md:basis-1/2 lg:basis-1/3">
              <TweetCard
                text={tweet.text}
                date={tweet.date}
                likes={tweet.likes}
                retweets={tweet.retweets}
                url={tweet.url}
                index={i}
              />
            </CarouselItem>
          ))}
          <CarouselItem className="md:basis-1/2 lg:basis-1/3">
            <TwitterSummaryCard
              totalTweets={twitterData.totalTweets}
              joinedDate={twitterData.joinedDate}
              profileUrl={twitterData.profileUrl}
            />
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
