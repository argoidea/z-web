import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  getCollections,
  putCollections,
  uploadFile,
} from '../../api/client';
import type { Collection, Style } from '../../types';

function slugify(s: string) {
  return s
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9-]/g, '');
}

export function AdminCollections() {
  const [collections, setCollections] = useState<Collection[]>([]);
  const [saving, setSaving] = useState(false);
  const [savedMessage, setSavedMessage] = useState(false);
  const [expandedId, setExpandedId] = useState<string | null>(null);

  useEffect(() => {
    getCollections().then(setCollections);
  }, []);

  const save = async () => {
    setSaving(true);
    setSavedMessage(false);
    try {
      await putCollections(collections);
      setSavedMessage(true);
      setTimeout(() => setSavedMessage(false), 3000);
    } finally {
      setSaving(false);
    }
  };

  const addCollection = () => {
    const id = `col-${Date.now()}`;
    const title = 'New collection';
    setCollections([
      ...collections,
      {
        id,
        title,
        slug: slugify(title),
        coverImage: '',
        summary: '',
        order: collections.length,
        styles: [],
      },
    ]);
    setExpandedId(id);
  };

  const updateCollection = (id: string, patch: Partial<Collection>) => {
    setCollections(
      collections.map((c) => {
        if (c.id !== id) return c;
        const next = { ...c, ...patch };
        if (patch.title !== undefined && patch.slug === undefined) {
          next.slug = slugify(patch.title);
        }
        return next;
      })
    );
  };

  const deleteCollection = (id: string) => {
    if (!confirm('Delete this collection and all its styles?')) return;
    if (!confirm('This cannot be undone. Click OK to confirm deletion.')) return;
    setCollections(collections.filter((c) => c.id !== id));
    if (expandedId === id) setExpandedId(null);
  };

  const moveCollection = (index: number, direction: 1 | -1) => {
    const sorted = [...collections].sort((a, b) => a.order - b.order);
    const to = index + direction;
    if (to < 0 || to >= sorted.length) return;
    const a = sorted[index];
    const b = sorted[to];
    const aOrder = a.order;
    const bOrder = b.order;
    setCollections(
      collections.map((c) =>
        c.id === a.id ? { ...c, order: bOrder } : c.id === b.id ? { ...c, order: aOrder } : c
      )
    );
  };

  const addStyle = (collectionId: string) => {
    const styleId = `style-${Date.now()}`;
    setCollections(
      collections.map((c) =>
        c.id === collectionId
          ? {
              ...c,
              styles: [
                ...c.styles,
                {
                  id: styleId,
                  title: 'New style',
                  mainPhoto: '',
                  featurePhoto: '',
                  description: '',
                  order: c.styles.length,
                },
              ],
            }
          : c
      )
    );
  };

  const updateStyle = (collectionId: string, styleId: string, patch: Partial<Style>) => {
    setCollections(
      collections.map((c) =>
        c.id === collectionId
          ? {
              ...c,
              styles: c.styles.map((s) => (s.id === styleId ? { ...s, ...patch } : s)),
            }
          : c
      )
    );
  };

  const deleteStyle = (collectionId: string, styleId: string) => {
    if (!confirm('Delete this style?')) return;
    if (!confirm('This cannot be undone. Click OK to confirm deletion.')) return;
    setCollections(
      collections.map((c) =>
        c.id === collectionId ? { ...c, styles: c.styles.filter((s) => s.id !== styleId) } : c
      )
    );
  };

  const moveStyle = (collectionId: string, index: number, direction: 1 | -1) => {
    const c = collections.find((x) => x.id === collectionId);
    if (!c) return;
    const sorted = [...c.styles].sort((a, b) => a.order - b.order);
    const to = index + direction;
    if (to < 0 || to >= sorted.length) return;
    const a = sorted[index];
    const b = sorted[to];
    setCollections(
      collections.map((col) =>
        col.id !== collectionId
          ? col
          : {
              ...col,
              styles: col.styles.map((s) =>
                s.id === a.id ? { ...s, order: b.order } : s.id === b.id ? { ...s, order: a.order } : s
              ),
            }
      )
    );
  };

  const uploadFor = (
    collectionId: string,
    styleId: string,
    field: 'mainPhoto' | 'featurePhoto',
    file: File
  ) => {
    uploadFile(file)
      .then((url) => updateStyle(collectionId, styleId, { [field]: url }))
      .catch(() => {
        alert(`Upload failed for ${field === 'mainPhoto' ? 'main' : 'feature detail'} photo. Make sure the server is running (npm run dev:full).`);
      });
  };

  const uploadCover = (collectionId: string, file: File) => {
    uploadFile(file)
      .then((url) => {
        updateCollection(collectionId, { coverImage: url });
      })
      .catch(() => {
        alert('Cover upload failed. Make sure the server is running (npm run dev:full) and try again.');
      });
  };

  const sorted = [...collections].sort((a, b) => a.order - b.order);

  return (
    <div className="space-y-8">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h1 className="font-display text-3xl tracking-widest text-zeneth-purple">Collections</h1>
        <div className="flex items-center gap-3">
          {savedMessage && (
            <span className="text-sm text-green-400">Saved</span>
          )}
          <button
            onClick={save}
            disabled={saving}
            className="rounded bg-zeneth-purple px-5 py-2.5 font-semibold text-zeneth-bg disabled:opacity-50"
            title="Save all collections and styles"
          >
            {saving ? 'Saving…' : 'Save all'}
          </button>
          <button
            onClick={addCollection}
            className="rounded border border-zeneth-purple px-4 py-2 text-sm font-medium text-zeneth-purple"
          >
            + New collection
          </button>
        </div>
      </div>

      <p className="text-sm text-zeneth-muted">
        Click a collection to expand and edit. Slug is used in the URL (e.g. /collections/your-slug). Use ↑↓ to reorder.
      </p>

      <div className="space-y-3">
        {sorted.map((c, index) => (
          <div
            key={c.id}
            className="rounded border border-zeneth-border bg-zeneth-surface overflow-hidden"
          >
            <button
              type="button"
              onClick={() => setExpandedId(expandedId === c.id ? null : c.id)}
              className="flex w-full items-center gap-4 p-4 text-left hover:bg-zeneth-card/50"
            >
              <span className="text-zeneth-muted font-mono text-sm w-6">{c.order}</span>
              <div className="h-12 w-16 flex-shrink-0 overflow-hidden rounded bg-zeneth-bg">
                {c.coverImage ? (
                  <img src={c.coverImage} alt="" className="h-full w-full object-cover" />
                ) : (
                  <span className="flex h-full items-center justify-center text-xs text-zeneth-muted">—</span>
                )}
              </div>
              <span className="font-display text-lg tracking-wider text-white flex-1 min-w-0 truncate">
                {c.title || 'Untitled collection'}
              </span>
              <span className="text-xs text-zeneth-muted flex-shrink-0">/collections/{c.slug || '…'}</span>
              <div className="flex items-center gap-2 flex-shrink-0" onClick={(e) => e.stopPropagation()}>
                <button
                  type="button"
                  onClick={() => moveCollection(index, -1)}
                  disabled={index === 0}
                  className="rounded p-1 text-zeneth-muted hover:text-white disabled:opacity-30"
                  title="Move up"
                >
                  ↑
                </button>
                <button
                  type="button"
                  onClick={() => moveCollection(index, 1)}
                  disabled={index === sorted.length - 1}
                  className="rounded p-1 text-zeneth-muted hover:text-white disabled:opacity-30"
                  title="Move down"
                >
                  ↓
                </button>
                <Link
                  to={`/collections/${c.slug}`}
                  className="rounded px-2 py-1 text-sm text-zeneth-purple hover:underline"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  View
                </Link>
                <button
                  onClick={() => deleteCollection(c.id)}
                  className="rounded px-2 py-1 text-sm text-red-400 hover:underline"
                >
                  Delete
                </button>
              </div>
              <span className="text-zeneth-muted flex-shrink-0">
                {expandedId === c.id ? '▼' : '▶'}
              </span>
            </button>

            {expandedId === c.id && (
              <div className="border-t border-zeneth-border p-6 space-y-6">
                <div>
                  <label className="block text-xs font-medium text-zeneth-muted mb-1">Collection title</label>
                  <input
                    type="text"
                    value={c.title}
                    onChange={(e) => updateCollection(c.id, { title: e.target.value })}
                    placeholder="e.g. HK Gothic Rebellion"
                    className="w-full max-w-md rounded border border-zeneth-border bg-zeneth-bg px-3 py-2 text-white"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-zeneth-muted mb-1">
                    Slug <span className="font-normal">(URL: /collections/<strong>{c.slug || '…'}</strong>)</span>
                  </label>
                  <input
                    type="text"
                    value={c.slug}
                    onChange={(e) => updateCollection(c.id, { slug: e.target.value })}
                    placeholder="e.g. hk-gothic-rebellion"
                    className="w-full max-w-md rounded border border-zeneth-border bg-zeneth-bg px-3 py-2 text-white font-mono text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-zeneth-muted mb-1">Summary</label>
                  <textarea
                    value={c.summary}
                    onChange={(e) => updateCollection(c.id, { summary: e.target.value })}
                    placeholder="Short intro for the collection"
                    rows={2}
                    className="w-full rounded border border-zeneth-border bg-zeneth-bg px-3 py-2 text-white"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-zeneth-muted mb-1">Cover image</label>
                  <div className="flex items-center gap-4">
                    <div className="h-24 w-32 flex-shrink-0 overflow-hidden rounded border border-zeneth-border bg-zeneth-bg">
                      {c.coverImage ? (
                        <img src={c.coverImage} alt="" className="h-full w-full object-contain" />
                      ) : (
                        <span className="flex h-full items-center justify-center text-xs text-zeneth-muted">No image</span>
                      )}
                    </div>
                    <label className="cursor-pointer rounded border border-zeneth-purple px-3 py-2 text-sm font-medium text-zeneth-purple hover:bg-zeneth-purple hover:text-zeneth-bg">
                      Choose cover image
                      <input
                        type="file"
                        accept="image/*"
                        className="sr-only"
                        onChange={(e) => {
                          const f = e.target.files?.[0];
                          if (f) {
                            uploadCover(c.id, f);
                            e.target.value = '';
                          }
                        }}
                      />
                    </label>
                  </div>
                  <p className="mt-1 text-xs text-zeneth-muted">Then click Save all. Server must be running (npm run dev:full) for uploads.</p>
                </div>

                <div className="border-t border-zeneth-border pt-4">
                  <div className="flex items-center justify-between mb-3">
                    <label className="text-sm font-medium text-zeneth-muted">Styles ({c.styles.length})</label>
                    <button
                      onClick={() => addStyle(c.id)}
                      className="text-sm font-medium text-zeneth-purple hover:underline"
                    >
                      + Add style
                    </button>
                  </div>
                  <div className="space-y-4">
                    {[...c.styles].sort((a, b) => a.order - b.order).map((s, sIndex) => (
                      <div
                        key={s.id}
                        className="rounded border border-zeneth-border bg-zeneth-bg p-4"
                      >
                        <div className="flex items-center gap-2 mb-2">
                          <div className="flex items-center gap-1">
                            <button
                              type="button"
                              onClick={() => moveStyle(c.id, sIndex, -1)}
                              disabled={sIndex === 0}
                              className="rounded p-1 text-zeneth-muted hover:text-white disabled:opacity-30"
                              title="Move up"
                            >
                              ↑
                            </button>
                            <button
                              type="button"
                              onClick={() => moveStyle(c.id, sIndex, 1)}
                              disabled={sIndex === c.styles.length - 1}
                              className="rounded p-1 text-zeneth-muted hover:text-white disabled:opacity-30"
                              title="Move down"
                            >
                              ↓
                            </button>
                          </div>
                          <input
                            type="text"
                            value={s.title}
                            onChange={(e) => updateStyle(c.id, s.id, { title: e.target.value })}
                            placeholder="Style title"
                            className="flex-1 rounded border border-zeneth-border bg-zeneth-surface px-3 py-2 text-white"
                          />
                          <button
                            onClick={() => deleteStyle(c.id, s.id)}
                            className="text-sm text-red-400 hover:underline flex-shrink-0"
                          >
                            Delete
                          </button>
                        </div>
                        <textarea
                          value={s.description}
                          onChange={(e) => updateStyle(c.id, s.id, { description: e.target.value })}
                          placeholder="Concept / description"
                          rows={2}
                          className="mb-3 w-full rounded border border-zeneth-border bg-zeneth-surface px-3 py-2 text-white"
                        />
                        <div className="flex flex-wrap gap-6">
                          <div>
                            <span className="block text-xs text-zeneth-muted mb-1">Main photo</span>
                            <div className="h-20 w-20 overflow-hidden rounded border border-zeneth-border">
                              {s.mainPhoto ? (
                                <img src={s.mainPhoto} alt="" className="h-full w-full object-contain" />
                              ) : (
                                <div className="flex h-full items-center justify-center bg-zeneth-surface text-xs text-zeneth-muted">Upload</div>
                              )}
                            </div>
                            <label className="mt-1 flex cursor-pointer items-center gap-1 text-xs text-zeneth-purple hover:underline">
                              Choose file
                              <input
                                type="file"
                                accept="image/*"
                                className="sr-only"
                                onChange={(e) => {
                                  const f = e.target.files?.[0];
                                  if (f) {
                                    uploadFor(c.id, s.id, 'mainPhoto', f);
                                    e.target.value = '';
                                  }
                                }}
                              />
                            </label>
                          </div>
                          <div>
                            <span className="block text-xs text-zeneth-muted mb-1">Feature detail pic</span>
                            <div className="h-20 w-20 overflow-hidden rounded border border-zeneth-border">
                              {s.featurePhoto ? (
                                <img src={s.featurePhoto} alt="" className="h-full w-full object-contain" />
                              ) : (
                                <div className="flex h-full items-center justify-center bg-zeneth-surface text-xs text-zeneth-muted">Upload</div>
                              )}
                            </div>
                            <label className="mt-1 flex cursor-pointer items-center gap-1 text-xs text-zeneth-purple hover:underline">
                              Choose file
                              <input
                                type="file"
                                accept="image/*"
                                className="sr-only"
                                onChange={(e) => {
                                  const f = e.target.files?.[0];
                                  if (f) {
                                    uploadFor(c.id, s.id, 'featurePhoto', f);
                                    e.target.value = '';
                                  }
                                }}
                              />
                            </label>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="sticky bottom-4 mt-8 flex justify-center border-t border-zeneth-border pt-6">
        <button
          onClick={save}
          disabled={saving}
          className="rounded bg-zeneth-purple px-8 py-3 font-semibold text-zeneth-bg disabled:opacity-50"
        >
          {saving ? 'Saving…' : 'Save all'}
        </button>
        {savedMessage && (
          <span className="ml-3 self-center text-sm text-green-400">Saved</span>
        )}
      </div>
    </div>
  );
}
