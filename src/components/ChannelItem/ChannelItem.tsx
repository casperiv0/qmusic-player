import Image from "next/image";
import { Channel } from "../../types/Channel";
import styles from "./channel.module.scss";

interface Props {
  channel: Channel;
  playNewChannel: (channel: Channel) => void;
}

export const ChannelItem = ({ channel, playNewChannel }: Props) => {
  return (
    <div onClick={() => playNewChannel(channel)} className={styles.channelItem}>
      <p>{channel.data.name}</p>

      <Image
        src={channel.data.logo.app_square}
        alt={channel.data.name}
        height="140px"
        width="160px"
        draggable={false}
      />
    </div>
  );
};
