import { useMemo, useState } from 'react';
import { Check, Search, SlidersHorizontal } from 'lucide-react';
import {
  FitCut,
  formatPrice,
  GarmentSize,
  Product,
  ProductCategory,
  PRODUCTS,
} from '../data/products';
import { ResilientImage } from './ResilientImage';

export type GenderFilter = 'Todos' | FitCut;

interface CatalogSectionProps {
  selectedGender: GenderFilter;
  onSelectGender: (gender: GenderFilter) => void;
  onAddToCart: (product: Product, size: GarmentSize, fitCut: FitCut) => void;
  onSelectProduct: (product: Product) => void;
}

const GENDER_FILTERS: Array<{ value: GenderFilter; label: string }> = [
  { value: 'Todos', label: 'Dama y Caballero' },
  { value: 'Dama', label: 'Para Dama' },
  { value: 'Caballero', label: 'Para Caballero' },
];

const CATEGORIES: Array<'Todos' | ProductCategory> = [
  'Todos',
  'Running',
  'Entrenamiento',
  'Ciclismo',
  'Trail & Accesorios',
];

type SortOption = 'featured' | 'price-asc' | 'price-desc';

export function CatalogSection({
  selectedGender,
  onSelectGender,
  onAddToCart,
  onSelectProduct,
}: CatalogSectionProps) {
  const [selectedCategory, setSelectedCategory] = useState<'Todos' | ProductCategory>('Todos');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<SortOption>('featured');
  const [selectedSizes, setSelectedSizes] = useState<Record<string, GarmentSize>>(() => {
    const initial: Record<string, GarmentSize> = {};
    for (const p of PRODUCTS) {
      initial[p.id] = p.sizes.includes('M') ? 'M' : p.sizes[0];
    }
    return initial;
  });
  const [selectedFits, setSelectedFits] = useState<Record<string, FitCut>>(() => {
    const initial: Record<string, FitCut> = {};
    for (const p of PRODUCTS) {
      initial[p.id] = p.availableFits[0];
    }
    return initial;
  });
  const [recentlyAddedId, setRecentlyAddedId] = useState<string | null>(null);

  const filteredProducts = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    const list = PRODUCTS.filter((product) => {
      const matchesGender =
        selectedGender === 'Todos' || product.availableFits.includes(selectedGender);
      const matchesCategory =
        selectedCategory === 'Todos' || product.category === selectedCategory;
      const matchesQuery =
        !query ||
        product.name.toLowerCase().includes(query) ||
        product.category.toLowerCase().includes(query) ||
        product.genderLine.toLowerCase().includes(query) ||
        product.colorName.toLowerCase().includes(query);
      return matchesGender && matchesCategory && matchesQuery;
    });

    if (sortBy === 'price-asc') {
      return [...list].sort((a, b) => a.price - b.price);
    }
    if (sortBy === 'price-desc') {
      return [...list].sort((a, b) => b.price - a.price);
    }
    return list;
  }, [selectedGender, selectedCategory, searchQuery, sortBy]);

  const handleSizeSelect = (productId: string, size: GarmentSize) => {
    setSelectedSizes((prev) => ({ ...prev, [productId]: size }));
  };

  const handleFitSelect = (productId: string, fit: FitCut) => {
    setSelectedFits((prev) => ({ ...prev, [productId]: fit }));
  };

  const getEffectiveFit = (product: Product): FitCut => {
    if (
      selectedGender !== 'Todos' &&
      product.availableFits.includes(selectedGender)
    ) {
      return selectedGender;
    }
    return selectedFits[product.id] || product.availableFits[0];
  };

  const handleQuickAdd = (product: Product) => {
    const chosenSize = selectedSizes[product.id] || product.sizes[0];
    const chosenFit = getEffectiveFit(product);
    onAddToCart(product, chosenSize, chosenFit);
    setRecentlyAddedId(product.id);
    window.setTimeout(() => {
      setRecentlyAddedId((curr) => (curr === product.id ? null : curr));
    }, 1400);
  };

  return (
    <section id="catalogo" className="py-16 lg:py-24 bg-[#F8F9FA] border-b border-black/8">
      <div className="max-w-[1280px] mx-auto px-6 lg:px-10">
        {/* Section Heading + Gender Line Segmented Switch */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-8">
          <div>
            <p className="text-xs font-medium text-[#525866] mb-2">
              Catálogo y Lista de Precios · Dama y Caballero (Precios en USD)
            </p>
            <h2
              className="font-display font-bold tracking-tight text-[#111315] leading-none"
              style={{ fontSize: 'clamp(2rem, 3.2vw, 3rem)', textWrap: 'balance' }}
            >
              Prendas técnicas por línea y disciplina
            </h2>
          </div>

          <div
            role="tablist"
            aria-label="Filtrar catálogo para dama o caballero"
            className="inline-flex items-center gap-1 p-1 bg-[#111315] rounded-lg w-fit"
          >
            {GENDER_FILTERS.map((item) => {
              const isActive = selectedGender === item.value;
              return (
                <button
                  key={item.value}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => onSelectGender(item.value)}
                  className={`px-4 py-2 text-xs sm:text-sm font-semibold rounded-md transition-colors duration-150 whitespace-nowrap shrink-0 cursor-pointer ${
                    isActive
                      ? 'bg-[#1D4ED8] text-white'
                      : 'text-white/75 hover:text-white'
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Discipline Filter & Search Toolbar */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-8 mb-10 border-b border-black/8">
          {/* Category Segmented Controls */}
          <div
            role="tablist"
            aria-label="Filtrar catálogo por disciplina"
            className="flex flex-wrap items-center gap-1.5 p-1 bg-[#EFEFEF] rounded-lg w-fit"
          >
            {CATEGORIES.map((category) => {
              const isActive = selectedCategory === category;
              return (
                <button
                  key={category}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-3.5 py-2 text-xs font-semibold rounded-md transition-colors duration-150 whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1D4ED8] ${
                    isActive
                      ? 'bg-white text-[#111315] shadow-xs'
                      : 'text-[#525866] hover:text-[#111315]'
                  }`}
                >
                  {category}
                </button>
              );
            })}
          </div>

          {/* Search and Sort Controls */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            <div className="relative">
              <Search
                className="w-4 h-4 text-[#525866] absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none"
                aria-hidden="true"
              />
              <input
                type="search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Buscar prenda, corte o color..."
                aria-label="Buscar prenda o color en el catálogo"
                className="w-full sm:w-60 pl-9 pr-3 py-2 text-sm bg-white border border-black/12 rounded-md text-[#111315] placeholder:text-[#525866]/70 focus:outline-none focus:border-[#1D4ED8]"
              />
            </div>

            <div className="flex items-center gap-2 bg-white border border-black/12 rounded-md px-3 py-2">
              <SlidersHorizontal className="w-4 h-4 text-[#525866] shrink-0" aria-hidden="true" />
              <label htmlFor="catalog-sort" className="sr-only">
                Ordenar catálogo
              </label>
              <select
                id="catalog-sort"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as SortOption)}
                className="text-sm font-medium text-[#111315] bg-transparent focus:outline-none cursor-pointer"
              >
                <option value="featured">Orden destacado</option>
                <option value="price-asc">Precio: menor a mayor</option>
                <option value="price-desc">Precio: mayor a menor</option>
              </select>
            </div>
          </div>
        </div>

        {/* Product Grid */}
        {filteredProducts.length === 0 ? (
          <div className="py-16 px-6 text-center bg-white border border-black/8 rounded-lg">
            <p className="text-base font-semibold text-[#111315] mb-2">
              No encontramos prendas con ese filtro
            </p>
            <p className="text-sm text-[#525866] mb-6">
              Prueba otra línea (Dama o Caballero), categoría o limpia el término de búsqueda.
            </p>
            <button
              type="button"
              onClick={() => {
                onSelectGender('Todos');
                setSelectedCategory('Todos');
                setSearchQuery('');
                setSortBy('featured');
              }}
              className="px-4 py-2 text-sm font-semibold text-white bg-[#111315] hover:bg-[#1D4ED8] rounded-md transition-colors cursor-pointer"
            >
              Mostrar todo el catálogo
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProducts.map((product) => {
              const activeSize = selectedSizes[product.id] || product.sizes[0];
              const activeFit = getEffectiveFit(product);
              const isJustAdded = recentlyAddedId === product.id;

              return (
                <article
                  key={product.id}
                  className="group bg-white border border-black/8 rounded-lg overflow-hidden flex flex-col justify-between transition-transform duration-200 hover:-translate-y-0.5"
                >
                  <div>
                    {/* 4:3 Neutral Backdrop Image */}
                    <button
                      type="button"
                      onClick={() => onSelectProduct(product)}
                      className="w-full aspect-[4/3] bg-[#EFEFEF] overflow-hidden block text-left cursor-pointer focus-visible:outline-2 focus-visible:outline-inset focus-visible:outline-[#1D4ED8]"
                      aria-label={`Ver detalles técnicos de ${product.name}`}
                    >
                      <ResilientImage
                        src={product.image}
                        alt={`${product.name} — ${product.genderLine}`}
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-[1.02]"
                        fallbackLabel={product.name}
                      />
                    </button>

                    {/* Clean Unboxed Metadata & Title */}
                    <div className="p-6 pb-4">
                      <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-[#525866] mb-2">
                        <span className="font-semibold text-[#1D4ED8]">
                          {product.genderLine}
                        </span>
                        <span aria-hidden="true">·</span>
                        <span className="font-medium text-[#111315]">{product.category}</span>
                        <span aria-hidden="true">·</span>
                        <span className="tabular-nums">{product.weightSpec}</span>
                      </div>

                      <div className="flex items-start justify-between gap-4 mb-2">
                        <h3 className="text-base font-semibold text-[#111315] leading-snug">
                          <button
                            type="button"
                            onClick={() => onSelectProduct(product)}
                            className="text-left hover:text-[#1D4ED8] transition-colors cursor-pointer"
                          >
                            {product.name}
                          </button>
                        </h3>
                        <span className="text-base font-bold text-[#111315] tabular-nums whitespace-nowrap shrink-0">
                          {formatPrice(product.price)}
                        </span>
                      </div>

                      <p className="text-xs text-[#525866] truncate">
                        {product.colorName} · {product.availability}
                      </p>
                    </div>
                  </div>

                  {/* Contiguous Action Area: Fit Cut + Size Picker + Add CTA */}
                  <div className="px-6 pb-6 pt-3 border-t border-black/6 flex flex-col gap-3">
                    {product.availableFits.length > 1 && (
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-xs font-medium text-[#525866]">Corte</span>
                        <div className="flex items-center gap-1">
                          {product.availableFits.map((fitOption) => {
                            const selected = activeFit === fitOption;
                            return (
                              <button
                                key={fitOption}
                                type="button"
                                onClick={() => handleFitSelect(product.id, fitOption)}
                                aria-pressed={selected}
                                className={`h-7 px-2.5 text-xs font-semibold rounded border transition-colors cursor-pointer ${
                                  selected
                                    ? 'bg-[#1D4ED8] text-white border-[#1D4ED8]'
                                    : 'bg-transparent text-[#525866] border-black/12 hover:border-black/30 hover:text-[#111315]'
                                }`}
                              >
                                {fitOption}
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    )}

                    <div className="flex items-center justify-between gap-2">
                      <span className="text-xs font-medium text-[#525866]">Talla</span>
                      <div className="flex items-center gap-1">
                        {product.sizes.map((size) => {
                          const selected = activeSize === size;
                          return (
                            <button
                              key={size}
                              type="button"
                              onClick={() => handleSizeSelect(product.id, size)}
                              aria-label={`Seleccionar talla ${size} para ${product.name}`}
                              aria-pressed={selected}
                              className={`min-w-[32px] h-7 px-1.5 text-xs font-semibold rounded border transition-colors cursor-pointer ${
                                selected
                                  ? 'bg-[#111315] text-white border-[#111315]'
                                  : 'bg-transparent text-[#525866] border-black/12 hover:border-black/30 hover:text-[#111315]'
                              }`}
                            >
                              {size}
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    <div className="flex items-center gap-2 pt-1">
                      <button
                        type="button"
                        onClick={() => handleQuickAdd(product)}
                        className={`flex-1 inline-flex items-center justify-center gap-1.5 py-2.5 px-4 text-sm font-semibold rounded-md transition-colors duration-150 whitespace-nowrap cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1D4ED8] ${
                          isJustAdded
                            ? 'bg-[#15803D] text-white'
                            : 'bg-[#1D4ED8] hover:bg-[#1E40AF] text-white'
                        }`}
                      >
                        {isJustAdded ? (
                          <>
                            <Check className="w-4 h-4" />
                            <span>
                              {activeFit} · {activeSize}
                            </span>
                          </>
                        ) : (
                          <span>Agregar · {formatPrice(product.price)}</span>
                        )}
                      </button>

                      <button
                        type="button"
                        onClick={() => onSelectProduct(product)}
                        className="py-2.5 px-3.5 text-sm font-semibold text-[#111315] bg-[#F1F3F5] hover:bg-[#E5E7EB] rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer"
                      >
                        Ficha
                      </button>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
