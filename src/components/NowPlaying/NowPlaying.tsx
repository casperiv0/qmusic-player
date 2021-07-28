import Image from "next/image";
import Head from "next/head";
import styles from "./np.module.scss";
import { VolumeSlider } from "../VolumeSlider";
import { Track } from "../../types/Track";
import { Channel } from "../../types/Channel";

interface Props {
  channel: Channel | null;
  track: Track | null;
  upNext: Track | null;

  setVolume: (vol: number) => void;
}

export const NowPlaying = ({ setVolume, channel, upNext, track }: Props) => {
  if (!track || !channel) {
    return (
      <p style={{ margin: "2rem 0" }} className={styles.nowPlaying}>
        Nothing is playing right now!
      </p>
    );
  }

  const npThumbnail = track.thumbnail
    ? `https://static1.qmusic.medialaancdn.be/web_list/itemlist_small_desktop/${track.thumbnail}`
    : channel?.data.logo.app_square;

  const upNextThumbnail = upNext?.thumbnail
    ? `https://static1.qmusic.medialaancdn.be/web_list/itemlist_small_desktop/${upNext.thumbnail}`
    : channel?.data.logo.app_square;

  return (
    <div className={styles.container}>
      <Head>
        <link rel="shortcut icon" href={npThumbnail} type="image/x-icon" />
        <title>
          Playing {track.title} - {channel.data.name}
        </title>
      </Head>

      <div className={styles.nowPlaying}>
        <h1>Now playing</h1>

        <header className={styles.header}>
          <Image
            src={npThumbnail}
            alt={track.title}
            draggable={false}
            objectFit="cover"
            height="85px"
            width="85px"
          />

          <div className={styles.titleArea}>
            <h1>{track.title}</h1>
            <h4>{track.artist.name}</h4>
            <h4>{channel?.data.name}</h4>
            <VolumeSlider channel={channel} setVolume={setVolume} />
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
              <h4>{channel?.data.name}</h4>
            </div>
          </header>
        </div>
      )}
    </div>
  );
};
