'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import type { Screenshot } from '@/lib/types';
import { Loader2, Plus, Trash2, Save, ArrowUp, ArrowDown } from 'lucide-react';

export default function ScreenshotsEditor() {
  const [items, setItems] = useState<Screenshot[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    supabase
      .from('screenshots')
      .select('*')
      .order('sort_order', { ascending: true })
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
        label: 'New screenshot',
        caption: '',
        image_url: '',
        sort_order: arr.length + 1,
        created_at: '',
      },
    ]);

  const remove = async (id: string) => {
    setItems((arr) => arr.filter((s) => s.id !== id));
    await supabase.from('screenshots').delete().eq('id', id);
  };

  const move = (idx: number, dir: -1 | 1) => {
    setItems((arr) => {
      const next = [...arr];
      const target = idx + dir;
      if (target < 0 || target >= next.length) return arr;
      [next[idx], next[target]] = [next[target], next[idx]];
      return next.map((s, i) => ({ ...s, sort_order: i + 1 }));
    });
  };

  const save = async () => {
    setSaving(true);
    await Promise.all(
      items.map((s) =>
        supabase.from('screenshots').upsert({
          id: s.id,
          label: s.label,
          caption: s.caption,
          image_url: s.image_url,
          sort_order: s.sort_order,
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
        <p className="text-sm text-slate-500">{items.length} screenshots</p>
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
          <div
            key={s.id}
            className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm"
          >
            <div className="flex items-start gap-2">
              <div className="flex flex-col gap-1 pt-1">
                <button
                  onClick={() => move(i, -1)}
                  className="text-slate-400 hover:text-slate-700 disabled:opacity-30"
                  disabled={i === 0}
                >
                  <ArrowUp className="h-4 w-4" />
                </button>
                <button
                  onClick={() => move(i, 1)}
                  className="text-slate-400 hover:text-slate-700 disabled:opacity-30"
                  disabled={i === items.length - 1}
                >
                  <ArrowDown className="h-4 w-4" />
                </button>
              </div>
              <div className="grid flex-1 gap-3">
                <input
                  value={s.label}
                  onChange={(e) =>
                    setItems((arr) =>
                      arr.map((x) => (x.id === s.id ? { ...x, label: e.target.value } : x))
                    )
                  }
                  className="rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                  placeholder="Label (e.g. Home)"
                />
                <input
                  value={s.caption}
                  onChange={(e) =>
                    setItems((arr) =>
                      arr.map((x) => (x.id === s.id ? { ...x, caption: e.target.value } : x))
                    )
                  }
                  className="rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                  placeholder="Caption"
                />
                <input
                  value={s.image_url}
                  onChange={(e) =>
                    setItems((arr) =>
                      arr.map((x) => (x.id === s.id ? { ...x, image_url: e.target.value } : x))
                    )
                  }
                  className="rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                  placeholder="Image URL (https://...)"
                />
              </div>
              <button
                onClick={() => remove(s.id)}
                className="mt-1 text-red-400 hover:text-red-600"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
