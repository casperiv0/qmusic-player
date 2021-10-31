export interface Program {
  id: number;
  title: string;
  description: string;
  start: string;
  start_time: string;
  stop: string;
  stop_time: string;
  image: string;
  program_id: number;
  program_type: string;
  program_slug: string;
  show_studio: boolean;
  now_on_air_info: boolean;
  studio: string;
  theme: string;
  human_schedule_copy: string;
  shout: string;
  presenters: Presenter[];
  header_images: Headerimage[];
  items: any[];
}

interface Headerimage {
  homepage_header?: string;
  program_current_tile?: string;
  "site-program-tile"?: string;
  "site-program-header"?: string;
  vr_pancarte_back?: string;
}

interface Presenter {
  type: string;
  id: number;
  name: string;
  slug: string;
  twitter_name: string;
  twitter_id?: any;
  instagram_id?: any;
  instagram_username?: any;
  facebook_url?: any;
  email: string;
  description: string;
  theme: string;
  dj_images: Djimages;
}

interface Djimages {
  homepage_header: string;
  "site-program-tile": string;
  "site-program-header": string;
  program_current_tile: string;
  vr_pancarte_back: string;
}
