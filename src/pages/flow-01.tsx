import type { GetStaticProps, GetStaticPropsResult, NextPage } from "next";

import {
  getAmenities,
  getBannerCardBlocks,
  getBoat,
  getCardBlockGroup,
  getCruiseTypes,
  getImageContentBlock,
  getMultiImageContentBlock,
  getPageHeaderBlock,
  getPageSummeryBlock,
  getStats,
  getTextContentBlock,
} from "@cms/content-studio";

import { AccommodationAmenitiesSection } from "@layout/boat-page/accommodation-amenties-section";
import { BoatFeatures } from "@layout/boat-page/boat-features";
import { BoatStats } from "@layout/boat-page/boat-stats";
import { CruisesSection } from "@layout/boat-page/cruises-section";
import { GallerySection } from "@layout/boat-page/gallery-section";
import { VideoSection } from "@layout/boat-page/video-section";
import { CTASection } from "@layout/common/cta-section";
import { type ContentGroupType } from "@layout/common/groups/content-group";
import {
  ImageContentSection,
  type ImageContentSectionType,
} from "@layout/common/image-content-section";
import { MultiImageHorizontal } from "@layout/common/multi-image-content-horizontal";
import { MultiItemSection } from "@layout/common/multi-item-section";
import { NewsletterSection } from "@layout/common/newsletter-section";
import { OptionsGrid } from "@layout/common/options-grid";
import Page from "@layout/common/page";
import { PageHeader, type PageHeaderType } from "@layout/common/page-header";
import {
  PageSummerySection,
  type PageSummerySectionType,
} from "@layout/common/page-summery-section";
import { StatsGrid } from "@layout/common/stats-grid";
import { TabsPane } from "@layout/common/tabs-pane";

import type { BannerCardType } from "@components/banner-card";
import { Button } from "@components/button";
import { CardBlock, type CardBlockType } from "@components/card-block";

interface Props {
  header: PageHeaderType;
  pageSummery: PageSummerySectionType;
  boatStats: Boat;
  activitiesIntro: PageSummerySectionType;
  eventsIntro: PageSummerySectionType;
  diningIntro: PageSummerySectionType;
  accommodationIntro: PageSummerySectionType;
  eventTypes: BannerCardType[];
  roomAmenities: Amenity[];
  cruiseTypes: CruiseType[];
  roomReservationsSection: MultiImageContentBlockType;
  wholeBoatReservationsSection: ImageContentSectionType;
  diningOnBoatsSection: ImageContentSectionType;
  diningOptions: Stat[];
  activitiesTypesSection: ContentGroupType;
  activityTypes: CardBlockType[];
}

