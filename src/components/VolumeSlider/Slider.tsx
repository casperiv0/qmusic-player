import * as React from "react";
import { useSliderState } from "@react-stately/slider";
import { VisuallyHidden } from "@react-aria/visually-hidden";
import { useSlider, useSliderThumb } from "@react-aria/slider";
import { useNumberFormatter } from "@react-aria/i18n";
import styles from "./volume.module.scss";

interface Props {
  label: string;
  value?: [number];
  minValue?: number;
  maxValue?: number;
  onChange?: (value: number[]) => void;
}

export const Slider = (props: Props) => {
  const trackRef = React.useRef<HTMLDivElement>(null);
  const numberFormatter = useNumberFormatter();
  const state = useSliderState({ ...props, numberFormatter });
  const { groupProps, trackProps } = useSlider(props, state, trackRef);

  return (
    <div {...groupProps} className={styles.sliderContainer}>
      <div {...trackProps} ref={trackRef}>
        <div className={styles.slider} />
        <Thumb index={0} state={state} trackRef={trackRef} />
      </div>
    </div>
  );
};

interface ThumbProps {
  trackRef: React.RefObject<HTMLDivElement>;
  state: any;
  index: number;
}

function Thumb(props: ThumbProps) {
  const inputRef = React.useRef<HTMLInputElement>(null);
  const { state, trackRef, index } = props;
  const { thumbProps, inputProps } = useSliderThumb(
    {
      index,
      trackRef,
      inputRef,
    },
    state,
  );

  const percentage = `${state.getThumbPercent(index) * 100}%`;

  return (
    <div className={styles.thumb} style={{ left: percentage }}>
      <div
        {...thumbProps}
        title={`${percentage} Volume`}
        style={{
          backgroundColor: state.isThumbDragging(index) ? "#a1a1a1" : "gray",
        }}
      >
        <VisuallyHidden>
          <input ref={inputRef} {...inputProps} />
        </VisuallyHidden>
      </div>
    </div>
  );
}
