import { httpClient } from "@/lib/http-client";
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
  name?: string;
  images?: Image[];
};

export async function GET(
  _request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const awaitedParams = await params;
    const response = await httpClient.get<SpotifyPlaylist>(
      `/playlists/${awaitedParams.id}`
    );

    if (response.isError) {
      return NextResponse.json(
        { error: "Failed to fetch playlist" },
        { status: 500 }
      );
    }

    const playlist: RefinedPlaylist = {
      name: response.data?.name,
      images: response.data?.tracks.items[0].track.album.images,
    };

    return NextResponse.json({ playlist });
  } catch (error) {
    return NextResponse.json(
      { error: `Internal server error. ${error}` },
      { status: 500 }
    );
  }
}
