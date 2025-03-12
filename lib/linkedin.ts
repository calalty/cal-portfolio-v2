import { AxiosApiDataResponse } from "@/types/axios";
import { Linkedin } from "@/types/linkedin";
import { httpClient } from "./http-client";
import { linkedin } from "@/constants/api-urls/linkedin";

export const getExperience = async (): Promise<
  AxiosApiDataResponse<Linkedin[]>
> => {
  const response = await httpClient.get<Linkedin[]>(
    linkedin.getExperience("positions.csv")
  );
  return {
    ...response,
    data: response.data,
  };
};
