'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import type { Faq } from '@/lib/types';
import { Loader2, Plus, Trash2, Save } from 'lucide-react';

export default function FaqEditor() {
  const [items, setItems] = useState<Faq[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    supabase
      .from('faqs')
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
        question: '',
        answer: '',
        sort_order: arr.length + 1,
        created_at: '',
      },
    ]);

  const remove = async (id: string) => {
    setItems((arr) => arr.filter((f) => f.id !== id));
    await supabase.from('faqs').delete().eq('id', id);
  };

  const save = async () => {
    setSaving(true);
    await Promise.all(
      items.map((f, i) =>
        supabase.from('faqs').upsert({
          id: f.id,
          question: f.question,
          answer: f.answer,
          sort_order: i + 1,
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
        <p className="text-sm text-slate-500">{items.length} questions</p>
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
        {items.map((f) => (
          <div key={f.id} className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm space-y-3">
            <div className="flex items-start gap-2">
              <input
                value={f.question}
                onChange={(e) =>
                  setItems((arr) =>
                    arr.map((x) => (x.id === f.id ? { ...x, question: e.target.value } : x))
                  )
                }
                className="flex-1 rounded-lg border border-slate-300 px-3 py-2 text-sm font-medium focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                placeholder="Question"
              />
              <button
                onClick={() => remove(f.id)}
                className="mt-1 text-red-400 hover:text-red-600"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
            <textarea
              value={f.answer}
              onChange={(e) =>
                setItems((arr) =>
                  arr.map((x) => (x.id === f.id ? { ...x, answer: e.target.value } : x))
                )
              }
              rows={2}
              className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              placeholder="Answer"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
