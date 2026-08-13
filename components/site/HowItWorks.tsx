import { CalendarPlus, CalendarCheck, CalendarDays, BarChart3 } from 'lucide-react';

const steps = [
  {
    icon: CalendarPlus,
    title: 'Create or choose your timetable',
    description: 'Set up a new timetable or pick an existing one for your semester.',
  },
  {
    icon: CalendarCheck,
    title: 'Set your attendance start date',
    description: 'Choose when attendance tracking begins for that timetable.',
  },
  {
    icon: CalendarDays,
    title: 'Mark attendance',
    description: 'Mark attendance straight from your timetable or calendar.',
  },
  {
    icon: BarChart3,
    title: 'Track your statistics',
    description: 'View per-subject attendance stats and stay on top of your progress.',
  },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="py-16 sm:py-24 bg-white border-y border-slate-200">
      <div className="container-attendx">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            How it works
          </h2>
          <p className="mt-3 text-slate-600">
            Get started in four simple steps.
          </p>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((s, i) => (
            <div key={i} className="relative">
              <div className="flex h-full flex-col rounded-2xl border border-slate-200 bg-slate-50/50 p-6">
                <div className="mb-4 flex items-center gap-3">
                  <span className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-500 text-sm font-bold text-white">
                    {i + 1}
                  </span>
                  <s.icon className="h-5 w-5 text-blue-600" />
                </div>
                <h3 className="text-base font-semibold text-slate-900">
                  {s.title}
                </h3>
                <p className="mt-1.5 text-sm leading-relaxed text-slate-600">
                  {s.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
