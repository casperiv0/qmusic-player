import { AppProps } from "next/app";
import { SSRProvider } from "@react-aria/ssr";
import { NextPage } from "next";
import "../styles/global.scss";

const App: NextPage<AppProps> = ({ Component, pageProps }) => {
  return (
    <div className="container">
      <div className="content">
        <SSRProvider>
          <Component {...pageProps} />
        </SSRProvider>
      </div>
    </div>
  );
};

export default App;
