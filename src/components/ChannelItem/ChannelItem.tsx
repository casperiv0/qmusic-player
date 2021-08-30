import Image from "next/image";
import { Channel } from "types/Channel";
import styles from "./channel.module.scss";
import { PlayIcon } from "./PlayIcon";

interface Props {
  channel: Channel;
  playNewChannel: (channel: Channel) => void;
}

export const ChannelItem = ({ channel, playNewChannel }: Props) => {
  return (
    <div
      title="Click to play channel"
      onClick={() => playNewChannel(channel)}
      className={styles.channelItem}
    >
      <div className={styles.playIcon}>
        <PlayIcon />
      </div>

      <Image
        src={channel.data.logo.app_square}
        alt={channel.data.name}
        height="160px"
        width="160px"
        draggable={false}
      />

      <p>{channel.data.name}</p>
    </div>
  );
};
