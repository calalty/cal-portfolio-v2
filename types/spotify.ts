export interface Spotify {
  id: string;
  name: string;
  images: Image[];
}

export interface Image {
  url: string;
  width: number;
  height: number;
}
