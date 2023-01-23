import { useEffect, useRef, useState } from "react";
import { m } from "framer-motion";
import { ImageComponent } from "@components/image-component";
import { fadeIn } from "@styles/animations";
import { DisplayHeading } from "@components/headings/display-heading";
import { Button } from "@components/button";
import { Paragraph } from "@components/paragraph";

interface Props {
  video: Video;
  slides: Slide[];
}

const Hero: React.FC<Props> = ({ video }: Props): JSX.Element => {
  const videoPlayerRef = useRef<HTMLVideoElement>(null);
  const [videoLoaded, setVideoLoaded] = useState<boolean>(false);
  const [componentMounted, setComponentMounted] = useState<boolean>(false);

  useEffect(() => {
    setTimeout(() => setComponentMounted(true), 3000);
    return () => {
      setComponentMounted(false);
    };
  }, []);

  useEffect(() => {
    const playerRef = videoPlayerRef.current;

    if (playerRef) {
      playerRef.addEventListener("canplaythrough", () => {
        setVideoLoaded(true);
      });
    }

    return () => {
      if (playerRef) {
        playerRef.removeEventListener("canplaythrough", () => {
          setVideoLoaded(true);
        });
      }
    };
  }, [componentMounted]);

  return (
    <header className="mt:relative mt-18 grid w-full grid-cols-1 grid-rows-[min-content_min-content] bg-black lg:mt-0">
      <div className="relative isolate aspect-square w-full overflow-hidden sm:aspect-[4/3] md:aspect-video lg:aspect-auto lg:h-screen">
        {componentMounted && (
          <m.video
            className="h-full w-full object-cover"
            loop
            autoPlay
            muted
            poster={video.fallbackImage.src}
            ref={videoPlayerRef}
            variants={fadeIn}
            initial="initial"
            animate="animate"
            exit="exit"
          >
            {video.files.map((file) => (
              <source src={file.src} type={file.type} key={file.id} />
            ))}
          </m.video>
        )}

        {/* {!videoLoaded && <ImageComponent image={video.fallbackImage} />} */}
        <div className="absolute inset-0 z-[-1] aspect-square w-full sm:aspect-[4/3] md:aspect-video lg:aspect-[4/3]">
          <ImageComponent image={video.fallbackImage} sizes="100vw" />
        </div>
        <div className="absolute inset-0 z-[1] h-full w-full bg-[image:linear-gradient(0deg,_rgba(2,48,75,1)_0%,_rgba(2,48,75,0)_100%)]" />
      </div>

      <div className="bg-water px-4 pb-12 lg:absolute lg:inset-0 lg:flex lg:w-full lg:items-end lg:bg-transparent lg:px-12 3xl:px-16 3xl:py-16">
        <div className="mx-auto flex w-[min(100%,_37.5rem)] flex-col items-center justify-end gap-y-6 lg:mx-0 lg:mr-auto lg:items-start [&_p]:text-center lg:[&_p]:!text-left [&_h1]:text-center lg:[&_h1]:!text-left">
          <DisplayHeading intent="white" alignment="left">
            Your gateway to adventure on the lake
          </DisplayHeading>
          <Paragraph intent="white" alignment="left" titleParagraph>
            Experience the Joy of Water with Marina by D.A.E
          </Paragraph>
          <Button type="route" route="/reservation" solid mobileAdapt withArrow>
            Reserve Now
          </Button>
        </div>
      </div>
    </header>
  );
};

export { Hero };
