import * as React from "react";
import Head from "next/head";
import { ChannelItem } from "../components/ChannelItem";
import { ChannelsGrid } from "../components/ChannelsGrid";
import { Loader } from "../components/Loader";
import { NowPlaying } from "../components/NowPlaying";
import { useMusic } from "../lib/useMusic";

const PlayerPage = () => {
  const { upNext, currentChannel, nowPlaying, channels, state, playNewChannel, setVolume } =
    useMusic();

  if (state === "loading") {
    return <Loader />;
  }

  return (
    <div>
      <Head>
        <title>Q-Music Player</title>
      </Head>

      <NowPlaying
        upNext={upNext}
        channel={currentChannel}
        track={nowPlaying}
        setVolume={setVolume}
      />

      <ChannelsGrid>
        {channels.map((channel) => (
          <ChannelItem key={channel.id} channel={channel} playNewChannel={playNewChannel} />
        ))}
      </ChannelsGrid>
    </div>
  );
};

export default PlayerPage;
