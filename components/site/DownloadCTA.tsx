import { Download, Calendar, HardDrive, Tag } from 'lucide-react';
import type { SiteConfig } from '@/lib/types';

export default function DownloadCTA({ config }: { config: SiteConfig }) {
  const hasApk = Boolean(config.apk_url);
  const releaseDate = config.apk_release_date
    ? new Date(config.apk_release_date).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      })
    : null;

  return (
    <section id="download" className="py-16 sm:py-24">
      <div className="container-attendx">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-blue-500 to-blue-600 px-6 py-14 text-center shadow-xl shadow-blue-500/20 sm:px-12 sm:py-20">
          <div className="pointer-events-none absolute inset-0">
            <div className="absolute -left-10 -top-10 h-48 w-48 rounded-full bg-white/10 blur-2xl" />
            <div className="absolute -bottom-10 -right-10 h-56 w-56 rounded-full bg-blue-300/20 blur-2xl" />
          </div>

          <div className="relative">
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Ready to simplify your attendance?
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-base text-blue-50 sm:text-lg">
              Download AttendX and start tracking your attendance around your
              timetable.
            </p>

            <div className="mt-8">
              {hasApk ? (
                <a
                  href={config.apk_url}
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-8 py-4 text-base font-bold text-blue-600 shadow-lg transition-transform hover:scale-[1.03]"
                >
                  <Download className="h-5 w-5" />
                  Download APK
                </a>
              ) : (
                <div className="inline-flex items-center justify-center gap-2 rounded-full bg-white/20 px-8 py-4 text-base font-semibold text-white">
                  Download temporarily unavailable
                </div>
              )}
            </div>

            <div className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-blue-50">
              <span className="inline-flex items-center gap-1.5">
                <Tag className="h-4 w-4" />
                Version {config.apk_version || '1.0.0'}
              </span>
              {releaseDate && (
                <span className="inline-flex items-center gap-1.5">
                  <Calendar className="h-4 w-4" />
                  {releaseDate}
                </span>
              )}
              {config.apk_size && (
                <span className="inline-flex items-center gap-1.5">
                  <HardDrive className="h-4 w-4" />
                  {config.apk_size}
                </span>
              )}
            </div>

            {config.apk_release_notes && (
              <p className="mx-auto mt-6 max-w-lg text-sm text-blue-100/90">
                {config.apk_release_notes}
              </p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
