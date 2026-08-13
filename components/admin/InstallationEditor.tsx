'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import type { InstallationStep } from '@/lib/types';
import { Loader2, Plus, Trash2, Save } from 'lucide-react';

export default function InstallationEditor() {
  const [items, setItems] = useState<InstallationStep[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    supabase
      .from('installation_steps')
      .select('*')
      .order('step_number', { ascending: true })
      .then(({ data }) => {
        setItems(data || []);
        setLoading(false);
      });
  }, []);

  const add = () =>
    setItems((arr) => [
      ...arr,
      {
        id: crypto.randomUUID(),
        step_number: arr.length + 1,
        text: '',
        created_at: '',
      },
    ]);

  const remove = async (id: string) => {
    setItems((arr) => arr.filter((s) => s.id !== id));
    await supabase.from('installation_steps').delete().eq('id', id);
  };

  const save = async () => {
    setSaving(true);
    await Promise.all(
      items.map((s, i) =>
        supabase.from('installation_steps').upsert({
          id: s.id,
          step_number: i + 1,
          text: s.text,
        })
      )
    );
    setSaving(false);
  };

  if (loading) {
    return (
      <div className="flex justify-center py-12">
        <Loader2 className="h-6 w-6 animate-spin text-blue-500" />
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <p className="text-sm text-slate-500">{items.length} steps</p>
        <div className="flex gap-2">
          <button
            onClick={add}
            className="inline-flex items-center gap-1.5 rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
          >
            <Plus className="h-4 w-4" /> Add
          </button>
          <button
            onClick={save}
            disabled={saving}
            className="inline-flex items-center gap-1.5 rounded-lg bg-blue-500 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-600 disabled:opacity-60"
          >
            {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
            Save
          </button>
        </div>
      </div>

      <div className="space-y-3">
        {items.map((s, i) => (
          <div key={s.id} className="flex items-start gap-3 rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
            <span className="mt-1.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-blue-500 text-xs font-bold text-white">
              {i + 1}
            </span>
            <textarea
              value={s.text}
              onChange={(e) =>
                setItems((arr) =>
                  arr.map((x) => (x.id === s.id ? { ...x, text: e.target.value } : x))
                )
              }
              rows={2}
              className="flex-1 rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              placeholder="Step instruction"
            />
            <button
              onClick={() => remove(s.id)}
              className="mt-1 text-red-400 hover:text-red-600"
            >
              <Trash2 className="h-4 w-4" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
