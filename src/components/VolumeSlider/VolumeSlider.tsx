import * as React from "react";
import { getLocalVolume, setLocalVolume } from "lib/volume";
import { Channel } from "types/Channel";
import { Slider } from "./Slider";

interface Props {
  channel: Channel | null;
  setVolume: (volume: number) => void;
}

export const VolumeSlider = ({ channel, setVolume }: Props) => {
  const [vol, setVol] = React.useState(0);

  React.useEffect(() => {
    const vol = getLocalVolume();
    setVol(vol);
    setVolume(vol / 100);
  }, [setVolume]);

  function onChange(arr: number[]) {
    const [value] = arr as [number];
    const newVol = value / 100;

    setVol(value);
    setLocalVolume(value);
    setVolume(newVol);
  }

  return (
    <>
      {channel?.color ? (
        <style jsx>
          {`
            ::-webkit-slider-thumb {
              background: ${channel?.color?.background} !important;
            }
            ::-moz-range-thumb {
              background: ${channel?.color?.background} !important;
            }
          `}
        </style>
      ) : null}

      <Slider label="Volume" onChange={onChange} minValue={0} maxValue={100} value={[vol]} />
    </>
  );
};
