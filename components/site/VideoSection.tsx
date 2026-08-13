import { PlayCircle } from 'lucide-react';
import type { SiteConfig } from '@/lib/types';

function getYouTubeId(url: string): string | null {
  if (!url) return null;
  const patterns = [
    /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/|youtube\.com\/shorts\/)([A-Za-z0-9_-]{11})/,
  ];
  for (const p of patterns) {
    const m = url.match(p);
    if (m) return m[1];
  }
  return null;
}

export default function VideoSection({ config }: { config: SiteConfig }) {
  const videoId = getYouTubeId(config.youtube_url);

  return (
    <section id="video" className="py-16 sm:py-24 bg-white border-y border-slate-200">
      <div className="container-attendx">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            How to use AttendX
          </h2>
          <p className="mt-3 text-slate-600">
            {config.youtube_title || 'Watch a quick walkthrough of the app.'}
          </p>
        </div>

        <div className="mx-auto mt-10 max-w-3xl">
          <div className="relative overflow-hidden rounded-2xl border border-slate-200 bg-slate-900 shadow-lg aspect-video">
            {videoId ? (
              <iframe
                className="absolute inset-0 h-full w-full"
                src={`https://www.youtube-nocookie.com/embed/${videoId}`}
                title={config.youtube_title || 'AttendX tutorial'}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                loading="lazy"
              />
            ) : (
              <div className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-b from-slate-800 to-slate-900 p-6 text-center">
                <PlayCircle className="h-14 w-14 text-slate-500" />
                <p className="mt-4 text-lg font-semibold text-white">
                  Tutorial video coming soon
                </p>
                <p className="mt-1 text-sm text-slate-400">
                  The walkthrough will be available here once published.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
