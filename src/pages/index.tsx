import * as React from "react";
import { ChannelItem } from "../components/ChannelItem";
import { ChannelsGrid } from "../components/ChannelsGrid";
import { Loader } from "../components/Loader";
import { NowPlaying } from "../components/NowPlaying";
import { useMusic } from "../lib/useMusic";

const PlayerPage = () => {
  const { currentChannel, nowPlaying, channels, state, playNewChannel, setVolume } = useMusic();

  if (state === "loading") {
    return <Loader />;
  }

  return (
    <div>
      <NowPlaying channel={currentChannel} setVolume={setVolume} track={nowPlaying} />

      <ChannelsGrid>
        {channels.map((channel) => (
          <ChannelItem key={channel.id} channel={channel} playNewChannel={playNewChannel} />
        ))}
      </ChannelsGrid>
    </div>
  );
};

export default PlayerPage;
