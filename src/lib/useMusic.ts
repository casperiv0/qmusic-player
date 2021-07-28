import * as React from "react";
import axios from "axios";
import { Channel, ChannelStream } from "../types/Channel";
import { Track } from "../types/Track";

type States = "idle" | "loading" | "error";
const API_URL = "https://api.qmusic.be/2.4/app/channels";

function makeNowPlayingUrl(apiUrl: string) {
  return `https://${apiUrl}/2.4/tracks/plays?limit=1&next=true`;
}

export function useMusic() {
  const _element = React.useRef<HTMLAudioElement>(null);

  const [state, setState] = React.useState<States>("idle");

  const [currentChannel, setCurrentChannel] = React.useState<Channel | null>(null);

  const [nowPlaying, setNowPlaying] = React.useState<Track | null>(null);
  const [nowPlayingUrl, setNowPlayingUrl] = React.useState<string | null>(null);

  const [channels, setChannels] = React.useState<Channel[]>([]);

  React.useEffect(() => {
    init();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /**
   * refetch now playing every 7 seconds.
   */
  React.useEffect(() => {
    if (!currentChannel) return;

    const interval = setInterval(() => {
      fetchNowPlaying();
    }, 7_000);

    return () => clearInterval(interval);
  }, [currentChannel, fetchNowPlaying]);

  async function init() {
    setState("loading");

    createElement();
    await fetchChannelsData();
    await fetchNowPlaying();

    setState("idle");
  }

  async function fetchChannelsData() {
    try {
      const { data } = await axios.get(API_URL);

      const channels = data.data as Channel[];
      setChannels(channels);

      const [channel] = channels;
      if (!data || !channel) {
        throw new Error("No data received");
      }

      setNowPlayingUrl(makeNowPlayingUrl(channel.data.api_url));

      const [stream] = channel.data.streams.mp3;

      setStreamToEl(stream!);
    } catch (e) {
      console.error(e);
    }
  }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  async function fetchNowPlaying(url = nowPlayingUrl) {
    if (!url) return;

    const { data } = await axios.get(url, {
      params: {
        limit: 1,
        next: true,
      },
    });

    const [track] = data.played_tracks;

    setNowPlaying(track);
  }

  function createElement() {
    if (_element.current !== null) return;
    const element = document.createElement("audio");
    document.body.appendChild(element);

    element.volume = 0.3;

    // @ts-expect-error ignore
    _element.current = element;
  }

  function setStreamToEl(stream: ChannelStream) {
    if (!_element.current) {
      return console.error("There was no element");
    }

    _element.current.src = stream.source;
  }

  function play() {
    return _element.current?.play();
  }

  function playNewChannel(channel: Channel) {
    const [stream] = channel.data.streams.mp3;

    const url = makeNowPlayingUrl(channel.data.api_url);
    setNowPlayingUrl(url);
    fetchNowPlaying(url);
    setCurrentChannel(channel);

    setStreamToEl(stream!);

    play();
  }

  function setVolume(volume: number) {
    if (!_element.current) {
      return console.error("There was no element");
    }

    if (volume < 0 || volume > 1) {
      return console.error("Volume must be between 0 and 1");
    }

    _element.current.volume = volume;
  }

  return { currentChannel, nowPlaying, state, channels, play, playNewChannel, setVolume };
}
