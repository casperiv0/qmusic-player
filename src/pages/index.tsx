import Head from "next/head";
import { Loader } from "components/Loader";
import { fetchChannels } from "lib/useMusic";
import { useStore } from "lib/store";
import { Error } from "components/Error/Error";
import { SocketProvider } from "lib/socket";
import { GetServerSideProps } from "next";
import { Channel } from "types/Channel";
import { DefaultView } from "src/views/default/Default";

export interface AppProps {
  channels: Channel[];
  channel: Channel | null;
}

export default function PlayerPage({ channels, channel }: AppProps) {
  const state = useStore((state) => state.state);

  if (state === "loading") {
    return <Loader />;
  }

  if (state === "error") {
    return <Error />;
  }

  return (
    <>
      <Head>
        <title>Q-Music Player</title>
      </Head>

      <DefaultView channel={channel} channels={channels} />

      <SocketProvider />
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const channels = await fetchChannels();

  return {
    revalidate: 60,
    props: {
      channels,
      channel: channels.find((v) => v.data.station_id === String(query.channel)) ?? null,
    },
  };
};
