'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useSession } from '@/lib/use-session';
import ConfigEditor from '@/components/admin/ConfigEditor';
import FeaturesEditor from '@/components/admin/FeaturesEditor';
import ScreenshotsEditor from '@/components/admin/ScreenshotsEditor';
import InstallationEditor from '@/components/admin/InstallationEditor';
import FaqEditor from '@/components/admin/FaqEditor';
import { CalendarCheck, LogOut, ExternalLink } from 'lucide-react';

type Tab = 'config' | 'features' | 'screenshots' | 'install' | 'faq';

const tabs: { id: Tab; label: string }[] = [
  { id: 'config', label: 'Site & APK' },
  { id: 'features', label: 'Features' },
  { id: 'screenshots', label: 'Screenshots' },
  { id: 'install', label: 'Installation' },
  { id: 'faq', label: 'FAQ' },
];

export default function AdminDashboard() {
  const router = useRouter();
  const { session, loading, signOut } = useSession();
  const [tab, setTab] = useState<Tab>('config');

  useEffect(() => {
    if (!loading && !session) router.replace('/admin/login');
  }, [loading, router, session]);

  const handleSignOut = async () => {
    await signOut();
    router.replace('/admin/login');
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p className="text-sm text-slate-400">Loading…</p>
      </div>
    );
  }

  if (!session) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p className="text-sm text-slate-400">Redirecting to login…</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <header className="sticky top-0 z-30 border-b border-slate-200 bg-white/90 backdrop-blur">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-3 sm:px-6">
          <div className="flex items-center gap-2.5">
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-500 text-white">
              <CalendarCheck className="h-5 w-5" />
            </span>
            <div>
              <h1 className="text-sm font-bold text-slate-900">AttendX Admin</h1>
              <p className="text-xs text-slate-500">{session.user.email}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Link
              href="/"
              target="_blank"
              className="inline-flex items-center gap-1.5 rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
            >
              <ExternalLink className="h-4 w-4" />
              <span className="hidden sm:inline">View site</span>
            </Link>
            <button
              onClick={handleSignOut}
              className="inline-flex items-center gap-1.5 rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
            >
              <LogOut className="h-4 w-4" />
              <span className="hidden sm:inline">Sign out</span>
            </button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-5xl px-4 py-6 sm:px-6">
        {/* Tabs */}
        <div className="mb-6 flex gap-1.5 overflow-x-auto pb-1">
          {tabs.map((t) => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className={`shrink-0 rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                tab === t.id
                  ? 'bg-blue-500 text-white shadow-sm'
                  : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>

        {tab === 'config' && <ConfigEditor />}
        {tab === 'features' && <FeaturesEditor />}
        {tab === 'screenshots' && <ScreenshotsEditor />}
        {tab === 'install' && <InstallationEditor />}
        {tab === 'faq' && <FaqEditor />}
      </main>
    </div>
  );
}
