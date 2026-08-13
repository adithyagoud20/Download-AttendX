'use client';

import { Download, Play, ArrowRight } from 'lucide-react';
import PhoneFrame from './PhoneFrame';
import type { SiteConfig } from '@/lib/types';

type HeroProps = {
  config: SiteConfig;
};

export default function Hero({ config }: HeroProps) {
  const hasApk = Boolean(config.apk_url);

  return (
    <section className="relative overflow-hidden pt-28 pb-16 sm:pt-32 sm:pb-24">
      {/* soft background accents */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-0 h-[400px] w-[700px] -translate-x-1/2 rounded-full bg-blue-100/40 blur-3xl" />
        <div className="absolute right-0 top-40 h-72 w-72 rounded-full bg-emerald-100/30 blur-3xl" />
      </div>

      <div className="container-attendx grid items-center gap-12 lg:grid-cols-2">
        <div className="text-center lg:text-left">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-medium text-slate-600 shadow-sm">
            <span className="h-2 w-2 rounded-full bg-emerald-500" />
            Android • Version {config.version || '1.0.0'}
          </div>

          <h1 className="text-balance text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl lg:text-6xl">
            {config.hero_headline || 'Smart Attendance, Built Around Your Timetable'}
          </h1>

          <p className="mx-auto mt-5 max-w-xl text-lg text-slate-600 lg:mx-0">
            {config.hero_description ||
              'Track attendance, manage your timetable, and understand your attendance at a glance.'}
          </p>

          <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row lg:items-start lg:justify-start justify-center">
            <a
              href={config.apk_url || undefined}
              className="group inline-flex w-full items-center justify-center gap-2 rounded-full bg-blue-500 px-7 py-3.5 text-base font-semibold text-white shadow-lg shadow-blue-500/25 transition-all hover:bg-blue-600 hover:shadow-blue-500/30 sm:w-auto disabled:pointer-events-none disabled:opacity-60"
              aria-disabled={!hasApk}
            >
              <Download className="h-5 w-5" />
              {hasApk ? 'Download AttendX APK' : 'Download coming soon'}
            </a>
            <a
              href="#how-it-works"
              className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-slate-200 bg-white px-7 py-3.5 text-base font-semibold text-slate-700 shadow-sm transition-colors hover:bg-slate-50 sm:w-auto"
            >
              <Play className="h-4 w-4" />
              See How It Works
            </a>
          </div>

          {!hasApk && (
            <p className="mt-3 text-xs text-slate-400">
              APK link will be available once published by the admin.
            </p>
          )}
        </div>

        <div className="flex justify-center lg:justify-end">
          <PhoneFrame
            imageUrl={config.hero_image_url || undefined}
            label={config.app_name}
          />
        </div>
      </div>
    </section>
  );
}
