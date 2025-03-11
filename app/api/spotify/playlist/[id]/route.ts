import { httpClient } from "@/lib/http-client";
import axios from "axios";
import { NextResponse } from "next/server";

type ExternalUrls = {
  spotify: string;
};

type Image = {
  height: number;
  url: string;
  width: number;
};

type User = {
  display_name: string;
  external_urls: ExternalUrls;
  href: string;
  id: string;
  type: string;
  uri: string;
};

type Followers = {
  href: string | null;
  total: number;
};

type Artist = {
  external_urls: ExternalUrls;
  href: string;
  id: string;
  name: string;
  type: string;
  uri: string;
};

type Album = {
  available_markets: string[];
  type: string;
  album_type: string;
  href: string;
  id: string;
  images: Image[];
  name: string;
  release_date: string;
  release_date_precision: string;
  uri: string;
  artists: Artist[];
  external_urls: ExternalUrls;
  total_tracks: number;
};

type Track = {
  preview_url: string | null;
  available_markets: string[];
  explicit: boolean;
  type: string;
  episode: boolean;
  track: boolean;
  album: Album;
  artists: Artist[];
  disc_number: number;
  track_number: number;
  duration_ms: number;
  external_ids: {
    isrc: string;
  };
  external_urls: ExternalUrls;
  href: string;
  id: string;
  name: string;
  popularity: number;
  uri: string;
  is_local: boolean;
};

type VideoThumbnail = {
  url: string | null;
};

type PlaylistItem = {
  added_at: string;
  added_by: User;
  is_local: boolean;
  primary_color: string | null;
  track: Track;
  video_thumbnail: VideoThumbnail;
};

type Tracks = {
  href: string;
  items: PlaylistItem[];
  limit: number;
  next: string | null;
  offset: number;
  previous: string | null;
  total: number;
};

type SpotifyPlaylist = {
  collaborative: boolean;
  description: string;
  external_urls: ExternalUrls;
  followers: Followers;
  href: string;
  id: string;
  images: Image[];
  name: string;
  owner: User;
  primary_color: string | null;
  public: boolean;
  snapshot_id: string;
  tracks: Tracks;
  type: string;
  uri: string;
};

export type RefinedPlaylist = {
  id: string;
  name?: string;
  images?: Image[];
};

let cachedToken: { value: string; expiresAt: number } | null = null;

const getSpotifyAccessToken = async (): Promise<string> => {
  if (cachedToken && cachedToken.expiresAt > Date.now()) {
    return cachedToken.value;
  }

  const auth = btoa(`${process.env.SPOTIFY_ID}:${process.env.SPOTIFY_SECRET}`);
  const body = new URLSearchParams({ grant_type: "client_credentials" });

  try {
    const response = await axios.post(
      "https://accounts.spotify.com/api/token",
      body,
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Authorization: `Basic ${auth}`,
        },
      }
    );
    cachedToken = {
      value: response.data.access_token,
      expiresAt: Date.now() + response.data.expires_in * 1000,
    };
    return cachedToken.value;
  } catch (error) {
    throw error;
  }
};

export async function GET(
  _request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const token = await getSpotifyAccessToken();
    const playlistId = params.id;

    const { data, isError } = await httpClient.get<SpotifyPlaylist>(
      `/playlists/${playlistId}`,
      {},
      "https://api.spotify.com/v1",
      `Bearer ${token}`
    );

    if (isError) {
      return NextResponse.json(
        { error: "Invalid playlist ID" },
        { status: 404 }
      );
    }

    const playlist: RefinedPlaylist = {
      id: data?.id ?? "",
      name: data?.name,
      images: data?.tracks.items.map((item) => item.track.album.images[0]),
    };

    return NextResponse.json({ playlist });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json(
      { error: `Internal server error: ${message}` },
      { status: 500 }
    );
  }
}
