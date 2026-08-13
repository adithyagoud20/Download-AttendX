'use client';

import { useState, useCallback } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import PhoneFrame from './PhoneFrame';
import type { Screenshot } from '@/lib/types';

export default function ScreenshotGallery({
  screenshots,
}: {
  screenshots: Screenshot[];
}) {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const close = useCallback(() => setLightboxIndex(null), []);
  const prev = useCallback(
    () =>
      setLightboxIndex((i) =>
        i === null ? null : (i - 1 + screenshots.length) % screenshots.length
      ),
    [screenshots.length]
  );
  const next = useCallback(
    () =>
      setLightboxIndex((i) =>
        i === null ? null : (i + 1) % screenshots.length
      ),
    [screenshots.length]
  );

  return (
    <section id="preview" className="py-16 sm:py-24">
      <div className="container-attendx">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            A look inside AttendX
          </h2>
          <p className="mt-3 text-slate-600">
            Clean, focused screens designed for fast everyday use.
          </p>
        </div>

        <div className="mt-12 flex snap-x snap-mandatory gap-5 overflow-x-auto pb-6 sm:grid sm:grid-cols-2 sm:overflow-visible lg:grid-cols-3 sm:pb-0">
          {screenshots.map((s, i) => (
            <button
              key={s.id}
              onClick={() => setLightboxIndex(i)}
              className="group snap-center shrink-0 w-[280px] sm:w-auto focus:outline-none"
            >
              <PhoneFrame imageUrl={s.image_url || undefined} label={s.label} />
              <div className="mt-4 text-center">
                <p className="text-sm font-semibold text-slate-900">
                  {s.label}
                </p>
                {s.caption && (
                  <p className="mt-0.5 text-xs text-slate-500">{s.caption}</p>
                )}
              </div>
            </button>
          ))}
        </div>
      </div>

      {lightboxIndex !== null && screenshots[lightboxIndex] && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/80 backdrop-blur-sm p-4"
          onClick={close}
        >
          <button
            onClick={close}
            className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20"
            aria-label="Close"
          >
            <X className="h-5 w-5" />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              prev();
            }}
            className="absolute left-2 sm:left-6 flex h-12 w-12 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20"
            aria-label="Previous"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              next();
            }}
            className="absolute right-2 sm:right-6 flex h-12 w-12 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20"
            aria-label="Next"
          >
            <ChevronRight className="h-6 w-6" />
          </button>
          <div onClick={(e) => e.stopPropagation()} className="max-h-full max-w-full">
            <PhoneFrame
              imageUrl={screenshots[lightboxIndex].image_url || undefined}
              label={screenshots[lightboxIndex].label}
            />
            <div className="mt-4 text-center">
              <p className="text-base font-semibold text-white">
                {screenshots[lightboxIndex].label}
              </p>
              {screenshots[lightboxIndex].caption && (
                <p className="mt-1 text-sm text-slate-300">
                  {screenshots[lightboxIndex].caption}
                </p>
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
