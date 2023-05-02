import { useEffect, useState } from "react";

import { VideoPlayer } from "@components/video-player";
import { YoutubePlayer } from "@components/youtube-player";

interface Props {
  video: VideoType;
}

const VideoSection: React.FC<Props> = ({ video }): JSX.Element => {
  const [isClient, setIsClient] = useState<boolean>(false);

  useEffect(() => {
    if (typeof window === undefined) {
      setIsClient(false);
    } else {
      setIsClient(true);
    }
  }, []);

  if (isClient) {
    return (
      <section className="md:main-grid-columns isolate grid  grid-cols-1 ">
        {video.type === "Youtube" ? (
          <YoutubePlayer video={video} />
        ) : (
          <VideoPlayer video={video} />
        )}
      </section>
    );
  } else {
    return <></>;
  }
};

export { VideoSection };
