import { ArrowRight } from 'lucide-react';
import { FitCut, HERO_IMAGE } from '../data/products';
import { ResilientImage } from './ResilientImage';

interface HeroSectionProps {
  onSelectGenderLine: (line: FitCut) => void;
}

const VALUE_HIGHLIGHTS = [
  {
    label: 'Patronaje',
    value: 'Línea anatómica Dama y Caballero',
  },
  {
    label: 'Tejido Técnico',
    value: '98 a 220 g/m² · Secado rápido',
  },
  {
    label: 'Clubes y Equipos',
    value: 'Confección propia desde 10 piezas',
  },
  {
    label: 'Despacho y Tallas',
    value: 'Envío en 24–48 h · Cambio ágil',
  },
];

export function HeroSection({ onSelectGenderLine }: HeroSectionProps) {
  return (
    <section id="inicio" className="border-b border-black/8 bg-[#F8F9FA]">
      <div className="max-w-[1280px] mx-auto px-6 lg:px-10 pt-10 pb-12 lg:pt-14 lg:pb-16">
        {/* Two-column equal-height hero split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch">
          <div className="lg:col-span-5 flex flex-col justify-between py-2">
            <div>
              <p className="text-xs font-medium tracking-wider text-[#525866] mb-4">
                Colección Técnica 2026 · Dama y Caballero
              </p>

              <h1
                className="font-display font-bold tracking-tight text-[#111315] leading-[0.98] mb-5"
                style={{
                  fontSize: 'clamp(2.5rem, 4.4vw, 4rem)',
                  textWrap: 'balance',
                }}
              >
                Ropa deportiva técnica para dama y caballero
              </h1>

              <p className="text-base text-[#525866] leading-relaxed max-w-[46ch] mb-8">
                Moldería anatómica diferenciada, catálogo con precios transparentes, confección para equipos y asesoría personalizada en cada talla.
              </p>
            </div>

            <div className="space-y-3">
              <div className="flex flex-wrap items-center gap-3">
                <a
                  href="#catalogo"
                  className="inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold text-white bg-[#1D4ED8] hover:bg-[#1E40AF] rounded-md transition-colors duration-150 whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1D4ED8]"
                >
                  <span>Explorar Catálogo Completo</span>
                  <ArrowRight className="w-4 h-4" />
                </a>

                <button
                  type="button"
                  onClick={() => onSelectGenderLine('Dama')}
                  className="inline-flex items-center px-4 py-3 text-sm font-semibold text-[#111315] bg-white border border-black/15 hover:border-[#1D4ED8] hover:text-[#1D4ED8] rounded-md transition-colors duration-150 whitespace-nowrap shrink-0 cursor-pointer"
                >
                  Línea Dama
                </button>

                <button
                  type="button"
                  onClick={() => onSelectGenderLine('Caballero')}
                  className="inline-flex items-center px-4 py-3 text-sm font-semibold text-[#111315] bg-white border border-black/15 hover:border-[#1D4ED8] hover:text-[#1D4ED8] rounded-md transition-colors duration-150 whitespace-nowrap shrink-0 cursor-pointer"
                >
                  Línea Caballero
                </button>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7">
            <div className="relative h-full min-h-[280px] lg:min-h-[440px] rounded-lg overflow-hidden bg-[#E9ECEF] border border-black/8">
              <ResilientImage
                src={HERO_IMAGE}
                alt="Atleta corriendo en pista de concreto vistiendo ropa deportiva técnica CADENCIA para dama y caballero"
                className="w-full h-full lg:h-full object-cover object-center"
                fallbackLabel="Colección Dama y Caballero CADENCIA"
              />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/75 via-black/35 to-transparent p-6 flex items-end justify-between gap-4">
                <div>
                  <p className="text-xs font-medium text-white/80">
                    Disponible en corte Dama y Caballero
                  </p>
                  <p className="text-base font-semibold text-white">
                    Chaqueta Cortavientos Aero Ripstop · $118.00
                  </p>
                </div>
                <a
                  href="#galeria"
                  className="text-xs font-semibold text-white underline underline-offset-4 hover:text-white/85 whitespace-nowrap shrink-0"
                >
                  Explorar galería
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Full-width 4-column technical strip below hero split */}
        <div className="mt-10 pt-8 border-t border-black/8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {VALUE_HIGHLIGHTS.map((item) => (
            <div key={item.label} className="space-y-1">
              <p className="text-xs font-medium text-[#525866]">{item.label}</p>
              <p className="text-sm font-semibold text-[#111315] tabular-nums">
                {item.value}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
