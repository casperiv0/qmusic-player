import { AppProps } from "next/app";
import { NextPage } from "next";
import "../styles/global.scss";

const App: NextPage<AppProps> = ({ Component, pageProps }) => {
  return <Component {...pageProps} />;
};

export default App;
