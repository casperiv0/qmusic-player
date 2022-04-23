import type * as React from "react";
import styles from "./ChannelItem/channel.module.scss";

interface Props {
  children: React.ReactNode;
}

export function ChannelsGrid({ children }: Props) {
  return <div className={styles.channelsGrid}>{children}</div>;
}
