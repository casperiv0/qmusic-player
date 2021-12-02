import Head from "next/head";
import Image from "next/image";
import { useStore } from "lib/store";
import styles from "./np.module.scss";
import { MediaControls } from "components/MediaControls";

export const NowPlayingFullscreen = ({ music }: { music: any }) => {
  const [isPlaying, nowPlaying, currentChannel] = useStore((s) => [
    s.isPlaying,
    s.nowPlaying,
    s.currentChannel,
  ]);

  if ((!nowPlaying && !currentChannel) || !currentChannel) {
    return (
      <p style={{ margin: "2rem 0" }} className={styles.nowPlaying}>
        Nothing is playing right now!
      </p>
    );
  }

  const npThumbnail = nowPlaying?.thumbnail
    ? `https://static1.qmusic.medialaancdn.be/web_list/itemlist_small_desktop/${nowPlaying.thumbnail}`
    : currentChannel.data.logo.app_square;

  return (
    <div className={styles.fsContainer}>
      <Head>
        <link rel="shortcut icon" href={npThumbnail} type="image/x-icon" />
        <title>
          {isPlaying ? "Playing" : "Paused. "} {nowPlaying ? nowPlaying.title : null} -{" "}
          {currentChannel.data.name}
        </title>
      </Head>

      <div className={styles.fsNowPlaying}>
        <Image
          src={npThumbnail}
          alt={nowPlaying?.title ?? currentChannel.data.name}
          draggable={false}
          objectFit="cover"
          height="350px"
          width="350px"
        />

        <div className={styles.fsTitleArea}>
          <h1>{nowPlaying?.title ?? currentChannel.data.name}</h1>
          <h2>{nowPlaying?.artist.name}</h2>
          <h2>{currentChannel.data.name}</h2>
        </div>

        <MediaControls
          playNewChannel={music.playNewChannel}
          pause={music.pause}
          play={music.play}
          setVolume={music.setVolume}
        />
      </div>
    </div>
  );
};
