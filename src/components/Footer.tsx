export function Footer() {
  return (
    <footer className="bg-[#111315] text-white border-t border-white/10">
      <div className="max-w-[1280px] mx-auto px-6 lg:px-10 py-12 flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
        <div>
          <p className="font-display text-2xl font-bold tracking-tight text-white mb-1">
            CADENCIA
          </p>
          <p className="text-xs text-white/65">
            Indumentaria deportiva técnica · Taller propio y envíos nacionales
          </p>
        </div>

        <nav aria-label="Enlaces del pie de página" className="flex flex-wrap gap-6 text-sm text-white/75">
          <a href="#catalogo" className="hover:text-white transition-colors whitespace-nowrap">
            Catálogo y Precios
          </a>
          <a href="#galeria" className="hover:text-white transition-colors whitespace-nowrap">
            Galería de Productos
          </a>
          <a href="#servicios" className="hover:text-white transition-colors whitespace-nowrap">
            Servicios de Ropa
          </a>
          <a href="#contacto" className="hover:text-white transition-colors whitespace-nowrap">
            Contacto Personalizado
          </a>
        </nav>

        <p className="text-xs text-white/55 tabular-nums">
          © 2026 CADENCIA Sport. Todos los derechos reservados.
        </p>
      </div>
    </footer>
  );
}
