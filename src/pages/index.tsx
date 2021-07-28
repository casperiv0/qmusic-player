import * as React from "react";
import { ChannelItem } from "../components/ChannelItem";
import { ChannelsGrid } from "../components/ChannelsGrid";
import { NowPlaying } from "../components/NowPlaying";
import { useMusic } from "../lib/useMusic";

const Page = () => {
  const { currentChannel, nowPlaying, channels, state, playNewChannel, setVolume } = useMusic();

  if (state === "loading") {
    return <p>Loading...</p>;
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

export default Page;
