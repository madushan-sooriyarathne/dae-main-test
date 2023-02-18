import { PrimaryHeading } from "@components/headings/primary-heading";
import { SecondaryHeading } from "@components/headings/secondary-heading";
import { ImageComponent } from "@components/image-component";
import { cn } from "@lib/clsx";
import { useCallback, useEffect, useState } from "react";
import ReactPlayer from "react-player/file";

interface Props {
  video: Video;
}

const VideoSection: React.FC<Props> = ({ video }): JSX.Element => {
  const [playing, setPlaying] = useState<boolean>(false);
  const [interacted, setInteracted] = useState<boolean>(false);
  const [componentLoaded, setComponentLoaded] = useState<boolean>(false);
  const [muted, setMuted] = useState<boolean>(true);

  useEffect(() => {
    setComponentLoaded(true);
  }, []);

  const togglePlayback = useCallback(() => {
    setPlaying((prev) => !prev);
    setInteracted(true);
  }, []);

  const toggleMute = useCallback(() => {
    setMuted((prev) => !prev);
    setInteracted(true);
  }, []);

  return (
    <section className="md:main-grid-columns isolate grid  grid-cols-1 ">
      <div className="relative aspect-[4/3] overflow-hidden rounded md:col-content md:aspect-video">
        <div
          className={cn(
            "group flex h-full w-full flex-col items-center justify-center gap-y-4 mlg:gap-y-9 xl:gap-y-16",
            { "bg-black/70": !playing }
          )}
        >
          {video.title && (
            <div
              className={cn(
                "opacity-100 transition-opacity duration-200 ease-in-out",
                { "opacity-0": interacted }
              )}
            >
              <SecondaryHeading alignment="center" intent="white">
                {video.title}
              </SecondaryHeading>
            </div>
          )}
          <div className={cn("flex flex-col items-center justify-end gap-y-3")}>
            <button
              id="main-playback-btn"
              type="button"
              role="button"
              aria-label="video play/pause button"
              onClick={togglePlayback}
              className={cn(
                "flex h-16 w-16 items-center justify-center rounded-full bg-white transition-opacity duration-200 ease-in-out",
                {
                  "opacity-20 hover:!opacity-100 group-hover:opacity-50":
                    playing,
                }
              )}
            >
              {!playing ? (
                <svg className="h-6 w-6 fill-primary">
                  <use xlinkHref="/assets/svg/sprites.svg#icon-play" />
                </svg>
              ) : (
                <svg className="h-6 w-6 fill-primary">
                  <use xlinkHref="/assets/svg/sprites.svg#icon-pause" />
                </svg>
              )}
            </button>
            {interacted && (
              <button
                onClick={toggleMute}
                className={cn(
                  "flex h-10 w-10 items-center justify-center rounded-md bg-white transition-opacity duration-200 ease-in-out",
                  {
                    "opacity-0 hover:!opacity-100 group-hover:opacity-50":
                      playing,
                  }
                )}
              >
                {!muted ? (
                  <svg className="h-4 w-4 fill-black">
                    <use xlinkHref="/assets/svg/sprites.svg#icon-mute" />
                  </svg>
                ) : (
                  <svg className="h-4 w-4 fill-black">
                    <use xlinkHref="/assets/svg/sprites.svg#icon-unmute" />
                  </svg>
                )}
              </button>
            )}
          </div>
        </div>
        {componentLoaded && (
          <div className="absolute inset-0 -z-10  [&_video]:object-fill">
            <ReactPlayer
              url={video.files[0]?.src}
              playing={playing}
              onPlay={() => setPlaying(true)}
              onPause={() => setPlaying(false)}
              muted={muted}
              volume={1}
              width="100%"
              height="100%"
              loop
            />
          </div>
        )}
      </div>
    </section>
  );
};

export { VideoSection };
