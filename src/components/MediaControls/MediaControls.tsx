import * as React from "react";
import { PlayFillIcon } from "../../icons/PlayFill";
import { SkipBackwardIcon } from "../../icons/SkipBackward";
import { SkipForwardIcon } from "../../icons/SkipForward";
import { PauseIcon } from "../../icons/PauseIcon";
import { Channel } from "../../types/Channel";
import styles from "./controls.module.scss";
import { VolumeSlider } from "../VolumeSlider";

interface Props {
  channels: Channel[];
  channel: Channel | null;
  isPlaying: boolean;

  pause: () => void;
  play: () => void;
  playNewChannel: (channel: Channel) => void;
  setVolume: (vol: number) => void;
}

export const MediaControls = ({
  isPlaying,
  channel,
  channels,
  play,
  pause,
  playNewChannel,
  setVolume,
}: Props) => {
  React.useEffect(() => {
    if (!("mediaSession" in navigator)) return;

    (navigator as any).mediaSession.setActionHandler("previoustrack", () => {
      handlePrevChannel();
    });

    (navigator as any).mediaSession.setActionHandler("nexttrack", () => {
      handleNextChannel();
    });

    (navigator as any).mediaSession.setActionHandler("play", () => {
      handlePlayPause();
    });
  });

  function handleNextChannel() {
    if (!channel) return; // nothing is playing.

    const idxOfCurrentChannel = channels.indexOf(channel);

    const newIndex = idxOfCurrentChannel === channels.length - 1 ? 0 : idxOfCurrentChannel + 1;

    playNewChannel(channels[newIndex]!);
  }

  function handlePrevChannel() {
    if (!channel) return; // nothing is playing.

    const idxOfCurrentChannel = channels.indexOf(channel);

    const newIndex = idxOfCurrentChannel === 0 ? channels.length - 1 : idxOfCurrentChannel - 1;

    playNewChannel(channels[newIndex]!);
  }

  function handlePlayPause() {
    if (isPlaying) {
      pause();
    } else {
      play();
    }
  }

  return (
    <div className={styles.mediaControls}>
      <button
        disabled={!channel}
        onClick={handlePrevChannel}
        title="Play previous channel"
        aria-label="Play previous channel"
        className={styles.mediaControlBtn}
      >
        <SkipBackwardIcon />
      </button>
      <button
        disabled={!channel}
        onClick={handlePlayPause}
        title="Pause/Resume channel"
        aria-label="Pause or resume the channel"
        className={styles.mediaControlBtn}
      >
        {isPlaying ? <PauseIcon /> : <PlayFillIcon />}
      </button>
      <button
        disabled={!channel}
        onClick={handleNextChannel}
        title="Play next channel"
        aria-label="Play next channel"
        className={styles.mediaControlBtn}
      >
        <SkipForwardIcon />
      </button>

      <VolumeSlider channel={channel} setVolume={setVolume} />
    </div>
  );
};
