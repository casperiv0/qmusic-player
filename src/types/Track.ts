import { Artist } from "./Artist";

export interface Track {
  played_at: string;
  slug: string;
  title: string;
  thumbnail: string;
  artist: Artist;
}
