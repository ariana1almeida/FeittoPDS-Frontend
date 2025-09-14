export default function Footer() {
  return (
    <footer className="w-full bg-white border-t border-neutral-200 py-4 px-6">
      <div className="grid grid-cols-3 text-xs text-neutral-600">
        <div className="flex justify-center">
          <button className="hover:text-neutral-800 transition-colors">
            Termos de Privacidade
          </button>
        </div>

        <div className="flex justify-center">
          FEITTO © 2025
        </div>

        <div className="flex justify-center">
          <button className="hover:text-neutral-800 transition-colors">
            Contato
          </button>
        </div>
      </div>
    </footer>
  );
}
