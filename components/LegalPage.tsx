import type { ReactNode } from "react";
import { DERNIERE_MISE_A_JOUR } from "@/lib/legal";
import { Footer } from "@/components/Footer";

export function LegalPage({
  titre,
  children,
}: {
  titre: string;
  children: ReactNode;
}) {
  return (
    <>
      <header className="mx-auto max-w-2xl px-5 pt-5">
        <a href="/" className="font-serif text-xl font-bold">
          Panier Perdu
        </a>
      </header>
      <main className="mx-auto max-w-2xl px-5 py-10">
        <h1 className="font-serif text-4xl leading-tight font-bold">{titre}</h1>
        <p className="mt-2 text-sm text-sourdine">
          Dernière mise à jour : {DERNIERE_MISE_A_JOUR}
        </p>
        <div className="mt-8 space-y-4 leading-relaxed [&_h2]:mt-10 [&_h2]:font-serif [&_h2]:text-2xl [&_h2]:font-bold [&_ul]:list-disc [&_ul]:space-y-1 [&_ul]:pl-5">
          {children}
        </div>
      </main>
      <Footer />
    </>
  );
}
