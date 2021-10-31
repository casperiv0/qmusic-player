import Image from "next/image";
import Head from "next/head";
import styles from "./np.module.scss";
import { useStore } from "lib/store";

export const NowPlaying = () => {
  const [isPlaying, nowPlaying, upNext, currentChannel, currentProgram] = useStore((s) => [
    s.isPlaying,
    s.nowPlaying,
    s.upNext,
    s.currentChannel,
    s.currentProgram,
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

      {currentProgram ? (
        <div className={styles.program}>
          <p>
            <span>{currentProgram.description}</span>{" "}
            <span>{currentProgram.human_schedule_copy}.</span>
          </p>

          {currentProgram.presenters.length <= 0 ? null : (
            <div className={styles.presenters}>
              <h1>Presenters</h1>

              <ul>
                {currentProgram.presenters.map((v) => (
                  <li key={v.id}>
                    <Image
                      draggable={false}
                      src={`https://static1.qmusic.medialaancdn.be${v.dj_images.program_current_tile}`}
                      width={1460 / 6}
                      height={670 / 6}
                    />
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      ) : null}

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
              <h4>{nowPlaying?.artist.name}</h4>
              <h4>{currentChannel.data.name}</h4>
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
                <h4>{upNext.artist.name}</h4>
                <h4>{currentChannel.data.name}</h4>
              </div>
            </header>
          </div>
        )}
      </div>
    </>
  );
};
