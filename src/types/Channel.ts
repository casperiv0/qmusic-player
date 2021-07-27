export interface Channel {
  id: number;
  type: string;

  data: ChannelData;
}

export interface ChannelData {
  id: string;
  background_image: string;
  name: string;
  streams: Record<IChannelStreams, ChannelStream[]>;
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
