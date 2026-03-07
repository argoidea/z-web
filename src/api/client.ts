import type { AboutData, Collection, Drawing } from '../types';
import { seedAbout, seedCollections, seedDrawings } from '../data/seed';

const API_BASE = '/api';

async function fetchOrSeed<T>(endpoint: string, seed: T): Promise<T> {
  try {
    const res = await fetch(`${API_BASE}${endpoint}`);
    if (res.ok) {
      const data = await res.json();
      if (data && (Array.isArray(data) ? data.length > 0 : Object.keys(data).length > 0)) {
        return data as T;
      }
    }
  } catch {
    // Backend not available or empty — use seed
  }
  return seed;
}

export async function getAbout(): Promise<AboutData> {
  return fetchOrSeed('/about', seedAbout);
}

export async function getCollections(): Promise<Collection[]> {
  return fetchOrSeed('/collections', seedCollections);
}

export async function getCollectionBySlug(slug: string): Promise<Collection | null> {
  const collections = await getCollections();
  return collections.find((c) => c.slug === slug) ?? null;
}

export async function getDrawings(): Promise<Drawing[]> {
  return fetchOrSeed('/drawings', seedDrawings);
}

// Admin API (PUT/POST/DELETE) — used only in admin panel
export async function putAbout(data: AboutData): Promise<void> {
  await fetch(`${API_BASE}/about`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
}

export async function putCollections(collections: Collection[]): Promise<void> {
  await fetch(`${API_BASE}/collections`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(collections),
  });
}

export async function putDrawings(drawings: Drawing[]): Promise<void> {
  await fetch(`${API_BASE}/drawings`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(drawings),
  });
}

export async function uploadFile(file: File): Promise<string> {
  const form = new FormData();
  form.append('file', file);
  const res = await fetch(`${API_BASE}/upload`, { method: 'POST', body: form });
  if (!res.ok) throw new Error('Upload failed');
  const { url } = await res.json();
  return url;
}
