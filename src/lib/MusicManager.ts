import axios from "axios";
import { Channel, ChannelStream } from "../types/Channel";

export class MusicManager {
  _element: HTMLAudioElement;

  private stream: ChannelStream | null;
  private apiUrl = "https://api.qmusic.be/2.4/app/channels";

  constructor() {
    this.init();
  }

  get element() {
    return this._element;
  }

  async init() {
    await this.fetchUrl();
    this.createElement();
    this.setStreamToEl();
  }

  async fetchUrl() {
    try {
      const { data } = await axios.get(this.apiUrl);
      const [channel] = data.data as Channel[];

      if (!data || !channel) {
        throw new Error("No data received");
      }

      const [stream] = channel.data.streams.mp3;
      this.stream = stream;
    } catch (e) {
      console.error(e);
    }
  }

  createElement() {
    const element = document.createElement("audio");
    this._element = element;
  }

  setStreamToEl() {
    if (!this.stream) {
      return console.error("No stream found");
    }

    if (!this._element) {
      return console.error("There was no element");
    }

    this._element.src = this.stream.source;
  }

  //   todo: add music player functions
}
