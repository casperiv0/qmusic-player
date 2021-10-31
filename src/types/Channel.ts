export interface Channel {
  id: number;
  type: string;
  color: ChannelColor;
  data: ChannelData;
}

export interface ChannelData {
  id: string;
  background_image: string;
  name: string;
  streams: Record<IChannelStreams, ChannelStream[]>;
  logo: ChannelLogo;
  api_url: string;
  station_id: string;
}

export type IChannelStreams =
  | "aac"
  | "mp3"
  | "video"
  | "hls"
  | "mobile"
  | "android"
  | "iphone"
  | "radioplayerId";

export interface ChannelStream {
  source: string;
  extra: unknown | null;
}

export interface ChannelLogo {
  app_card: string;
  app_square: string;
  active_iphone_url: string;
}

export interface ChannelColor {
  background: string;
  extra: string;
  foreground: string;
}
