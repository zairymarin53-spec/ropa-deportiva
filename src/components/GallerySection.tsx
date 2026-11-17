import { useState } from 'react';
import { ChevronLeft, ChevronRight, Expand, X } from 'lucide-react';
import {
  formatPrice,
  GALLERY_FRAMES,
  GalleryFrame,
  Product,
  PRODUCTS,
} from '../data/products';
import { ResilientImage } from './ResilientImage';

interface GallerySectionProps {
  onSelectProduct: (product: Product) => void;
}

type GalleryFilter = 'Todas' | GalleryFrame['context'];

const GALLERY_FILTERS: GalleryFilter[] = [
  'Todas',
  'Dama',
  'Caballero',
  'Taller & Confección',
];

export function GallerySection({ onSelectProduct }: GallerySectionProps) {
  const [filter, setFilter] = useState<GalleryFilter>('Todas');
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const visibleFrames =
    filter === 'Todas'
      ? GALLERY_FRAMES
      : GALLERY_FRAMES.filter((frame) => frame.context === filter);

  const activeFrame = activeIndex !== null ? visibleFrames[activeIndex] ?? null : null;

  const handleOpenProduct = (productId?: string) => {
    if (!productId) return;
    const found = PRODUCTS.find((p) => p.id === productId);
    if (found) {
      setActiveIndex(null);
      onSelectProduct(found);
    }
  };

  return (
    <section id="galeria" className="py-16 lg:py-24 bg-white border-b border-black/8">
      <div className="max-w-[1280px] mx-auto px-6 lg:px-10">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-10">
          <div>
            <p className="text-xs font-medium text-[#525866] mb-2">
              Galería de Productos · Detalle de Tejidos y Uso Real
            </p>
            <h2
              className="font-display font-bold tracking-tight text-[#111315] leading-none"
              style={{ fontSize: 'clamp(2rem, 3.2vw, 3rem)', textWrap: 'balance' }}
            >
              Inspección visual de colección y taller
            </h2>
          </div>

          <div
            role="tablist"
            aria-label="Filtrar galería de productos"
            className="flex flex-wrap items-center gap-1.5 p-1 bg-[#F1F3F5] rounded-lg w-fit"
          >
            {GALLERY_FILTERS.map((item) => {
              const isSelected = filter === item;
              return (
                <button
                  key={item}
                  type="button"
                  role="tab"
                  aria-selected={isSelected}
                  onClick={() => {
                    setFilter(item);
                    setActiveIndex(null);
                  }}
                  className={`px-3.5 py-2 text-xs font-semibold rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                    isSelected
                      ? 'bg-white text-[#111315] shadow-xs'
                      : 'text-[#525866] hover:text-[#111315]'
                  }`}
                >
                  {item}
                </button>
              );
            })}
          </div>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {visibleFrames.map((frame, index) => {
            const linkedProduct = frame.linkedProductId
              ? PRODUCTS.find((p) => p.id === frame.linkedProductId)
              : undefined;

            return (
              <figure
                key={frame.id}
                className="group bg-[#F8F9FA] border border-black/8 rounded-lg overflow-hidden flex flex-col justify-between"
              >
                <div className="relative aspect-[4/3] overflow-hidden bg-[#E9ECEF]">
                  <button
                    type="button"
                    onClick={() => setActiveIndex(index)}
                    aria-label={`Ampliar imagen: ${frame.title}`}
                    className="w-full h-full block cursor-pointer focus-visible:outline-2 focus-visible:outline-inset focus-visible:outline-[#1D4ED8]"
                  >
                    <ResilientImage
                      src={frame.image}
                      alt={frame.title}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                      fallbackLabel={frame.title}
                    />
                  </button>

                  <button
                    type="button"
                    onClick={() => setActiveIndex(index)}
                    aria-label={`Abrir visor de ${frame.title}`}
                    className="absolute bottom-3 right-3 w-9 h-9 inline-flex items-center justify-center rounded-md bg-white/90 text-[#111315] border border-black/10 opacity-90 group-hover:opacity-100 hover:bg-white transition-opacity cursor-pointer"
                  >
                    <Expand className="w-4 h-4" />
                  </button>
                </div>

                <figcaption className="p-5 flex flex-col justify-between flex-1 gap-3">
                  <div>
                    <div className="flex items-center gap-2 text-xs text-[#525866] mb-1.5">
                      <span className="font-medium text-[#111315]">{frame.context}</span>
                      <span aria-hidden="true">·</span>
                      <span>{frame.detailSpec}</span>
                    </div>
                    <h3 className="text-base font-semibold text-[#111315] mb-1">
                      {frame.title}
                    </h3>
                    <p className="text-sm text-[#525866] leading-relaxed">
                      {frame.caption}
                    </p>
                  </div>

                  {linkedProduct && (
                    <div className="pt-3 border-t border-black/6 flex items-center justify-between">
                      <span className="text-sm font-bold text-[#111315] tabular-nums">
                        {formatPrice(linkedProduct.price)}
                      </span>
                      <button
                        type="button"
                        onClick={() => handleOpenProduct(linkedProduct.id)}
                        className="text-xs font-semibold text-[#1D4ED8] hover:underline underline-offset-4 cursor-pointer"
                      >
                        Ver prenda en catálogo
                      </button>
                    </div>
                  )}
                </figcaption>
              </figure>
            );
          })}
        </div>
      </div>

      {/* Lightbox Modal */}
      {activeFrame && activeIndex !== null && (
        <div
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-xs flex items-center justify-center p-4 sm:p-8"
          role="dialog"
          aria-modal="true"
          aria-label={`Visor de galería: ${activeFrame.title}`}
          onClick={() => setActiveIndex(null)}
        >
          <div
            className="relative w-full max-w-4xl bg-white rounded-lg overflow-hidden border border-black/15"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between px-6 py-4 border-b border-black/8">
              <div>
                <p className="text-xs text-[#525866]">{activeFrame.context}</p>
                <h3 className="text-base font-semibold text-[#111315]">
                  {activeFrame.title}
                </h3>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() =>
                    setActiveIndex(
                      (activeIndex - 1 + visibleFrames.length) % visibleFrames.length
                    )
                  }
                  aria-label="Imagen anterior"
                  className="w-10 h-10 inline-flex items-center justify-center rounded-md border border-black/12 hover:bg-black/5 cursor-pointer"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  type="button"
                  onClick={() =>
                    setActiveIndex((activeIndex + 1) % visibleFrames.length)
                  }
                  aria-label="Siguiente imagen"
                  className="w-10 h-10 inline-flex items-center justify-center rounded-md border border-black/12 hover:bg-black/5 cursor-pointer"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
                <button
                  type="button"
                  onClick={() => setActiveIndex(null)}
                  aria-label="Cerrar visor"
                  className="w-10 h-10 inline-flex items-center justify-center rounded-md bg-[#111315] text-white hover:bg-[#1D4ED8] transition-colors cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            <div className="aspect-[16/10] w-full bg-[#EFEFEF]">
              <ResilientImage
                src={activeFrame.image}
                alt={activeFrame.title}
                className="w-full h-full object-cover"
                fallbackLabel={activeFrame.title}
              />
            </div>

            <div className="p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-[#F8F9FA]">
              <div>
                <p className="text-sm text-[#111315] font-medium mb-1">
                  {activeFrame.caption}
                </p>
                <p className="text-xs text-[#525866]">{activeFrame.detailSpec}</p>
              </div>

              {activeFrame.linkedProductId && (
                <button
                  type="button"
                  onClick={() => handleOpenProduct(activeFrame.linkedProductId)}
                  className="px-4 py-2.5 text-sm font-semibold text-white bg-[#1D4ED8] hover:bg-[#1E40AF] rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer"
                >
                  Comprar / Ver talla
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
