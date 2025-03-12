import { RefinedRedditPost } from "@/app/api/reddit/[subreddit]/route";
import { AxiosApiDataResponse } from "@/types/axios";
import { httpClient } from "./http-client";
import { reddit } from "@/constants/api-urls/reddit";

export const getSubreddit = async (
  subreddit: string
): Promise<AxiosApiDataResponse<RefinedRedditPost[]>> => {
  const response = await httpClient.get<{ subreddit: RefinedRedditPost[] }>(
    reddit.getSubreddit(subreddit)
  );
  return {
    ...response,
    data: response.data,
  };
};
