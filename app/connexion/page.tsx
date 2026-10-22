import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { siteUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: "Connexion — Panier Perdu",
  robots: { index: false },
};

async function envoyerLien(formData: FormData) {
  "use server";

  const email = String(formData.get("email") ?? "")
    .trim()
    .toLowerCase();

  const valide = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) && email.length <= 254;
  if (!valide) redirect("/connexion?erreur=email");

  const supabase = await createClient();
  const { error } = await supabase.auth.signInWithOtp({
    email,
    options: {
      emailRedirectTo: `${siteUrl().origin}/auth/callback`,
      shouldCreateUser: true,
    },
  });

  if (error) redirect("/connexion?erreur=envoi");
  redirect("/connexion?envoye=1");
}

export default async function Connexion({
  searchParams,
}: {
  searchParams: Promise<{ envoye?: string; erreur?: string }>;
}) {
  const { envoye, erreur } = await searchParams;

  return (
    <main className="mx-auto flex min-h-dvh max-w-md flex-col justify-center px-5 py-12">
      <a href="/" className="font-serif text-xl font-bold">
        Panier Perdu
      </a>

      {envoye ? (
        <>
          <h1 className="mt-8 font-serif text-4xl leading-tight font-bold">
            Regarde ta boîte mail.
          </h1>
          <p className="mt-5 text-lg leading-relaxed">
            Nous t’avons envoyé un lien de connexion. Clique dessus depuis{" "}
            <strong>le même appareil</strong> que celui-ci pour entrer dans ton
            espace.
          </p>
          <p className="mt-4 text-sm text-sourdine">
            Rien reçu après quelques minutes ? Regarde dans les courriers
            indésirables, puis{" "}
            <a href="/connexion" className="underline underline-offset-4">
              réessaie
            </a>
            .
          </p>
        </>
      ) : (
        <>
          <h1 className="mt-8 font-serif text-4xl leading-tight font-bold">
            Connexion
          </h1>
          <p className="mt-4 text-lg leading-relaxed">
            Saisis l’e-mail de ton abonnement. Nous t’envoyons un lien : pas de
            mot de passe à retenir.
          </p>

          {erreur ? (
            <p
              role="alert"
              className="mt-6 border-l-4 border-braise bg-white/40 p-3"
            >
              {erreur === "email"
                ? "Cette adresse e-mail ne semble pas valide. Vérifie-la et réessaie."
                : "Le lien n’a pas pu être envoyé. Réessaie dans un instant."}
            </p>
          ) : null}

          <form action={envoyerLien} className="mt-6">
            <label htmlFor="email" className="block text-sm font-bold">
              Ton e-mail
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              autoComplete="email"
              inputMode="email"
              maxLength={254}
              className="mt-2 min-h-14 w-full rounded-sm border-2 border-encre bg-white/60 px-4 text-lg"
            />
            <button
              type="submit"
              className="mt-4 inline-flex min-h-14 w-full items-center justify-center rounded-sm bg-braise px-6 text-lg font-bold text-white hover:bg-[#9a3412]"
            >
              Recevoir mon lien
            </button>
          </form>
        </>
      )}
    </main>
  );
}
