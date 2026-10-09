/**
 * Turns pasted video links (YouTube, Instagram, Vimeo, direct mp4) into
 * embeddable URLs so they can be played INSIDE the website page
 * instead of redirecting the visitor away.
 */
export type VideoProvider = 'youtube' | 'instagram' | 'vimeo' | 'file' | 'unknown';

export interface ParsedVideo {
  provider: VideoProvider;
  /** URL to use as <iframe src> (or <video src> for provider "file") */
  embedUrl: string | null;
  /** Thumbnail if one can be derived without an API call */
  thumbnail: string | null;
  /** Original URL */
  url: string;
}

const YT_ID = /(?:youtube(?:-nocookie)?\.com\/(?:watch\?(?:.*&)?v=|embed\/|shorts\/|live\/|v\/)|youtu\.be\/)([A-Za-z0-9_-]{11})/i;
// Handles /reel/ID, /p/ID, /tv/ID and the profile form /username/reel/ID
const IG = /instagram\.com\/(?:[A-Za-z0-9_.]+\/)?(p|reel|reels|tv)\/([A-Za-z0-9_-]+)/i;
const VIMEO = /vimeo\.com\/(?:video\/)?(\d+)/i;

export const parseVideoUrl = (raw: string): ParsedVideo => {
  const url = (raw || '').trim();

  const yt = url.match(YT_ID);
  if (yt) {
    return {
      provider: 'youtube',
      embedUrl: `https://www.youtube.com/embed/${yt[1]}?rel=0&modestbranding=1`,
      thumbnail: `https://img.youtube.com/vi/${yt[1]}/hqdefault.jpg`,
      url,
    };
  }

  const ig = url.match(IG);
  if (ig) {
    const kind = ig[1].toLowerCase() === 'reels' ? 'reel' : ig[1].toLowerCase();
    return {
      provider: 'instagram',
      embedUrl: `https://www.instagram.com/${kind}/${ig[2]}/embed`,
      thumbnail: null,
      url,
    };
  }

  const vm = url.match(VIMEO);
  if (vm) {
    return {
      provider: 'vimeo',
      embedUrl: `https://player.vimeo.com/video/${vm[1]}`,
      thumbnail: null,
      url,
    };
  }

  if (/\.(mp4|webm|ogg)(\?.*)?$/i.test(url)) {
    return { provider: 'file', embedUrl: url, thumbnail: null, url };
  }

  return { provider: 'unknown', embedUrl: null, thumbnail: null, url };
};

export const getVideoLabel = (provider: VideoProvider): string => {
  switch (provider) {
    case 'youtube': return 'YouTube';
    case 'instagram': return 'Instagram';
    case 'vimeo': return 'Vimeo';
    case 'file': return 'Video';
    default: return 'Video link';
  }
};
