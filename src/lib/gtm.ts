export const gtmTrackPageView = (url: string) => {
  window.dataLayer.push({
    event: "pageView",
    page: url,
  });
};

export const triggerGTMEvent = (
  eventName: string,
  rest: { [key: string]: any }
) => {
  window.dataLayer.push({
    event: eventName,
    ...rest,
  });
};
