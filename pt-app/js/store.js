// Local persistence layer. Everything lives in localStorage for now so the
// skeleton works offline with zero backend. Swap these functions for API
// calls (Supabase, Firebase, your own server…) when you add accounts/sync —
// the views only talk to this module.
//
// NOTE: client records include health data (PAR-Q etc.). Before real use,
// move to an encrypted, access-controlled backend and check your local
// data-protection rules (e.g. UK GDPR for special-category health data).

const KEY = 'ptcoach.v1';

function load() {
  try { return JSON.parse(localStorage.getItem(KEY)) || { clients: [] }; }
  catch { return { clients: [] }; }
}
function save(db) {
  try { localStorage.setItem(KEY, JSON.stringify(db)); return true; }
  catch { return false; }
}

const uid = () => Date.now().toString(36) + Math.random().toString(36).slice(2, 7);

export function listClients() {
  return load().clients.slice().sort((a, b) => a.name.localeCompare(b.name));
}

export function getClient(id) {
  return load().clients.find(c => c.id === id) || null;
}

export function createClient(data) {
  const db = load();
  const client = { id: uid(), createdAt: new Date().toISOString(), forms: {}, notes: [], ...data };
  db.clients.push(client);
  save(db);
  return client;
}

export function updateClient(id, patch) {
  const db = load();
  const i = db.clients.findIndex(c => c.id === id);
  if (i < 0) return null;
  db.clients[i] = { ...db.clients[i], ...patch, updatedAt: new Date().toISOString() };
  save(db);
  return db.clients[i];
}

export function deleteClient(id) {
  const db = load();
  db.clients = db.clients.filter(c => c.id !== id);
  save(db);
}

/** Save a completed form (parq, consent, goals, assessment…) on a client. */
export function saveForm(clientId, formId, values) {
  const c = getClient(clientId);
  if (!c) return null;
  const forms = { ...c.forms, [formId]: { values, savedAt: new Date().toISOString() } };
  return updateClient(clientId, { forms });
}

export function addNote(clientId, text) {
  const c = getClient(clientId);
  if (!c) return null;
  const notes = [{ id: uid(), text, at: new Date().toISOString() }, ...(c.notes || [])];
  return updateClient(clientId, { notes });
}

export function deleteNote(clientId, noteId) {
  const c = getClient(clientId);
  if (!c) return null;
  return updateClient(clientId, { notes: c.notes.filter(n => n.id !== noteId) });
}

export function exportAll() {
  return JSON.stringify(load(), null, 2);
}
