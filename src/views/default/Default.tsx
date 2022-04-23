import { ChannelItem } from "components/ChannelItem";
import { ChannelsGrid } from "components/ChannelsGrid";
import { NowPlaying } from "components/NowPlaying";
import { useMusic } from "lib/useMusic";
import { Footer } from "components/Footer/Footer";
import { MediaControls } from "components/MediaControls";
import { useStore } from "lib/store";
import { AppProps } from "src/pages";

export function DefaultView({ channels: data, channel }: AppProps) {
  const music = useMusic({ channels: data, channel });
  const [channels] = useStore((s) => [s.channels]);

  return (
    <>
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
    </>
  );
}
