import { CalendarCheck } from 'lucide-react';

type PhoneFrameProps = {
  imageUrl?: string;
  label?: string;
  className?: string;
  children?: React.ReactNode;
};

export default function PhoneFrame({
  imageUrl,
  label,
  className = '',
  children,
}: PhoneFrameProps) {
  return (
    <div className={`relative mx-auto ${className}`}>
      <div className="relative w-[260px] sm:w-[300px] rounded-[2.5rem] bg-slate-900 p-3 shadow-2xl shadow-blue-500/10 ring-1 ring-slate-900/10">
        <div className="relative h-[540px] sm:h-[600px] w-full overflow-hidden rounded-[2rem] bg-white">
          {/* notch */}
          <div className="absolute left-1/2 top-0 z-20 h-6 w-28 -translate-x-1/2 rounded-b-2xl bg-slate-900" />
          {imageUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={imageUrl}
              alt={label || 'AttendX screenshot'}
              className="h-full w-full object-cover object-top"
            />
          ) : (
            <div className="flex h-full w-full flex-col items-center justify-center bg-gradient-to-b from-blue-50 to-white p-6 text-center">
              {children ?? (
                <>
                  <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-500 text-white shadow-lg shadow-blue-500/30">
                    <CalendarCheck className="h-7 w-7" />
                  </div>
                  <p className="text-sm font-semibold text-slate-700">
                    {label || 'AttendX'}
                  </p>
                  <p className="mt-1 text-xs text-slate-400">
                    Screenshot coming soon
                  </p>
                </>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
