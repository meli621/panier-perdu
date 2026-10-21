"use client";

export default function Erreur({ reset }: { reset: () => void }) {
  return (
    <main className="mx-auto flex min-h-dvh max-w-xl flex-col justify-center px-5 py-12">
      <p className="font-serif text-xl font-bold">Panier Perdu</p>
      <h1 className="mt-8 font-serif text-4xl leading-tight font-bold">
        Un problème est survenu.
      </h1>
      <p className="mt-5 text-lg leading-relaxed">
        Ce n’est pas de ton fait. Réessaie dans un instant. Si rien ne change,
        reviens à l’accueil.
      </p>
      <button
        type="button"
        onClick={() => reset()}
        className="mt-10 inline-flex min-h-14 items-center justify-center rounded-sm bg-braise px-6 text-lg font-bold text-white"
      >
        Réessayer
      </button>
      <a href="/" className="mt-4 text-center text-sm underline underline-offset-4">
        Retour à l’accueil
      </a>
    </main>
  );
}
