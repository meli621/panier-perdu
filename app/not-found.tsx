export default function NotFound() {
  return (
    <main className="mx-auto flex min-h-dvh max-w-xl flex-col justify-center px-5 py-12">
      <p className="font-serif text-xl font-bold">Panier Perdu</p>
      <h1 className="mt-8 font-serif text-4xl leading-tight font-bold">
        Cette page n’existe pas.
      </h1>
      <p className="mt-5 text-lg leading-relaxed">
        Le lien est peut-être incorrect, ou la page a été déplacée.
      </p>
      <a
        href="/"
        className="mt-10 inline-flex min-h-14 items-center justify-center rounded-sm bg-braise px-6 text-lg font-bold text-white"
      >
        Retour à l’accueil
      </a>
    </main>
  );
}
