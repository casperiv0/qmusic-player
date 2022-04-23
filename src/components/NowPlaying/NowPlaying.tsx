import Image from "next/image";
import Head from "next/head";
import styles from "./np.module.scss";
import { useStore } from "lib/store";

export function NowPlaying() {
  const [isPlaying, nowPlaying, upNext, currentChannel] = useStore((s) => [
    s.isPlaying,
    s.nowPlaying,
    s.upNext,
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

  const upNextThumbnail = upNext?.thumbnail
    ? `https://static1.qmusic.medialaancdn.be/web_list/itemlist_small_desktop/${upNext.thumbnail}`
    : currentChannel.data.logo.app_square;

  return (
    <>
      <Head>
        <link rel="shortcut icon" href={npThumbnail} type="image/x-icon" />
        <title>
          {isPlaying ? "Playing" : "Paused. "} {nowPlaying ? nowPlaying.title : null} -{" "}
          {currentChannel.data.name}
        </title>
      </Head>

      <div className={styles.container}>
        <div className={styles.nowPlaying}>
          <h1>Now playing</h1>
          <header className={styles.header}>
            <Image
              src={npThumbnail}
              alt={nowPlaying?.title ?? currentChannel.data.name}
              draggable={false}
              objectFit="cover"
              height="85px"
              width="85px"
            />
            <div className={styles.titleArea}>
              <h1>{nowPlaying?.title ?? currentChannel.data.name}</h1>
              <h2>{nowPlaying?.artist.name}</h2>
              <h2>{currentChannel.data.name}</h2>
            </div>
          </header>
        </div>
        {upNext && (
          <div className={styles.nowPlaying}>
            <h1>Up next</h1>
            <header className={styles.header}>
              <Image
                src={upNextThumbnail}
                alt={upNext.title}
                draggable={false}
                objectFit="cover"
                height="80px"
                width="80px"
              />
              <div className={styles.titleArea}>
                <h1>{upNext.title}</h1>
                <h2>{upNext.artist.name}</h2>
                <h2>{currentChannel.data.name}</h2>
              </div>
            </header>
          </div>
        )}
      </div>
    </>
  );
}
