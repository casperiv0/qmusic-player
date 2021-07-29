import * as React from "react";
import Head from "next/head";
import { ChannelItem } from "../components/ChannelItem";
import { ChannelsGrid } from "../components/ChannelsGrid";
import { Loader } from "../components/Loader";
import { NowPlaying } from "../components/NowPlaying";
import { useMusic } from "../lib/useMusic";
import { Footer } from "../components/Footer/Footer";
import { MediaControls } from "../components/MediaControls";

const PlayerPage = () => {
  const music = useMusic();

  if (music.state === "loading") {
    return <Loader />;
  }

  return (
    <>
      <Head>
        <title>Q-Music Player</title>
      </Head>

      <MediaControls
        channel={music.currentChannel}
        channels={music.channels}
        isPlaying={music.isPlaying}
        playNewChannel={music.playNewChannel}
        pause={music.pause}
        play={music.play}
        setVolume={music.setVolume}
      />

      <NowPlaying
        isPlaying={music.isPlaying}
        upNext={music.upNext}
        channel={music.currentChannel}
        track={music.nowPlaying}
      />

      <ChannelsGrid>
        {music.channels.map((channel) => (
          <ChannelItem key={channel.id} channel={channel} playNewChannel={music.playNewChannel} />
        ))}
      </ChannelsGrid>

      <Footer />
    </>
  );
};

export default PlayerPage;
