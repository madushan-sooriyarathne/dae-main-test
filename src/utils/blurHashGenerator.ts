import { getPlaiceholder } from "plaiceholder";

export const getBlurHash = async (url: string) => {
  const { base64 } = await getPlaiceholder(url);

  return base64;
};
