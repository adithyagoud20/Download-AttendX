import { Smartphone, Download } from 'lucide-react';
import type { InstallationStep } from '@/lib/types';

export default function InstallationGuide({
  steps,
}: {
  steps: InstallationStep[];
}) {
  return (
    <section id="install" className="py-16 sm:py-24 bg-white border-y border-slate-200">
      <div className="container-attendx">
        <div className="mx-auto max-w-2xl text-center">
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-50 text-blue-600">
            <Smartphone className="h-6 w-6" />
          </div>
          <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            Installation guide
          </h2>
          <p className="mt-3 text-slate-600">
            Install AttendX on your Android phone in a few quick steps.
          </p>
        </div>

        <ol className="mx-auto mt-12 max-w-2xl space-y-3">
          {steps.map((s) => (
            <li
              key={s.id}
              className="flex items-start gap-4 rounded-2xl border border-slate-200 bg-slate-50/50 p-4"
            >
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-blue-500 text-sm font-bold text-white">
                {s.step_number}
              </span>
              <p className="pt-1 text-sm leading-relaxed text-slate-700">
                {s.text}
              </p>
            </li>
          ))}
        </ol>

        <div className="mx-auto mt-8 flex max-w-2xl items-start gap-2 rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-800">
          <Download className="mt-0.5 h-4 w-4 shrink-0" />
          <p>
            AttendX is currently distributed directly as an Android APK. It is
            not on Google Play yet.
          </p>
        </div>
      </div>
    </section>
  );
}
