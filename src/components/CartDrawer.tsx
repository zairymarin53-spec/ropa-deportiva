import { FormEvent, useEffect, useState } from 'react';
import { CheckCircle2, Minus, Plus, ShoppingBag, Trash2, X } from 'lucide-react';
import { FitCut, formatPrice, GarmentSize, Product } from '../data/products';
import { ResilientImage } from './ResilientImage';

export interface CartItem {
  product: Product;
  size: GarmentSize;
  fitCut: FitCut;
  quantity: number;
}

interface CartDrawerProps {
  isOpen: boolean;
  items: CartItem[];
  onClose: () => void;
  onUpdateQuantity: (
    productId: string,
    size: GarmentSize,
    fitCut: FitCut,
    delta: number
  ) => void;
  onRemoveItem: (productId: string, size: GarmentSize, fitCut: FitCut) => void;
  onClearCart: () => void;
}

const FREE_SHIPPING_THRESHOLD = 150;
const STANDARD_SHIPPING = 12;

export function CartDrawer({
  isOpen,
  items,
  onClose,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
}: CartDrawerProps) {
  const [step, setStep] = useState<'bag' | 'checkout' | 'confirmed'>('bag');
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [customerAddress, setCustomerAddress] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<'Contra entrega' | 'Tarjeta / Transferencia'>(
    'Contra entrega'
  );
  const [orderNumber, setOrderNumber] = useState('');
  const [confirmedTotal, setConfirmedTotal] = useState(0);
  const [formError, setFormError] = useState('');

  useEffect(() => {
    if (!isOpen) return;
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [isOpen, onClose]);

  useEffect(() => {
    if (isOpen && items.length > 0 && step === 'confirmed') {
      setStep('bag');
    }
  }, [isOpen, items.length, step]);

  if (!isOpen) return null;

  const subtotal = items.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );
  const qualifiesFreeShipping = subtotal >= FREE_SHIPPING_THRESHOLD || subtotal === 0;
  const shippingCost = qualifiesFreeShipping ? 0 : STANDARD_SHIPPING;
  const total = subtotal + shippingCost;
  const missingForFreeShipping = Math.max(0, FREE_SHIPPING_THRESHOLD - subtotal);

  const handleCheckoutSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!customerName.trim() || !customerPhone.trim() || !customerAddress.trim()) {
      setFormError('Completa tu nombre, teléfono y dirección de entrega.');
      return;
    }
    setFormError('');
    setConfirmedTotal(total);
    setOrderNumber(`#${Math.floor(1000 + Math.random() * 9000)}`);
    setStep('confirmed');
    onClearCart();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex justify-end bg-black/50 backdrop-blur-[2px]"
      role="dialog"
      aria-modal="true"
      aria-label="Bolsa de compras"
      onClick={onClose}
    >
      <div
        className="w-full max-w-md bg-white h-full flex flex-col border-l border-black/10"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Drawer Header */}
        <div className="px-6 py-4 border-b border-black/8 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-[#111315]" />
            <h2 className="font-display text-2xl font-bold text-[#111315]">
              {step === 'bag' && 'Tu Bolsa'}
              {step === 'checkout' && 'Finalizar Pedido'}
              {step === 'confirmed' && 'Pedido Confirmado'}
            </h2>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Cerrar bolsa"
            className="w-9 h-9 inline-flex items-center justify-center rounded-md hover:bg-black/5 text-[#111315] cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Drawer Body */}
        <div className="flex-1 overflow-y-auto px-6 py-5">
          {step === 'confirmed' ? (
            <div className="py-8 space-y-5">
              <div className="inline-flex items-center gap-2 text-[#15803D] font-semibold text-sm">
                <CheckCircle2 className="w-5 h-5" />
                <span>Orden verificada</span>
              </div>

              <h3 className="font-display text-3xl font-bold text-[#111315]">
                Pedido {orderNumber} Confirmado — Preparando Envío
              </h3>

              <p className="text-sm text-[#525866] leading-relaxed">
                Gracias, <strong className="text-[#111315]">{customerName}</strong>. Enviaremos el paquete a{' '}
                <strong className="text-[#111315]">{customerAddress}</strong>
                {postalCode ? ` (CP ${postalCode})` : ''}. Método seleccionado:{' '}
                <strong className="text-[#111315]">{paymentMethod}</strong>.
              </p>

              <div className="p-4 bg-[#F8F9FA] border border-black/8 rounded-md text-sm space-y-2">
                <div className="flex justify-between">
                  <span className="text-[#525866]">Total del pedido</span>
                  <span className="font-bold text-[#111315] tabular-nums">
                    {formatPrice(confirmedTotal)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#525866]">Contacto de entrega</span>
                  <span className="font-medium text-[#111315] tabular-nums">
                    {customerPhone}
                  </span>
                </div>
              </div>

              <button
                type="button"
                onClick={() => {
                  setStep('bag');
                  onClose();
                }}
                className="w-full py-3 text-sm font-semibold text-white bg-[#111315] hover:bg-[#1D4ED8] rounded-md transition-colors cursor-pointer"
              >
                Seguir explorando el catálogo
              </button>
            </div>
          ) : items.length === 0 ? (
            <div className="py-16 text-center space-y-4">
              <p className="text-base font-semibold text-[#111315]">
                Tu bolsa está vacía
              </p>
              <p className="text-sm text-[#525866]">
                Agrega prendas de dama o caballero del catálogo para calcular envío y completar tu compra.
              </p>
              <button
                type="button"
                onClick={onClose}
                className="px-5 py-2.5 text-sm font-semibold text-white bg-[#1D4ED8] hover:bg-[#1E40AF] rounded-md transition-colors cursor-pointer"
              >
                Ir al catálogo
              </button>
            </div>
          ) : step === 'bag' ? (
            <div className="space-y-5">
              {/* Free shipping threshold indicator */}
              <div className="p-3.5 bg-[#F8F9FA] border border-black/8 rounded-md text-xs text-[#525866]">
                {qualifiesFreeShipping ? (
                  <span className="font-semibold text-[#15803D]">
                    Tu pedido incluye envío estándar gratuito (compras desde {formatPrice(FREE_SHIPPING_THRESHOLD)}).
                  </span>
                ) : (
                  <span>
                    Te faltan{' '}
                    <strong className="text-[#111315] tabular-nums">
                      {formatPrice(missingForFreeShipping)}
                    </strong>{' '}
                    para obtener envío gratuito.
                  </span>
                )}
              </div>

              <ul className="divide-y divide-black/8">
                {items.map((item) => (
                  <li
                    key={`${item.product.id}-${item.fitCut}-${item.size}`}
                    className="py-4 flex gap-4 items-start"
                  >
                    <div className="w-20 h-16 rounded bg-[#EFEFEF] overflow-hidden shrink-0 border border-black/8">
                      <ResilientImage
                        src={item.product.image}
                        alt={item.product.name}
                        className="w-full h-full object-cover"
                        fallbackLabel={item.product.sku}
                      />
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2">
                        <h3 className="text-sm font-semibold text-[#111315] leading-snug">
                          {item.product.name}
                        </h3>
                        <button
                          type="button"
                          onClick={() =>
                            onRemoveItem(item.product.id, item.size, item.fitCut)
                          }
                          aria-label={`Eliminar ${item.product.name} (${item.fitCut}, talla ${item.size})`}
                          className="text-[#525866] hover:text-[#DC2626] p-1 cursor-pointer"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>

                      <p className="text-xs text-[#525866] mt-0.5 mb-2.5">
                        Corte {item.fitCut} · Talla {item.size} ·{' '}
                        {formatPrice(item.product.price)} c/u
                      </p>

                      <div className="flex items-center justify-between">
                        <div className="inline-flex items-center border border-black/15 rounded h-8">
                          <button
                            type="button"
                            onClick={() =>
                              onUpdateQuantity(
                                item.product.id,
                                item.size,
                                item.fitCut,
                                -1
                              )
                            }
                            aria-label="Restar unidad"
                            className="w-8 h-full inline-flex items-center justify-center hover:bg-black/5 cursor-pointer"
                          >
                            <Minus className="w-3.5 h-3.5" />
                          </button>
                          <span className="w-8 text-center text-xs font-semibold tabular-nums">
                            {item.quantity}
                          </span>
                          <button
                            type="button"
                            onClick={() =>
                              onUpdateQuantity(
                                item.product.id,
                                item.size,
                                item.fitCut,
                                1
                              )
                            }
                            aria-label="Sumar unidad"
                            className="w-8 h-full inline-flex items-center justify-center hover:bg-black/5 cursor-pointer"
                          >
                            <Plus className="w-3.5 h-3.5" />
                          </button>
                        </div>

                        <span className="text-sm font-bold text-[#111315] tabular-nums">
                          {formatPrice(item.product.price * item.quantity)}
                        </span>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          ) : (
            <form id="checkout-form" onSubmit={handleCheckoutSubmit} className="space-y-4">
              <div className="p-3.5 bg-[#F8F9FA] border border-black/8 rounded-md text-xs space-y-1">
                <div className="flex justify-between text-[#525866]">
                  <span>Total a pagar ({items.reduce((a, b) => a + b.quantity, 0)} prendas)</span>
                  <span className="font-bold text-[#111315] tabular-nums">
                    {formatPrice(total)}
                  </span>
                </div>
                <p className="text-[#525866]">
                  Envío gratis desde {formatPrice(FREE_SHIPPING_THRESHOLD)}. Pago contra entrega disponible.
                </p>
              </div>

              <div>
                <label
                  htmlFor="ck-name"
                  className="block text-xs font-semibold text-[#111315] mb-1"
                >
                  Nombre completo *
                </label>
                <input
                  id="ck-name"
                  type="text"
                  required
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  className="w-full px-3 py-2 text-sm border border-black/15 rounded-md focus:outline-none focus:border-[#1D4ED8]"
                />
              </div>

              <div>
                <label
                  htmlFor="ck-phone"
                  className="block text-xs font-semibold text-[#111315] mb-1"
                >
                  Teléfono / WhatsApp *
                </label>
                <input
                  id="ck-phone"
                  type="tel"
                  required
                  value={customerPhone}
                  onChange={(e) => setCustomerPhone(e.target.value)}
                  className="w-full px-3 py-2 text-sm border border-black/15 rounded-md focus:outline-none focus:border-[#1D4ED8]"
                />
              </div>

              <div>
                <label
                  htmlFor="ck-address"
                  className="block text-xs font-semibold text-[#111315] mb-1"
                >
                  Dirección de envío *
                </label>
                <input
                  id="ck-address"
                  type="text"
                  required
                  value={customerAddress}
                  onChange={(e) => setCustomerAddress(e.target.value)}
                  className="w-full px-3 py-2 text-sm border border-black/15 rounded-md focus:outline-none focus:border-[#1D4ED8]"
                />
              </div>

              <div>
                <label
                  htmlFor="ck-postal"
                  className="block text-xs font-semibold text-[#111315] mb-1"
                >
                  Código postal
                </label>
                <input
                  id="ck-postal"
                  type="text"
                  value={postalCode}
                  onChange={(e) => setPostalCode(e.target.value)}
                  className="w-full px-3 py-2 text-sm border border-black/15 rounded-md focus:outline-none focus:border-[#1D4ED8]"
                />
              </div>

              <div>
                <span className="block text-xs font-semibold text-[#111315] mb-1.5">
                  Forma de pago
                </span>
                <div className="grid grid-cols-2 gap-2">
                  {(['Contra entrega', 'Tarjeta / Transferencia'] as const).map((method) => (
                    <button
                      key={method}
                      type="button"
                      onClick={() => setPaymentMethod(method)}
                      className={`py-2 px-3 text-xs font-semibold rounded-md border cursor-pointer ${
                        paymentMethod === method
                          ? 'bg-[#111315] text-white border-[#111315]'
                          : 'bg-white text-[#111315] border-black/15'
                      }`}
                    >
                      {method}
                    </button>
                  ))}
                </div>
              </div>

              {formError && (
                <p role="alert" className="text-xs font-semibold text-[#DC2626]">
                  {formError}
                </p>
              )}
            </form>
          )}
        </div>

        {/* Drawer Footer */}
        {items.length > 0 && step !== 'confirmed' && (
          <div className="px-6 py-5 border-t border-black/8 bg-[#F8F9FA] space-y-4">
            <div className="space-y-1.5 text-sm">
              <div className="flex justify-between text-[#525866]">
                <span>Subtotal</span>
                <span className="tabular-nums font-medium text-[#111315]">
                  {formatPrice(subtotal)}
                </span>
              </div>
              <div className="flex justify-between text-[#525866]">
                <span>Envío</span>
                <span className="tabular-nums font-medium text-[#111315]">
                  {shippingCost === 0 ? 'Gratuito' : formatPrice(shippingCost)}
                </span>
              </div>
              <div className="flex justify-between text-base font-bold text-[#111315] pt-2 border-t border-black/8">
                <span>Total</span>
                <span className="tabular-nums">{formatPrice(total)}</span>
              </div>
            </div>

            {step === 'bag' ? (
              <button
                type="button"
                onClick={() => setStep('checkout')}
                className="w-full py-3 text-sm font-semibold text-white bg-[#1D4ED8] hover:bg-[#1E40AF] rounded-md transition-colors cursor-pointer"
              >
                Continuar al envío
              </button>
            ) : (
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setStep('bag')}
                  className="px-4 py-3 text-sm font-semibold text-[#111315] bg-white border border-black/15 rounded-md hover:bg-black/5 cursor-pointer"
                >
                  Volver
                </button>
                <button
                  type="submit"
                  form="checkout-form"
                  className="flex-1 py-3 text-sm font-semibold text-white bg-[#1D4ED8] hover:bg-[#1E40AF] rounded-md transition-colors cursor-pointer"
                >
                  Confirmar pedido · {formatPrice(total)}
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
