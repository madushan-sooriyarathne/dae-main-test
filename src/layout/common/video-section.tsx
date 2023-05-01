import { VideoPlayer } from "@components/video-player";
import { YoutubePlayer } from "@components/youtube-player";

interface Props {
  video: VideoType;
}

const VideoSection: React.FC<Props> = ({ video }): JSX.Element => {
  return (
    <section className="md:main-grid-columns isolate grid  grid-cols-1 ">
      {video.type === "Youtube" ? (
        <YoutubePlayer video={video} />
      ) : (
        <VideoPlayer video={video} />
      )}
    </section>
  );
};

export { VideoSection };
