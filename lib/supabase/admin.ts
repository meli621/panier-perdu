import "server-only";
import { createClient } from "@supabase/supabase-js";

// Client à accès complet (clé secrète) : réservé au code serveur.
// Ne jamais l'importer dans un composant qui s'exécute dans le navigateur.
export function createAdminClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SECRET_KEY;
  if (!url || !key) {
    throw new Error("Les variables Supabase serveur sont manquantes.");
  }
  return createClient(url, key, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
}
