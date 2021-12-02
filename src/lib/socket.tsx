import SockJS from "sockjs-client";
import * as React from "react";
import { useStore } from "./store";
import { useRouter } from "next/dist/client/router";

const client = new SockJS("https://socket.qmusic.be/api");

const ACTIONS = (station: string) => [
  {
    action: "join",
    id: 0,
    sub: { station, entity: "program", action: "change" },
    backlog: 1,
  },
  {
    action: "join",
    id: 1,
    sub: { station, entity: "plays", action: "play" },
    backlog: 1,
  },
];

export const SocketProvider = () => {
  const [connected, setConnected] = React.useState(false);
  const { setUpNext, setNowPlaying, currentChannel } = useStore();
  const router = useRouter();

  const channelId = String(router.query.channel);

  function sendActions() {
    ACTIONS(channelId).forEach((action) => connected && client.send(JSON.stringify(action)));
  }

  React.useEffect(() => {
    if (channelId && connected) {
      sendActions();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentChannel, channelId, connected]);

  React.useEffect(() => {
    const openHandler = () => {
      setConnected(true);
      console.log("CONNECTED");
      sendActions();
    };

    const errorHandler = () => {
      setConnected(false);
    };

    client.addEventListener("open", openHandler);

    client.addEventListener("close", errorHandler);
    client.addEventListener("error", errorHandler);

    return () => {
      client.removeEventListener("open", openHandler);
      client.removeEventListener("close", errorHandler);
      client.removeEventListener("error", errorHandler);
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  React.useEffect(() => {
    const messageHandler = (message: any) => {
      const preData = JSON.parse(message.data);
      const data = JSON.parse(preData?.data ?? "{}");

      if (currentChannel && data.station !== currentChannel?.data.station_id) return;

      if (data.entity === "plays") {
        setNowPlaying(data.data);

        if (data.data.next) {
          setUpNext(data.data.next);
        } else {
          setUpNext(null);
        }
      }
    };

    client.addEventListener("message", messageHandler);

    return () => {
      client.removeEventListener("message", messageHandler);
    };
  }, [currentChannel, channelId, setUpNext, setNowPlaying]);

  return null;
};
