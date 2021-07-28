import Image from "next/image";
import styles from "./np.module.scss";
import { VolumeSlider } from "../VolumeSlider";
import { Track } from "../../types/Track";
import { Channel } from "../../types/Channel";

interface Props {
  channel: Channel | null;
  track: Track | null;
  setVolume: (vol: number) => void;
}

export const NowPlaying = ({ setVolume, channel, track }: Props) => {
  if (!track || !channel) {
    return <p className={styles.nowPlaying}>Nothing is playing right now!</p>;
  }

  const thumbnailUrl = track.thumbnail
    ? `https://static1.qmusic.medialaancdn.be/web_list/itemlist_small_desktop/${track.thumbnail}`
    : channel?.data.logo.app_square;

  return (
    <div className={styles.nowPlaying}>
      <header className={styles.header}>
        <Image
          objectFit="cover"
          src={thumbnailUrl}
          alt={track.title}
          draggable={false}
          height="80px"
          width="80px"
        />

        <div className={styles.titleArea}>
          <h1>{track.title}</h1>
          <h4>{track.artist.name}</h4>
          <h4>{channel?.data.name}</h4>
          <VolumeSlider channel={channel} setVolume={setVolume} />
        </div>
      </header>
    </div>
  );
};
