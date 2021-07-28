import { AppProps } from "next/app";
import { NextPage } from "next";
import "../styles/global.scss";

const App: NextPage<AppProps> = ({ Component, pageProps }) => {
  return (
    <div className="container">
      <div className="content">
        <Component {...pageProps} />
      </div>
    </div>
  );
};

export default App;
