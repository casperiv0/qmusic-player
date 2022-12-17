import * as React from "react";
import { getLocalVolume, setLocalVolume } from "lib/volume";
import { Slider } from "./Slider";

interface Props {
  setVolume(volume: number): void;
}

export function VolumeSlider({ setVolume }: Props) {
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

  return <Slider label="Volume" onChange={onChange} minValue={0} maxValue={100} value={[vol]} />;
}
