import {
  CalendarCheck,
  CalendarDays,
  BarChart3,
  LayoutGrid,
  BookOpen,
  CalendarPlus,
  Cloud,
  Users,
  SunMoon,
  Sparkles,
  Check,
  type LucideIcon,
} from 'lucide-react';
import type { Feature } from '@/lib/types';

const iconMap: Record<string, LucideIcon> = {
  CalendarCheck,
  CalendarDays,
  BarChart3,
  LayoutGrid,
  BookOpen,
  CalendarPlus,
  Cloud,
  Users,
  SunMoon,
  Sparkles,
  Check,
};

export default function FeatureGrid({ features }: { features: Feature[] }) {
  return (
    <section id="features" className="py-16 sm:py-24">
      <div className="container-attendx">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            Everything you need to track attendance
          </h2>
          <p className="mt-3 text-slate-600">
            Built around your timetable — flexible, simple, and made for students.
          </p>
        </div>

        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((f) => {
            const Icon = iconMap[f.icon] ?? Check;
            return (
              <div
                key={f.id}
                className="group rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-all hover:shadow-md hover:border-blue-200"
              >
                <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-600 transition-colors group-hover:bg-blue-500 group-hover:text-white">
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="text-base font-semibold text-slate-900">
                  {f.title}
                </h3>
                <p className="mt-1.5 text-sm leading-relaxed text-slate-600">
                  {f.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
