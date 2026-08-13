'use client';

import { useState } from 'react';
import { ShieldCheck, Download } from 'lucide-react';

type FooterProps = {
  appName: string;
  tagline: string;
  apkUrl: string;
};

export default function Footer({ appName, tagline, apkUrl }: FooterProps) {
  const year = new Date().getFullYear();
  const [revealed, setRevealed] = useState(false);

  return (
    <footer className="border-t border-slate-200 bg-white">
      <div className="container-attendx py-10">
        <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
          <div className="flex items-center gap-2">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/attendx-icon.svg" alt={appName} className="h-8 w-8" />
            <div>
              <p className="text-sm font-bold text-slate-900">{appName}</p>
              <p className="text-xs text-slate-500">{tagline}</p>
            </div>
          </div>

          <div className="flex flex-col items-center gap-3 sm:flex-row sm:items-center">
            {apkUrl && (
              <a
                href={apkUrl}
                className="inline-flex items-center gap-1.5 rounded-full bg-blue-500 px-4 py-2 text-xs font-semibold text-white shadow-sm hover:bg-blue-600 transition-colors"
              >
                <Download className="h-3.5 w-3.5" />
                Download APK
              </a>
            )}
            <button
              onClick={() => setRevealed((v) => !v)}
              aria-label="Admin"
              title="Admin"
              className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 px-3 py-2 text-xs font-medium text-slate-400 transition-colors hover:text-slate-600 hover:border-slate-300"
            >
              <ShieldCheck className="h-3.5 w-3.5" />
              {revealed ? 'Admin' : '•'}
            </button>
          </div>
        </div>

        {revealed && (
          <div className="mt-4 flex justify-center sm:justify-end">
            <a
              href="/admin"
              className="inline-flex items-center gap-1.5 text-xs font-medium text-blue-600 hover:text-blue-700"
            >
              <ShieldCheck className="h-3.5 w-3.5" />
              Go to admin sign in →
            </a>
          </div>
        )}

        <p className="mt-4 text-center text-xs text-slate-400 sm:text-right">
          © {year} {appName}. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
