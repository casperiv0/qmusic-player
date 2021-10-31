import * as React from "react";
import Head from "next/head";
import { ChannelItem } from "components/ChannelItem";
import { ChannelsGrid } from "components/ChannelsGrid";
import { Loader } from "components/Loader";
import { NowPlaying } from "components/NowPlaying";
import { fetchChannels, useMusic } from "lib/useMusic";
import { Footer } from "components/Footer/Footer";
import { MediaControls } from "components/MediaControls";
import { useStore } from "lib/store";
import { Error } from "components/Error/Error";
import { SocketProvider } from "lib/socket";
import { GetServerSideProps } from "next";
import { Channel } from "types/Channel";

export interface AppProps {
  channels: Channel[];
  channel: Channel | null;
}

export default function PlayerPage({ channels: data, channel }: AppProps) {
  const music = useMusic({ channels: data, channel });
  const [state, channels] = useStore((s) => [s.state, s.channels]);

  if (state === "loading") {
    return <Loader />;
  }

  if (state === "error") {
    return <Error />;
  }

  return (
    <>
      <Head>
        <title>Q-Music Player</title>
      </Head>
      <MediaControls
        playNewChannel={music.playNewChannel}
        pause={music.pause}
        play={music.play}
        setVolume={music.setVolume}
      />
      <NowPlaying />
      <ChannelsGrid>
        {channels.map((channel) => (
          <ChannelItem key={channel.id} channel={channel} playNewChannel={music.playNewChannel} />
        ))}
      </ChannelsGrid>
      <Footer />

      <SocketProvider />
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const { channels } = await fetchChannels();

  return {
    props: {
      channels,
      channel: channels.find((v) => v.data.station_id === String(query.channel)) ?? null,
    },
  };
};
