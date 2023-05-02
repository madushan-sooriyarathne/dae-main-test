import ReactPlayer from "react-player/youtube";

interface Props {
  video: YoutubeVideoType;
}

const YoutubePlayer: React.FC<Props> = ({ video }: Props): JSX.Element => {
  return (
    <div className="relative aspect-[4/3] overflow-hidden rounded md:col-content md:aspect-video">
      <ReactPlayer
        muted={false}
        url={video.src}
        width="100%"
        height="100%"
        volume={1}
        controls
      />
    </div>
  );
};

export { YoutubePlayer };
