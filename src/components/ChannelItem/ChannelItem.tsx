import Image from "next/image";
import { Channel } from "types/Channel";
import styles from "./channel.module.scss";
import { PlayIcon } from "./PlayIcon";

interface Props {
  channel: Channel;
  playNewChannel(channel: Channel): void;
}

export function ChannelItem({ channel, playNewChannel }: Props) {
  return (
    <button
      title="Click to play channel"
      onClick={() => playNewChannel(channel)}
      className={styles.channelItem}
    >
      <div className={styles.playIcon}>
        <PlayIcon fill="#fff" aria-label={`Start playing ${channel.data.name}`} />
      </div>

      <Image
        src={channel.data.logo.app_square}
        alt={channel.data.name}
        height={160}
        width={160}
        draggable={false}
        tabIndex={0}
        style={{ width: 160, height: 160 }}
      />

      <p>{channel.data.name}</p>
    </button>
  );
}
