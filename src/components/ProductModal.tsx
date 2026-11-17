import { useEffect, useState } from 'react';
import { Check, Minus, Plus, X } from 'lucide-react';
import { FitCut, formatPrice, GarmentSize, Product } from '../data/products';
import { ResilientImage } from './ResilientImage';

interface ProductModalProps {
  product: Product | null;
  onClose: () => void;
  onAddToCart: (
    product: Product,
    size: GarmentSize,
    fitCut: FitCut,
    quantity: number
  ) => void;
  onRequestCustomInquiry: (productName: string) => void;
}

export function ProductModal({
  product,
  onClose,
  onAddToCart,
  onRequestCustomInquiry,
}: ProductModalProps) {
  const [selectedSize, setSelectedSize] = useState<GarmentSize>('M');
  const [selectedFit, setSelectedFit] = useState<FitCut>('Dama');
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    if (product) {
      setSelectedSize(product.sizes.includes('M') ? 'M' : product.sizes[0]);
      setSelectedFit(product.availableFits[0]);
      setQuantity(1);
    }
  }, [product]);

  useEffect(() => {
    if (!product) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [product, onClose]);

  if (!product) return null;

  const handleConfirmAdd = () => {
    onAddToCart(product, selectedSize, selectedFit, quantity);
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/55 backdrop-blur-[2px]"
      role="dialog"
      aria-modal="true"
      aria-labelledby="pdp-title"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-4xl bg-white rounded-lg border border-black/10 overflow-hidden max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Cerrar ficha de producto"
          className="absolute top-4 right-4 z-10 w-10 h-10 inline-flex items-center justify-center rounded-md bg-white/90 text-[#111315] border border-black/10 hover:bg-[#F1F3F5] transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Contiguous Purchase Module: Gallery Left, Purchase Controls Right */}
        <div className="grid grid-cols-1 md:grid-cols-12">
          <div className="md:col-span-6 bg-[#EFEFEF] flex flex-col justify-between">
            <div className="aspect-[4/3] w-full overflow-hidden">
              <ResilientImage
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover"
                fallbackLabel={product.name}
              />
            </div>

            <div className="p-6 border-t border-black/8 bg-[#F8F9FA] space-y-2 text-xs text-[#525866]">
              <div className="flex justify-between gap-4">
                <span>Referencia SKU</span>
                <span className="font-semibold text-[#111315] tabular-nums">{product.sku}</span>
              </div>
              <div className="flex justify-between gap-4">
                <span>Línea</span>
                <span className="font-semibold text-[#111315]">{product.genderLine}</span>
              </div>
              <div className="flex justify-between gap-4">
                <span>Gramaje</span>
                <span className="font-semibold text-[#111315] tabular-nums">{product.weightSpec}</span>
              </div>
              <div className="flex justify-between gap-4">
                <span>Patronaje</span>
                <span className="font-semibold text-[#111315] text-right">{product.fit}</span>
              </div>
              <div className="pt-1 text-[#525866]">
                <span className="font-medium text-[#111315]">Composición: </span>
                {product.material}
              </div>
            </div>
          </div>

          <div className="md:col-span-6 p-6 sm:p-8 flex flex-col justify-between gap-6">
            <div>
              <div className="flex flex-wrap items-center gap-2 text-xs text-[#525866] mb-2">
                <span className="font-semibold text-[#1D4ED8]">{product.genderLine}</span>
                <span aria-hidden="true">·</span>
                <span className="font-semibold text-[#111315]">{product.category}</span>
                <span aria-hidden="true">·</span>
                <span>{product.colorName}</span>
                <span aria-hidden="true">·</span>
                <span>{product.availability}</span>
              </div>

              <h3
                id="pdp-title"
                className="font-display text-3xl font-bold text-[#111315] leading-tight mb-2"
              >
                {product.name}
              </h3>

              <p className="text-2xl font-bold text-[#111315] tabular-nums mb-4">
                {formatPrice(product.price)}
              </p>

              <p className="text-sm text-[#525866] leading-relaxed mb-5">
                {product.description}
              </p>

              <ul className="space-y-2 mb-6">
                {product.features.map((feat) => (
                  <li key={feat} className="flex items-start gap-2.5 text-sm text-[#111315]">
                    <Check className="w-4 h-4 text-[#1D4ED8] mt-0.5 shrink-0" />
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-4 pt-4 border-t border-black/8">
              <div>
                <span className="block text-xs font-semibold text-[#111315] mb-2">
                  Corte / Patronaje
                </span>
                <div className="flex flex-wrap gap-2">
                  {product.availableFits.map((fitOption) => {
                    const active = selectedFit === fitOption;
                    return (
                      <button
                        key={fitOption}
                        type="button"
                        onClick={() => setSelectedFit(fitOption)}
                        className={`h-9 px-4 text-sm font-semibold rounded-md border transition-colors cursor-pointer ${
                          active
                            ? 'bg-[#1D4ED8] text-white border-[#1D4ED8]'
                            : 'bg-white text-[#111315] border-black/15 hover:border-black/40'
                        }`}
                      >
                        {fitOption}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-semibold text-[#111315]">
                    Seleccionar talla
                  </span>
                  <span className="text-xs text-[#525866]">
                    Tallaje {selectedFit.toLowerCase()} estándar
                  </span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {product.sizes.map((size) => {
                    const active = selectedSize === size;
                    return (
                      <button
                        key={size}
                        type="button"
                        onClick={() => setSelectedSize(size)}
                        className={`min-w-[44px] h-10 px-3 text-sm font-semibold rounded-md border transition-colors cursor-pointer ${
                          active
                            ? 'bg-[#111315] text-white border-[#111315]'
                            : 'bg-white text-[#111315] border-black/15 hover:border-black/40'
                        }`}
                      >
                        {size}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="inline-flex items-center border border-black/15 rounded-md h-11">
                  <button
                    type="button"
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    aria-label="Disminuir cantidad"
                    className="w-10 h-full inline-flex items-center justify-center text-[#111315] hover:bg-black/5 cursor-pointer"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="w-10 text-center text-sm font-semibold tabular-nums">
                    {quantity}
                  </span>
                  <button
                    type="button"
                    onClick={() => setQuantity((q) => Math.min(20, q + 1))}
                    aria-label="Aumentar cantidad"
                    className="w-10 h-full inline-flex items-center justify-center text-[#111315] hover:bg-black/5 cursor-pointer"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>

                <button
                  type="button"
                  onClick={handleConfirmAdd}
                  className="flex-1 h-11 px-5 text-sm font-semibold text-white bg-[#1D4ED8] hover:bg-[#1E40AF] rounded-md transition-colors cursor-pointer whitespace-nowrap"
                >
                  Agregar ({selectedFit}) · {formatPrice(product.price * quantity)}
                </button>
              </div>

              <button
                type="button"
                onClick={() => {
                  onClose();
                  onRequestCustomInquiry(product.name);
                }}
                className="w-full py-2 text-xs font-semibold text-[#525866] hover:text-[#1D4ED8] underline underline-offset-4 transition-colors cursor-pointer"
              >
                ¿Necesitas esta prenda en lote para equipo femenino o masculino? Consultar asesoría
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
