export function Footer() {
  return (
    <footer className="mx-auto max-w-2xl border-t border-filet px-5 py-8 text-sm text-sourdine">
      <nav aria-label="Informations légales">
        <ul className="flex flex-wrap gap-x-5 gap-y-1">
          <li>
            <a
              href="/mentions-legales"
              className="inline-flex min-h-11 items-center underline underline-offset-4"
            >
              Mentions légales
            </a>
          </li>
          <li>
            <a
              href="/cgv"
              className="inline-flex min-h-11 items-center underline underline-offset-4"
            >
              Conditions générales de vente
            </a>
          </li>
          <li>
            <a
              href="/confidentialite"
              className="inline-flex min-h-11 items-center underline underline-offset-4"
            >
              Confidentialité
            </a>
          </li>
        </ul>
      </nav>
      <p className="mt-4">© {new Date().getFullYear()} Panier Perdu</p>
    </footer>
  );
}
