import ReactPlayer from "react-player/youtube";

interface Props {
  video: YoutubeVideoType;
}

const YoutubePlayer: React.FC<Props> = ({ video }: Props): JSX.Element => {
  return (
    <div className="w-full">
      <ReactPlayer muted={false} url={video.src} volume={1} controls />
    </div>
  );
};

export { YoutubePlayer };
