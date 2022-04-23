import { AppProps } from "next/app";
import { SSRProvider } from "@react-aria/ssr";
import "../styles/global.scss";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <div className="container">
      <div className="content">
        <SSRProvider>
          <Component {...pageProps} />
        </SSRProvider>
      </div>
    </div>
  );
}
