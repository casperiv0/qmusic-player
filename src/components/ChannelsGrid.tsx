import styles from "./ChannelItem/channel.module.scss";

export const ChannelsGrid: React.FC = ({ children }) => {
  return <div className={styles.channelsGrid}>{children}</div>;
};
