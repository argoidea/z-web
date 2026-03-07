import { useEffect, useState } from 'react';
import { getAbout, putAbout, uploadFile } from '../../api/client';
import type { AboutData } from '../../types';

export function AdminAbout() {
  const [data, setData] = useState<AboutData | null>(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    getAbout().then(setData);
  }, []);

  const handleSave = async () => {
    if (!data) return;
    setSaving(true);
    try {
      await putAbout(data);
    } finally {
      setSaving(false);
    }
  };

  const handleImageUpload = async (index: number, file: File) => {
    const url = await uploadFile(file);
    if (!data) return;
    const next = [...data.images];
    next[index] = url;
    setData({ ...data, images: next });
  };

  const addImage = () => {
    if (!data) return;
    setData({ ...data, images: [...data.images, ''] });
  };

  const removeImage = (index: number) => {
    if (!data) return;
    setData({ ...data, images: data.images.filter((_, i) => i !== index) });
  };

  if (!data) return null;

  return (
    <div className="space-y-8">
      <h1 className="font-display text-3xl tracking-widest text-zeneth-purple">About page</h1>

      <div>
        <label className="block text-sm font-medium text-zeneth-muted">Designer name</label>
        <input
          type="text"
          value={data.designerName}
          onChange={(e) => setData({ ...data, designerName: e.target.value })}
          className="mt-1 w-full rounded border border-zeneth-border bg-zeneth-surface px-3 py-2 text-white"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-zeneth-muted">Introduction</label>
        <textarea
          value={data.introduction}
          onChange={(e) => setData({ ...data, introduction: e.target.value })}
          rows={5}
          className="mt-1 w-full rounded border border-zeneth-border bg-zeneth-surface px-3 py-2 text-white"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-zeneth-muted">Philosophy</label>
        <textarea
          value={data.philosophy}
          onChange={(e) => setData({ ...data, philosophy: e.target.value })}
          rows={5}
          className="mt-1 w-full rounded border border-zeneth-border bg-zeneth-surface px-3 py-2 text-white"
        />
      </div>

      <div>
        <div className="flex items-center justify-between">
          <label className="block text-sm font-medium text-zeneth-muted">Images</label>
          <button
            type="button"
            onClick={addImage}
            className="text-sm text-zeneth-purple hover:underline"
          >
            + Add image
          </button>
        </div>
        <div className="mt-2 space-y-4">
          {data.images.map((url, i) => (
            <div key={i} className="flex gap-4 items-start">
              <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded bg-zeneth-surface">
                {url ? (
                  <img src={url} alt="" className="h-full w-full object-cover" />
                ) : (
                  <div className="flex h-full items-center justify-center text-zeneth-muted text-xs">
                    No image
                  </div>
                )}
              </div>
              <div className="flex-1 min-w-0">
                <input
                  type="file"
                  accept="image/*"
                  className="block w-full text-sm text-zeneth-muted file:mr-2 file:rounded file:border-0 file:bg-zeneth-purple file:px-3 file:py-1 file:text-white"
                  onChange={(e) => {
                    const f = e.target.files?.[0];
                    if (f) handleImageUpload(i, f);
                  }}
                />
                <p className="mt-1 text-xs text-zeneth-muted">Or keep existing: {url || '—'}</p>
              </div>
              <button
                type="button"
                onClick={() => removeImage(i)}
                className="text-zeneth-muted hover:text-red-400"
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      </div>

      <button
        onClick={handleSave}
        disabled={saving}
        className="rounded bg-zeneth-purple px-6 py-2 font-semibold text-zeneth-bg disabled:opacity-50"
      >
        {saving ? 'Saving…' : 'Save'}
      </button>
    </div>
  );
}
