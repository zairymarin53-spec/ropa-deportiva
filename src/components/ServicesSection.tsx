import { ArrowUpRight, Check } from 'lucide-react';
import { APPAREL_SERVICES, ApparelService, WORKSHOP_IMAGE } from '../data/products';
import { ResilientImage } from './ResilientImage';

interface ServicesSectionProps {
  onSelectService: (service: ApparelService) => void;
}

export function ServicesSection({ onSelectService }: ServicesSectionProps) {
  return (
    <section id="servicios" className="py-16 lg:py-24 bg-[#111315] text-white">
      <div className="max-w-[1280px] mx-auto px-6 lg:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
          {/* Left Sticky Column: Heading + Atelier Workshop Photo */}
          <div className="lg:col-span-5 lg:sticky lg:top-24 space-y-6">
            <div>
              <p className="text-xs font-medium tracking-wide text-white/70 mb-2">
                Servicios de Ropa y Taller Especializado
              </p>
              <h2
                className="font-display font-bold tracking-tight text-white leading-[1.02] mb-4"
                style={{ fontSize: 'clamp(2rem, 3.4vw, 3.25rem)', textWrap: 'balance' }}
              >
                Confección, estampado técnico y ajuste a medida
              </h2>
              <p className="text-sm sm:text-base text-white/75 leading-relaxed max-w-[44ch]">
                Además de nuestra colección lista para envío inmediato, operamos un taller textil propio dedicado a clubes deportivos, personalización de dorsales y reparaciones técnicas.
              </p>
            </div>

            <div className="rounded-lg overflow-hidden border border-white/12 bg-[#1A1D21]">
              <div className="aspect-[4/3] w-full">
                <ResilientImage
                  src={WORKSHOP_IMAGE}
                  alt="Taller de confección deportiva CADENCIA realizando costura plana en prenda técnica"
                  className="w-full h-full object-cover"
                  fallbackLabel="Taller de Confección CADENCIA"
                />
              </div>
              <div className="p-5 flex items-center justify-between gap-4 border-t border-white/10">
                <div>
                  <p className="text-xs text-white/65">Capacidad de producción</p>
                  <p className="text-sm font-semibold text-white tabular-nums">
                    Lotes de 10 a 500 prendas · Control pieza por pieza
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: 4 Numbered Apparel Services */}
          <div className="lg:col-span-7 divide-y divide-white/12 border-t border-b border-white/12">
            {APPAREL_SERVICES.map((service) => (
              <div key={service.id} className="py-7 first:pt-2">
                <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 mb-3">
                  <h3 className="text-lg sm:text-xl font-semibold text-white tracking-wide">
                    <span className="tabular-nums text-[#60A5FA] mr-2.5">
                      {service.number}.
                    </span>
                    {service.title}
                  </h3>
                  <span className="text-xs font-medium text-white/70 tabular-nums whitespace-nowrap shrink-0">
                    {service.turnaround}
                  </span>
                </div>

                <p className="text-sm text-white/75 leading-relaxed mb-4">
                  {service.summary}
                </p>

                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 mb-5">
                  {service.deliverables.map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-2 text-xs sm:text-sm text-white/85"
                    >
                      <Check className="w-4 h-4 text-[#60A5FA] mt-0.5 shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>

                <div className="flex flex-wrap items-center justify-between gap-4">
                  <span className="text-sm font-semibold text-white tabular-nums">
                    {service.pricingNote}
                  </span>

                  <button
                    type="button"
                    onClick={() => onSelectService(service)}
                    className="inline-flex items-center gap-1.5 px-4 py-2 text-xs sm:text-sm font-semibold text-white bg-[#1D4ED8] hover:bg-[#2563EB] rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#60A5FA]"
                  >
                    <span>Solicitar este servicio</span>
                    <ArrowUpRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
