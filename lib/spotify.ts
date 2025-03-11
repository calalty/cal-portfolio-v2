import { RefinedPlaylist } from "@/app/api/spotify/playlist/[id]/route";
import { AxiosApiDataResponse } from "@/types/axios";
import { httpClient } from "./http-client";
import { spotify } from "@/constants/api-urls/spotify";

export const getPlaylist = async (
  playlistId: string
): Promise<AxiosApiDataResponse<RefinedPlaylist>> => {
  const response = await httpClient.get<{ playlist: RefinedPlaylist }>(
    spotify.getPlaylist(playlistId),
    undefined,
    "http://localhost:3000"
  );
  return {
    ...response,
    data: response.data!.playlist,
  };
};
