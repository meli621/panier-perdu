import { NextResponse, type NextRequest } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";

export const runtime = "nodejs";

// Arrivée depuis le lien magique : on ouvre la session, puis on rattache
// l'abonnement payé avec ce même e-mail (s'il existe) au compte.
export async function GET(request: NextRequest) {
  const { origin, searchParams } = request.nextUrl;
  const code = searchParams.get("code");

  if (!code) {
    return NextResponse.redirect(`${origin}/connexion?erreur=envoi`);
  }

  const supabase = await createClient();
  const { error } = await supabase.auth.exchangeCodeForSession(code);
  if (error) {
    return NextResponse.redirect(`${origin}/connexion?erreur=envoi`);
  }

  const { data } = await supabase.auth.getUser();
  const user = data.user;

  if (user?.email) {
    try {
      const admin = createAdminClient();
      await admin
        .from("abonnements")
        .update({ user_id: user.id, maj_le: new Date().toISOString() })
        .eq("email", user.email.toLowerCase())
        .is("user_id", null);
    } catch (e) {
      console.error("Rattachement de l'abonnement impossible :", e);
    }
  }

  return NextResponse.redirect(`${origin}/espace`);
}
