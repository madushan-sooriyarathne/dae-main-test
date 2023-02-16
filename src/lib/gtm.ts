/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
export const gtmTrackPageView = (url: string) => {
  window.dataLayer.push({
    event: "pageView",
    page: url,
  });
};

export const triggerGTMEvent = (
  eventName: string,
  rest: { [key: string]: unknown }
) => {
  window.dataLayer.push({
    event: eventName,
    ...rest,
  });
};
