import * as React from "react";
import axios from "axios";
import { Channel, ChannelStream } from "../types/Channel";
import { useRouter } from "next/dist/client/router";
import { useStore } from "./store";

const API_URL = "https://api.qmusic.be/2.4/app/channels";

function makeNowPlayingUrl(apiUrl: string) {
  return `https://${apiUrl}/2.4/tracks/plays?limit=1&next=true`;
}

export function useMusic() {
  const router = useRouter();
  const _element = React.useRef<HTMLAudioElement>(null);

  const store = useStore();

  const parseParams = React.useCallback(() => {
    if (router.query.channel && store.state === "idle") {
      const channel = store.channels.find((v) => v.data.id === router.query.channel);

      if (channel) {
        playNewChannel(channel);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [store.state, store.channels, router.query.channel]);

  React.useEffect(() => {
    parseParams();
  }, [parseParams]);

  React.useEffect(() => {
    init();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /**
   * refetch now playing every 7 seconds.
   */
  React.useEffect(() => {
    if (!store.currentChannel) return;

    const interval = setInterval(() => {
      fetchNowPlaying();
    }, 7_000);

    return () => clearInterval(interval);
  }, [store.currentChannel, fetchNowPlaying]);

  async function init() {
    store.setState("loading");

    createElement();
    await fetchChannelsData();
    await fetchNowPlaying();

    store.setState("idle");
  }

  async function fetchChannelsData() {
    try {
      const { data } = await axios.get<any>(API_URL);

      const channels = data.data as Channel[];
      store.setChannels(channels);

      const [channel] = channels;
      if (!data || !channel) {
        throw new Error("No data received");
      }

      store.setNowPlayingUrl(makeNowPlayingUrl(channel.data.api_url));

      const [stream] = channel.data.streams.mp3;

      setStreamToEl(stream!);
    } catch (e) {
      store.setNowPlaying(null);
      store.setCurrentChannel(null);

      store.setState("error");
      console.error(e);
    }
  }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  async function fetchNowPlaying(url = store.nowPlayingUrl) {
    try {
      if (!url) return;

      const { data } = await axios
        .get<any>(url, {
          params: {
            limit: 1,
            next: true,
          },
        })
        .catch(() => ({ data: null }));

      const [track] = data?.played_tracks ?? [];

      if (!track) {
        store.setState("idle");
        return;
      }

      store.setNowPlaying(track);

      if (track.next) {
        store.setUpNext(track.next);
      } else {
        store.setUpNext(null);
      }

      store.setState("idle");
    } catch (err) {
      store.setNowPlaying(null);
      store.setCurrentChannel(null);

      store.setState("error");
    }
  }

  function createElement() {
    if (_element.current !== null) return;
    const element = document.createElement("audio");
    document.body.appendChild(element);

    element.volume = 0.3;
    element.id = (Math.random() * 2000).toFixed(0);

    // @ts-expect-error ignore
    _element.current = element;
  }

  function setStreamToEl(stream: ChannelStream) {
    if (!_element.current) {
      return console.error("There was no element");
    }

    store.setIsPlaying(true);
    _element.current.src = `${stream.source}?cb=${(Math.random() * 2000).toFixed(0)}`;
  }

  async function play() {
    if (!_element.current) return false;

    store.setIsPlaying(true);

    try {
      await _element.current.play();
      return true;
    } catch {
      return false;
    }
  }

  function pause() {
    store.setIsPlaying(false);
    return _element.current?.pause();
  }

  async function playNewChannel(channel: Channel) {
    const [stream] = channel.data.streams.mp3;

    const url = makeNowPlayingUrl(channel.data.api_url);
    store.setNowPlayingUrl(url);

    setStreamToEl(stream!);

    router.replace({
      query: {
        channel: channel.data.id,
      },
    });

    const success = await play();

    if (success) {
      fetchNowPlaying(url);
      store.setCurrentChannel(channel);
    }
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

  return {
    pause,
    play,
    playNewChannel,
    setVolume,
  };
}
