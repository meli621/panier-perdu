import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

// Client lié à la session de la personne connectée (clé publique).
// Les règles de sécurité de la base s'appliquent : chacun ne voit que ses données.
export async function createClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;
  if (!url || !key) {
    throw new Error("Les variables Supabase publiques sont manquantes.");
  }

  const cookieStore = await cookies();

  return createServerClient(url, key, {
    cookies: {
      getAll() {
        return cookieStore.getAll();
      },
      setAll(cookiesToSet) {
        try {
          cookiesToSet.forEach(({ name, value, options }) =>
            cookieStore.set(name, value, options),
          );
        } catch {
          // Appelé depuis un composant serveur : le middleware renouvelle la session.
        }
      },
    },
  });
}
