import { useEffect, useState } from 'react';
import { getDrawings, putDrawings, uploadFile } from '../../api/client';
import type { Drawing } from '../../types';

export function AdminDrawings() {
  const [drawings, setDrawings] = useState<Drawing[]>([]);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    getDrawings().then(setDrawings);
  }, []);

  const save = async () => {
    setSaving(true);
    try {
      await putDrawings(drawings);
    } finally {
      setSaving(false);
    }
  };

  const add = () => {
    setDrawings([
      ...drawings,
      {
        id: `draw-${Date.now()}`,
        image: '',
        title: 'New drawing',
        description: '',
        order: drawings.length,
      },
    ]);
  };

  const update = (id: string, patch: Partial<Drawing>) => {
    setDrawings(drawings.map((d) => (d.id === id ? { ...d, ...patch } : d)));
  };

  const remove = (id: string) => {
    if (!confirm('Delete this drawing?')) return;
    if (!confirm('This cannot be undone. Click OK to confirm deletion.')) return;
    setDrawings(drawings.filter((d) => d.id !== id));
  };

  const onFile = (id: string, file: File) => {
    uploadFile(file).then((url) => update(id, { image: url }));
  };

  const sorted = [...drawings].sort((a, b) => a.order - b.order);

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="font-display text-3xl tracking-widest text-zeneth-purple">Other Drawings</h1>
        <button
          onClick={add}
          className="rounded border border-zeneth-purple px-4 py-2 text-sm font-medium text-zeneth-purple"
        >
          + New drawing
        </button>
      </div>

      <div className="space-y-4">
        {sorted.map((d) => (
          <div
            key={d.id}
            className="flex flex-wrap gap-4 rounded border border-zeneth-border bg-zeneth-surface p-4"
          >
            <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded bg-zeneth-bg">
              {d.image ? (
                <img src={d.image} alt="" className="h-full w-full object-cover" />
              ) : (
                <div className="flex h-full items-center justify-center text-xs text-zeneth-muted">No image</div>
              )}
            </div>
            <div className="min-w-0 flex-1 space-y-2">
              <div className="flex gap-2">
                <input
                  type="number"
                  min={0}
                  value={d.order}
                  onChange={(e) => update(d.id, { order: parseInt(e.target.value, 10) || 0 })}
                  className="w-14 rounded border border-zeneth-border bg-zeneth-bg px-2 py-2 text-white"
                  title="Order"
                />
                <input
                  type="text"
                  value={d.title}
                  onChange={(e) => update(d.id, { title: e.target.value })}
                  placeholder="Title"
                  className="flex-1 rounded border border-zeneth-border bg-zeneth-bg px-3 py-2 text-white"
                />
              </div>
              <textarea
                value={d.description}
                onChange={(e) => update(d.id, { description: e.target.value })}
                placeholder="Description"
                rows={2}
                className="w-full rounded border border-zeneth-border bg-zeneth-bg px-3 py-2 text-white"
              />
              <input
                type="file"
                accept="image/*"
                onChange={(e) => {
                  const f = e.target.files?.[0];
                  if (f) onFile(d.id, f);
                }}
                className="text-sm text-zeneth-muted"
              />
            </div>
            <button
              onClick={() => remove(d.id)}
              className="text-sm text-red-400 hover:underline"
            >
              Delete
            </button>
          </div>
        ))}
      </div>

      <button
        onClick={save}
        disabled={saving}
        className="rounded bg-zeneth-purple px-6 py-2 font-semibold text-zeneth-bg disabled:opacity-50"
      >
        {saving ? 'Saving…' : 'Save all'}
      </button>
    </div>
  );
}
