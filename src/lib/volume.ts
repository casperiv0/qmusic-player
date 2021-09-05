const LOCAL_VOLUME_KEY = "qmusic-player-volume";

export function getLocalVolume(): number {
  const local = localStorage.getItem(LOCAL_VOLUME_KEY);

  if (!local) return 30;
  return parseInt(local);
}

export function setLocalVolume(volume: number) {
  localStorage.setItem(LOCAL_VOLUME_KEY, String(volume));
}
