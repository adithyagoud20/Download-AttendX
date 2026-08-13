'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { CalendarCheck } from 'lucide-react';
import { cn } from '@/lib/utils';

type NavbarProps = {
  appName: string;
  apkUrl: string;
};

export default function Navbar({ appName, apkUrl }: NavbarProps) {
  const router = useRouter();
  const clickCount = useRef(0);
  const clickTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleLogoClick = () => {
    clickCount.current += 1;
    if (clickTimer.current) clearTimeout(clickTimer.current);
    clickTimer.current = setTimeout(() => {
      clickCount.current = 0;
    }, 700);
    if (clickCount.current >= 5) {
      clickCount.current = 0;
      router.push('/admin');
    }
  };

  const navLinks = [
    { href: '#features', label: 'Features' },
    { href: '#how-it-works', label: 'How it works' },
    { href: '#preview', label: 'Preview' },
    { href: '#faq', label: 'FAQ' },
  ];

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-40 transition-all duration-300',
        scrolled
          ? 'bg-white/80 backdrop-blur-md border-b border-slate-200/80 shadow-sm'
          : 'bg-transparent border-b border-transparent'
      )}
    >
      <nav className="container-attendx flex items-center justify-between h-16">
        <button
          onClick={handleLogoClick}
          className="flex items-center gap-2 select-none"
          aria-label={appName}
        >
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-500 text-white shadow-sm">
            <CalendarCheck className="h-5 w-5" />
          </span>
          <span className="text-lg font-bold tracking-tight text-slate-900">
            {appName}
          </span>
        </button>

        <div className="hidden md:flex items-center gap-7">
          {navLinks.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors"
            >
              {l.label}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <a
            href={apkUrl || undefined}
            className="hidden sm:inline-flex items-center justify-center rounded-full bg-blue-500 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-600 transition-colors disabled:pointer-events-none disabled:opacity-50"
            aria-disabled={!apkUrl}
          >
            Download
          </a>
        </div>
      </nav>
    </header>
  );
}
