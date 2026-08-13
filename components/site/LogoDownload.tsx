'use client';

import { useState } from 'react';
import { Download } from 'lucide-react';

export default function LogoDownloadSection() {
  const files = [
    { name: 'attendx-logo.svg', label: 'Full logo (SVG)', desc: 'Icon + wordmark, transparent background' },
    { name: 'attendx-icon.svg', label: 'App icon (SVG)', desc: 'Square icon only, transparent background' },
    { name: 'favicon.svg', label: 'Favicon (SVG)', desc: 'Small mark for browser tabs' },
  ];

  return (
    <section id="logo" className="py-16 sm:py-20 bg-white border-t border-slate-200">
      <div className="container-attendx">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            AttendX brand assets
          </h2>
          <p className="mt-3 text-slate-600">
            Download the official AttendX logo and icon.
          </p>
        </div>

        <div className="mx-auto mt-10 flex max-w-md flex-col items-center rounded-2xl border border-slate-200 bg-slate-50/50 p-8 text-center">
          <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500 to-blue-600 shadow-lg shadow-blue-500/20">
            <span className="text-3xl font-bold text-white">A</span>
          </div>
          <p className="mt-4 text-lg font-bold text-slate-900">AttendX</p>
          <p className="text-sm text-slate-500">Smart Attendance, Built Around Your Timetable</p>
        </div>

        <div className="mx-auto mt-8 grid max-w-3xl gap-4 sm:grid-cols-3">
          {files.map((f) => (
            <a
              key={f.name}
              href={`/${f.name}`}
              download
              className="group flex flex-col items-center rounded-2xl border border-slate-200 bg-white p-5 text-center shadow-sm transition-all hover:shadow-md hover:border-blue-200"
            >
              <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-600 transition-colors group-hover:bg-blue-500 group-hover:text-white">
                <Download className="h-5 w-5" />
              </div>
              <p className="text-sm font-semibold text-slate-900">{f.label}</p>
              <p className="mt-1 text-xs text-slate-500">{f.desc}</p>
              <p className="mt-2 text-xs font-mono text-slate-400">{f.name}</p>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
