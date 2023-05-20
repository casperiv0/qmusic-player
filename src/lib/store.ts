import { create } from "zustand";
import { Channel } from "types/Channel";
import { Track } from "types/Track";

export type PlayStates = "idle" | "loading" | "error";

interface Store {
  state: PlayStates;
  setState(state: PlayStates): void;

  isPlaying: boolean;
  setIsPlaying(v: boolean): void;

  currentChannel: Channel | null;
  setCurrentChannel(channel: Channel | null): void;

  nowPlaying: Track | null;
  setNowPlaying(track: Track | null): void;

  nowPlayingUrl: string | null;
  setNowPlayingUrl(url: string | null): void;

  upNext: Track | null;
  setUpNext(track: Track | null): void;

  channels: Channel[];
  setChannels(channels: Channel[]): void;
}

export const useStore = create<Store>((set) => ({
  state: "idle",
  setState: (state) => set({ state }),

  isPlaying: false,
  setIsPlaying: (v) => set({ isPlaying: v }),

  currentChannel: null,
  setCurrentChannel: (channel) => set({ currentChannel: channel }),

  nowPlaying: null,
  setNowPlaying: (track) => set({ nowPlaying: track }),

  nowPlayingUrl: null,
  setNowPlayingUrl: (url) => set({ nowPlayingUrl: url }),

  upNext: null,
  setUpNext: (track) => set({ upNext: track }),

  channels: [],
  setChannels: (channels) => set({ channels }),
}));

export { shallow } from "zustand/shallow";