const FlowOne: NextPage<Props> = ({
  header,
  pageSummery,
  boatStats,
  eventsIntro,
  diningIntro,
  accommodationIntro,
  activitiesIntro,
  eventTypes,
  cruiseTypes,
  roomAmenities,
  roomReservationsSection,
  wholeBoatReservationsSection,
  diningOnBoatsSection,
  diningOptions,
  activitiesTypesSection,
  activityTypes,
}: Props): JSX.Element => {
  return (
    <Page title="Flow 01">
      <PageHeader {...header} />
      {/* Booking Widget */}
      <PageSummerySection {...pageSummery} />
      <BoatStats
        length={boatStats.length}
        cabins={boatStats.noOfCabins}
        crew={boatStats.noOfCabins}
        guestsEvents={boatStats.guestsEvents}
        guestsStay={boatStats.guestsStay}
      />
      <BoatFeatures
        coverImage={boatStats.coverImage}
        features={boatStats.features}
      />
      <CruisesSection cruises={cruiseTypes} />

      <TabsPane
        tabs={[
          {
            value: "Events",
            content: (
              <>
                <PageSummerySection {...eventsIntro} />
                <OptionsGrid options={eventTypes} />
              </>
            ),
          },
          {
            value: "Accommodations",
            content: (
              <>
                <PageSummerySection {...accommodationIntro} />
                <AccommodationAmenitiesSection amenities={roomAmenities} />
                <MultiImageHorizontal
                  {...roomReservationsSection}
                  extraNode={
                    <div className="flex flex-col items-start justify-start gap-y-10 lg:mt-6">
                      <div className="md:gap-x- flex flex-col items-start justify-start gap-y-6 md:flex-row md:items-center md:gap-x-12">
                        <div className="flex items-center justify-start gap-x-3">
                          <svg className="h-12 w-12 fill-black-900">
                            <use xlinkHref="/assets/svg/sprites.svg#icon-view" />
                          </svg>
                          <div className="flex flex-col items-start justify-center">
                            <span className="text-left font-sans text-[10px] font-bold uppercase tracking-wider text-black-700 lg:text-xs">
                              Breathtaking
                            </span>
                            <p className="text-left font-sans  text-2xl font-bold text-black-900 lg:text-3xl">
                              Lake View
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center justify-start gap-x-3">
                          <svg className="h-12 w-12 fill-black-900">
                            <use xlinkHref="/assets/svg/sprites.svg#icon-room-size" />
                          </svg>
                          <div className="flex flex-col items-start justify-center">
                            <span className="text-left font-sans text-[10px] font-bold uppercase tracking-wider text-black-700 lg:text-xs">
                              Specious Rooms
                            </span>
                            <p className="text-left font-sans  text-2xl font-bold text-black-900 lg:text-3xl">
                              305 Sq. Ft.
                            </p>
                          </div>
                        </div>
                      </div>
                      <Button
                        type="route"
                        route="/reservations?type=cruise&cruise=overnight-stay"
                        withArrow
                      >
                        Reserve Now
                      </Button>
                    </div>
                  }
                />
                <ImageContentSection
                  {...wholeBoatReservationsSection}
                  button={{
                    children: "Talk to Sales",
                    withArrow: true,
                    type: "route",
                    route: "/reservations?type=cruises&cruise=overnight-stay",
                  }}
                />
              </>
            ),
          },
          {
            value: "Activities",
            content: (
              <>
                <PageSummerySection {...activitiesIntro} />
                <MultiItemSection {...activitiesTypesSection}>
                  {activityTypes.map((facility, index) => (
                    <CardBlock {...facility} key={`facility-${index}`} />
                  ))}
                </MultiItemSection>
              </>
            ),
          },
          {
            value: "Dining",
            content: (
              <>
                <PageSummerySection {...diningIntro} />
                <ImageContentSection {...diningOnBoatsSection} />
                <StatsGrid stats={diningOptions} />
              </>
            ),
          },
        ]}
      />

      {boatStats.video && <VideoSection video={boatStats.video} />}
      <GallerySection images={boatStats.gallery} />

      <CTASection
        heading="Ready to set sail?"
        subHeading="Reserve your cruise today!"
        button={{
          children: "Reservations",
          type: "route",
          route: "/reserve",
          intent: "primary",
        }}
      />
      <NewsletterSection />
    </Page>
  );
};

const getStaticProps: GetStaticProps = async (): Promise<
  GetStaticPropsResult<Props>
> => {
  const header = await getPageHeaderBlock("1AypTwu98NQpEMvR5SvWRC");
  const pageSummery = await getPageSummeryBlock("2HMuY5gy1jlaxrCM1zPYFT");
  const boatStats = await getBoat("1VSYkSWkBlCTYCgWJ1Uf2D");
  const cruiseTypes = await getCruiseTypes();

  const eventsIntro = await getPageSummeryBlock("76ESyIGEPU40V57T7MeHYw");
  const accommodationIntro = await getPageSummeryBlock(
    "6iU1v8Knz1Nj2OzSxhLaXY"
  );
  const diningIntro = await getPageSummeryBlock("3y14hE7lKDOWclQbLEGgyD");
  const activitiesIntro = await getPageSummeryBlock("6hCw1Nn2Xv53i6BuZGHF0g");
  const eventTypes = await getBannerCardBlocks("event-types");
  const roomAmenities = await getAmenities();
  const roomReservationsSection = await getMultiImageContentBlock(
    "42JacW2uUz3yzm5IigC5zL"
  );
  const wholeBoatReservationsSection = await getImageContentBlock(
    "7aMH2kvF0qY1iHlOUJY1iu"
  );

  const diningOnBoatsSection = await getImageContentBlock(
    "72uyt5q1K3xzus2kfpinve"
  );
  const diningOptions = await getStats("dining-options", 3);

  const activitiesTypesSection = await getTextContentBlock(
    "78an3ACQgTOxV33vHMW0zY"
  );
  const activityTypes = await getCardBlockGroup("activity-types");

  return {
    props: {
      header,
      pageSummery,
      boatStats,
      eventsIntro,
      cruiseTypes,
      activitiesIntro,
      accommodationIntro,
      diningIntro,
      eventTypes,
      roomAmenities,
      roomReservationsSection,
      wholeBoatReservationsSection,
      diningOnBoatsSection,
      diningOptions,
      activitiesTypesSection,
      activityTypes,
    },
  };
};

export { getStaticProps };
export default FlowOne;
