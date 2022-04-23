import * as React from "react";
import { useSSRSafeId } from "@react-aria/ssr";
import { PlayFillIcon } from "icons/PlayFill";
import { SkipBackwardIcon } from "icons/SkipBackward";
import { SkipForwardIcon } from "icons/SkipForward";
import { PauseIcon } from "icons/PauseIcon";
import { Channel } from "types/Channel";
import styles from "./controls.module.scss";
import { VolumeSlider } from "../VolumeSlider";
import { useStore } from "lib/store";

interface Props {
  pause(): void;
  play(): void;
  playNewChannel(channel: Channel): void;
  setVolume(vol: number): void;
}

export function MediaControls({ play, pause, playNewChannel, setVolume }: Props) {
  const prevId = useSSRSafeId();
  const nextId = useSSRSafeId();
  const playPauseId = useSSRSafeId();

  const [isPlaying, channel, channels] = useStore((s) => [
    s.isPlaying,
    s.currentChannel,
    s.channels,
  ]);

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
      <div style={{ display: "flex", alignItems: "center" }}>
        <button
          disabled={!channel}
          onClick={handlePrevChannel}
          title="Play previous channel"
          aria-label="Play previous channel"
          className={styles.mediaControlBtn}
          id={prevId}
        >
          <SkipBackwardIcon aria-labelledby={prevId} />
        </button>
        <button
          disabled={!channel}
          onClick={handlePlayPause}
          title="Pause/Resume channel"
          aria-label="Pause or resume the channel"
          className={styles.mediaControlBtn}
          id={playPauseId}
        >
          {isPlaying ? (
            <PauseIcon aria-labelledby={playPauseId} />
          ) : (
            <PlayFillIcon aria-labelledby={playPauseId} />
          )}
        </button>
        <button
          disabled={!channel}
          onClick={handleNextChannel}
          title="Play next channel"
          aria-label="Play next channel"
          className={styles.mediaControlBtn}
          id={nextId}
        >
          <SkipForwardIcon aria-labelledby={nextId} />
        </button>
      </div>

      <VolumeSlider channel={channel} setVolume={setVolume} />
    </div>
  );
}
