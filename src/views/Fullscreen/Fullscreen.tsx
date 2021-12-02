import { Footer } from "components/Footer";
import { NowPlayingFullscreen } from "components/NowPlaying/NowPlayingFullscreen";
import { useMusic } from "lib/useMusic";
import { useRouter } from "next/dist/client/router";
import { AppProps } from "src/pages";
import styles from "./fullscreen.module.scss";

export const FullscreenView = ({ channels: data, channel }: AppProps) => {
  const music = useMusic({ channels: data, channel });
  const router = useRouter();

  function handleClick() {
    const { fullscreen, ...query } = router.query; // eslint-disable-line

    router.replace({
      pathname: router.pathname,
      query,
    });
  }

  return (
    <div className={styles.fullscreen}>
      <button onClick={handleClick} aria-label="Escape fullscreen mode" className={styles.escBtn}>
        &times;
      </button>

      <NowPlayingFullscreen music={music} />

      <Footer />
    </div>
  );
};
