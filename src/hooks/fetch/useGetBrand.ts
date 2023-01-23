import { getBrandData } from "@cms/content-studio";
import { useQuery } from "@tanstack/react-query";

export const useGetBrand = () => {
  return useQuery(["brand"], async () => getBrandData());
};
