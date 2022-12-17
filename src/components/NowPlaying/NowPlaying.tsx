import Image from "next/image";
import Head from "next/head";
import styles from "./np.module.scss";
import { shallow, useStore } from "lib/store";
import { Track } from "types/Track";

export function NowPlaying() {
  const { isPlaying, currentChannel, nowPlaying, upNext } = useStore(
    (state) => ({
      isPlaying: state.isPlaying,
      currentChannel: state.currentChannel,
      nowPlaying: state.nowPlaying,
      upNext: state.upNext,
    }),
    shallow,
  );

  if ((!nowPlaying && !currentChannel) || !currentChannel) {
    return (
      <p style={{ margin: "2rem 0" }} className={styles.nowPlaying}>
        Nothing is playing right now!
      </p>
    );
  }

  const thumbnail = nowPlaying?.thumbnail
    ? `https://static1.qmusic.medialaancdn.be/web_list/itemlist_small_desktop/${nowPlaying.thumbnail}`
    : currentChannel.data.logo.app_square;

  return (
    <>
      <Head>
        <link rel="shortcut icon" href={thumbnail} type="image/x-icon" />
        <title>
          {isPlaying ? "Playing" : "Paused. "} {nowPlaying ? nowPlaying.title : null} -{" "}
          {currentChannel.data.name}
        </title>
      </Head>

      <div className={styles.container}>
        <div className={styles.nowPlaying}>
          <h1>Now playing</h1>
          <PlayingCard track={nowPlaying} />
        </div>
        {upNext && (
          <div className={styles.nowPlaying}>
            <h1>Up next</h1>
            <PlayingCard track={upNext} />
          </div>
        )}
      </div>
    </>
  );
}

function PlayingCard({ track }: { track: Track | null }) {
  const currentChannel = useStore((state) => state.currentChannel);

  const thumbnail = track?.thumbnail
    ? `https://static1.qmusic.medialaancdn.be/web_list/itemlist_small_desktop/${track.thumbnail}`
    : currentChannel?.data.logo.app_square;

  if (!thumbnail) {
    return null;
  }

  return (
    <header className={styles.header}>
      <Image
        src={thumbnail}
        alt={track?.title ?? currentChannel?.data.name ?? "No title"}
        draggable={false}
        height={85}
        width={85}
        style={{ objectFit: "cover" }}
      />
      <div className={styles.titleArea}>
        <h1>{track?.title ?? currentChannel?.data.name}</h1>
        <p>{track?.artist.name}</p>
        <p>{track?.release_year}</p>
        <p>{currentChannel?.data.name}</p>
      </div>
    </header>
  );
}
