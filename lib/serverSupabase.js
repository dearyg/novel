// Server-side Supabase client using the service-role key.
// IMPORTANT: never import this from a client file. It must only be used in
// API routes / getServerSideProps / similar server contexts.

import { createClient } from "@supabase/supabase-js";

let cached = null;

export function serverSupabase() {
  if (cached) return cached;
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) {
    throw new Error("Server Supabase missing env (NEXT_PUBLIC_SUPABASE_URL + SUPABASE_SERVICE_ROLE_KEY)");
  }
  cached = createClient(url, key, {
    auth: { autoRefreshToken: false, persistSession: false },
  });
  return cached;
}

const NOVEL_SLUG = "the-senior-observer";

export async function getNovelId() {
  const sb = serverSupabase();
  const { data, error } = await sb
    .from("novels")
    .select("id")
    .eq("slug", NOVEL_SLUG)
    .single();
  if (error || !data) throw new Error(`Novel ${NOVEL_SLUG} not found`);
  return data.id;
}

/** Constant-time-ish key comparison. Not perfect but good enough for a single-owner gate. */
export function keyMatches(provided) {
  const expected = process.env.OWNER_KEY;
  if (!expected) return false;
  if (typeof provided !== "string") return false;
  if (provided.length !== expected.length) return false;
  let mismatch = 0;
  for (let i = 0; i < provided.length; i++) {
    mismatch |= provided.charCodeAt(i) ^ expected.charCodeAt(i);
  }
  return mismatch === 0;
}

/** Pull bearer token from the Authorization header (or x-owner-key as a fallback). */
export function readOwnerKey(req) {
  const auth = req.headers.authorization || req.headers.Authorization || "";
  if (auth.startsWith("Bearer ")) return auth.slice(7).trim();
  const x = req.headers["x-owner-key"];
  if (typeof x === "string") return x.trim();
  return "";
}
