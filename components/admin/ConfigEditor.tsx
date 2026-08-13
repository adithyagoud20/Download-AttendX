'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import type { SiteConfig } from '@/lib/types';
import { Loader2, Save, Check } from 'lucide-react';

const emptyConfig: SiteConfig = {
  id: 1,
  app_name: 'AttendX',
  tagline: '',
  version: '1.0.0',
  hero_headline: '',
  hero_description: '',
  hero_image_url: '',
  apk_url: '',
  apk_version: '1.0.0',
  apk_release_date: null,
  apk_size: '',
  apk_release_notes: '',
  youtube_url: '',
  youtube_title: '',
  updated_at: '',
};

export default function ConfigEditor() {
  const [config, setConfig] = useState<SiteConfig>(emptyConfig);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    supabase
      .from('site_config')
      .select('*')
      .eq('id', 1)
      .maybeSingle()
      .then(({ data }) => {
        if (data) setConfig(data);
        setLoading(false);
      });
  }, []);

  const update = (field: keyof SiteConfig, value: string | null) =>
    setConfig((c) => ({ ...c, [field]: value }));

  const save = async () => {
    setSaving(true);
    setSaved(false);
    const { error } = await supabase
      .from('site_config')
      .update({
        app_name: config.app_name,
        tagline: config.tagline,
        version: config.version,
        hero_headline: config.hero_headline,
        hero_description: config.hero_description,
        hero_image_url: config.hero_image_url,
        apk_url: config.apk_url,
        apk_version: config.apk_version,
        apk_release_date: config.apk_release_date,
        apk_size: config.apk_size,
        apk_release_notes: config.apk_release_notes,
        youtube_url: config.youtube_url,
        youtube_title: config.youtube_title,
        updated_at: new Date().toISOString(),
      })
      .eq('id', 1);
    setSaving(false);
    if (!error) {
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center py-12">
        <Loader2 className="h-6 w-6 animate-spin text-blue-500" />
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Site info */}
      <Card title="Site Information">
        <Field label="App name">
          <Input value={config.app_name} onChange={(v) => update('app_name', v)} />
        </Field>
        <Field label="Tagline">
          <Input value={config.tagline} onChange={(v) => update('tagline', v)} />
        </Field>
        <Field label="Version (display)">
          <Input value={config.version} onChange={(v) => update('version', v)} />
        </Field>
      </Card>

      {/* Hero */}
      <Card title="Hero Section">
        <Field label="Headline">
          <Input value={config.hero_headline} onChange={(v) => update('hero_headline', v)} />
        </Field>
        <Field label="Description">
          <Textarea value={config.hero_description} onChange={(v) => update('hero_description', v)} />
        </Field>
        <Field label="Hero image URL (screenshot)">
          <Input value={config.hero_image_url} onChange={(v) => update('hero_image_url', v)} placeholder="https://..." />
        </Field>
      </Card>

      {/* APK */}
      <Card title="APK Download">
        <Field label="APK download URL">
          <Input value={config.apk_url} onChange={(v) => update('apk_url', v)} placeholder="https://github.com/.../attendx.apk" />
        </Field>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <Field label="APK version">
            <Input value={config.apk_version} onChange={(v) => update('apk_version', v)} />
          </Field>
          <Field label="APK size (e.g. 12 MB)">
            <Input value={config.apk_size} onChange={(v) => update('apk_size', v)} />
          </Field>
        </div>
        <Field label="Release date">
          <Input
            type="date"
            value={config.apk_release_date || ''}
            onChange={(v) => update('apk_release_date', v || null)}
          />
        </Field>
        <Field label="Release notes (optional)">
          <Textarea value={config.apk_release_notes} onChange={(v) => update('apk_release_notes', v)} />
        </Field>
      </Card>

      {/* Video */}
      <Card title="YouTube Tutorial">
        <Field label="YouTube URL">
          <Input value={config.youtube_url} onChange={(v) => update('youtube_url', v)} placeholder="https://www.youtube.com/watch?v=..." />
        </Field>
        <Field label="Video title">
          <Input value={config.youtube_title} onChange={(v) => update('youtube_title', v)} />
        </Field>
      </Card>

      <div className="flex items-center gap-3">
        <button
          onClick={save}
          disabled={saving}
          className="inline-flex items-center gap-2 rounded-lg bg-blue-500 px-5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-blue-600 disabled:opacity-60"
        >
          {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
          Save changes
        </button>
        {saved && (
          <span className="inline-flex items-center gap-1 text-sm font-medium text-emerald-600">
            <Check className="h-4 w-4" /> Saved
          </span>
        )}
      </div>
    </div>
  );
}

function Card({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <h3 className="mb-4 text-base font-bold text-slate-900">{title}</h3>
      <div className="space-y-4">{children}</div>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="mb-1.5 block text-sm font-medium text-slate-700">{label}</label>
      {children}
    </div>
  );
}

function Input({
  value,
  onChange,
  placeholder,
  type = 'text',
}: {
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  type?: string;
}) {
  return (
    <input
      type={type}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      className="w-full rounded-lg border border-slate-300 bg-white px-3.5 py-2.5 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
    />
  );
}

function Textarea({
  value,
  onChange,
}: {
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <textarea
      value={value}
      onChange={(e) => onChange(e.target.value)}
      rows={3}
      className="w-full rounded-lg border border-slate-300 bg-white px-3.5 py-2.5 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
    />
  );
}
