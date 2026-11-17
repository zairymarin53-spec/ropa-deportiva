/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { CartDrawer, CartItem } from './components/CartDrawer';
import { CatalogSection, GenderFilter } from './components/CatalogSection';
import { ContactPrefill, ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { GallerySection } from './components/GallerySection';
import { Header } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { ProductModal } from './components/ProductModal';
import { ServicesSection } from './components/ServicesSection';
import { ApparelService, FitCut, GarmentSize, Product } from './data/products';

export default function App() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [activeProduct, setActiveProduct] = useState<Product | null>(null);
  const [contactPrefill, setContactPrefill] = useState<ContactPrefill | null>(null);
  const [selectedGender, setSelectedGender] = useState<GenderFilter>('Todos');

  const totalBagCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  const handleAddToCart = (
    product: Product,
    size: GarmentSize,
    fitCut: FitCut,
    quantity = 1
  ) => {
    setCartItems((prev) => {
      const existingIndex = prev.findIndex(
        (entry) =>
          entry.product.id === product.id &&
          entry.size === size &&
          entry.fitCut === fitCut
      );
      if (existingIndex >= 0) {
        const updated = [...prev];
        updated[existingIndex] = {
          ...updated[existingIndex],
          quantity: updated[existingIndex].quantity + quantity,
        };
        return updated;
      }
      return [...prev, { product, size, fitCut, quantity }];
    });
  };

  const handleUpdateQuantity = (
    productId: string,
    size: GarmentSize,
    fitCut: FitCut,
    delta: number
  ) => {
    setCartItems((prev) =>
      prev
        .map((item) => {
          if (
            item.product.id === productId &&
            item.size === size &&
            item.fitCut === fitCut
          ) {
            return { ...item, quantity: item.quantity + delta };
          }
          return item;
        })
        .filter((item) => item.quantity > 0)
    );
  };

  const handleRemoveItem = (
    productId: string,
    size: GarmentSize,
    fitCut: FitCut
  ) => {
    setCartItems((prev) =>
      prev.filter(
        (item) =>
          !(
            item.product.id === productId &&
            item.size === size &&
            item.fitCut === fitCut
          )
      )
    );
  };

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleHeroGenderJump = (line: FitCut) => {
    setSelectedGender(line);
    scrollToSection('catalogo');
  };

  const handleSelectService = (service: ApparelService) => {
    setContactPrefill({
      reason: service.contactReason,
      note: `Me interesa cotizar el servicio: ${service.title} (${service.pricingNote}).`,
      key: Date.now(),
    });
    scrollToSection('contacto');
  };

  const handleRequestCustomInquiry = (productName: string) => {
    setContactPrefill({
      reason: 'Pedido Personalizado',
      productName,
      note: `Quisiera consultar opciones de personalización o pedido por volumen (dama/caballero) para: ${productName}.`,
      key: Date.now(),
    });
    scrollToSection('contacto');
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F8F9FA] text-[#111315]">
      <Header cartCount={totalBagCount} onOpenCart={() => setIsCartOpen(true)} />

      <main className="flex-1">
        <HeroSection onSelectGenderLine={handleHeroGenderJump} />
        <CatalogSection
          selectedGender={selectedGender}
          onSelectGender={setSelectedGender}
          onAddToCart={(product, size, fitCut) =>
            handleAddToCart(product, size, fitCut, 1)
          }
          onSelectProduct={(product) => setActiveProduct(product)}
        />
        <GallerySection onSelectProduct={(product) => setActiveProduct(product)} />
        <ServicesSection onSelectService={handleSelectService} />
        <ContactSection prefill={contactPrefill} />
      </main>

      <Footer />

      <ProductModal
        product={activeProduct}
        onClose={() => setActiveProduct(null)}
        onAddToCart={handleAddToCart}
        onRequestCustomInquiry={handleRequestCustomInquiry}
      />

      <CartDrawer
        isOpen={isCartOpen}
        items={cartItems}
        onClose={() => setIsCartOpen(false)}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onClearCart={() => setCartItems([])}
      />
    </div>
  );
}
