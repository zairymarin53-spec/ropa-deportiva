import { FormEvent, useEffect, useState } from 'react';
import { CheckCircle2, Mail, MapPin, MessageSquare, Phone } from 'lucide-react';
import { PRODUCTS } from '../data/products';

export type ContactReason =
  | 'Equipación de Club / Equipo'
  | 'Pedido Personalizado'
  | 'Asesoría de Talla y Tejido'
  | 'Servicio de Taller / Ajuste';

export interface ContactPrefill {
  reason: ContactReason;
  note?: string;
  productName?: string;
  key: number;
}

interface ContactSectionProps {
  prefill: ContactPrefill | null;
}

const REASONS: ContactReason[] = [
  'Equipación de Club / Equipo',
  'Pedido Personalizado',
  'Asesoría de Talla y Tejido',
  'Servicio de Taller / Ajuste',
];

const GENDER_TARGETS = ['Dama', 'Caballero', 'Mixto (Dama y Caballero)'] as const;
const DISCIPLINES = ['Running', 'Ciclismo', 'Entrenamiento Funcional', 'Trail / Montaña'];
const VOLUME_RANGES = ['1–9 prendas', '10–25 prendas', '26–50 prendas', 'Más de 50 prendas'];
const FIT_PREFERENCES = ['Ajuste Compresión', 'Ajuste Atlético Regular', 'Corte Holgado'];
const WORKSHOP_JOBS = [
  'Ajuste de largo / dobladillo termosellado',
  'Cambio de cremallera sellada',
  'Reparación de costura plana flatlock',
  'Estampado o dorsal adicional',
];
const CHANNELS = ['WhatsApp', 'Correo Electrónico', 'Llamada Telefónica'] as const;

export function ContactSection({ prefill }: ContactSectionProps) {
  const [reason, setReason] = useState<ContactReason>('Equipación de Club / Equipo');
  const [genderTarget, setGenderTarget] =
    useState<(typeof GENDER_TARGETS)[number]>('Mixto (Dama y Caballero)');
  const [discipline, setDiscipline] = useState('Running');
  const [volume, setVolume] = useState('10–25 prendas');
  const [selectedProduct, setSelectedProduct] = useState(PRODUCTS[0].name);
  const [fitPreference, setFitPreference] = useState('Ajuste Atlético Regular');
  const [workshopJob, setWorkshopJob] = useState(WORKSHOP_JOBS[0]);
  const [channel, setChannel] = useState<(typeof CHANNELS)[number]>('WhatsApp');

  const [fullName, setFullName] = useState('');
  const [contactValue, setContactValue] = useState('');
  const [clubOrCity, setClubOrCity] = useState('');
  const [message, setMessage] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [submittedRef, setSubmittedRef] = useState<string | null>(null);

  useEffect(() => {
    if (!prefill) return;
    setReason(prefill.reason);
    if (prefill.productName) {
      setSelectedProduct(prefill.productName);
    }
    if (prefill.note) {
      setMessage(prefill.note);
    }
    setSubmittedRef(null);
  }, [prefill]);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!fullName.trim() || !contactValue.trim()) {
      setErrorMsg('Por favor ingresa tu nombre completo y tu dato de contacto.');
      return;
    }
    setErrorMsg('');
    const code = `CAD-${Math.floor(1000 + Math.random() * 9000)}`;
    setSubmittedRef(code);
  };

  const resetForm = () => {
    setSubmittedRef(null);
    setMessage('');
  };

  return (
    <section id="contacto" className="py-16 lg:py-24 bg-[#F8F9FA]">
      <div className="max-w-[1280px] mx-auto px-6 lg:px-10">
        <div className="mb-10">
          <p className="text-xs font-medium text-[#525866] mb-2">
            Atención Directa y Cotización a Medida · Dama y Caballero
          </p>
          <h2
            className="font-display font-bold tracking-tight text-[#111315] leading-none mb-3"
            style={{ fontSize: 'clamp(2rem, 3.2vw, 3rem)', textWrap: 'balance' }}
          >
            Contacto personalizado según tu necesidad
          </h2>
          <p className="text-sm sm:text-base text-[#525866] max-w-[54ch]">
            Elige el tipo de solicitud y la línea de patronaje (dama, caballero o mixto) para recibir respuesta directa de nuestro equipo.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Adaptive Personalized Form */}
          <div className="lg:col-span-7 bg-white border border-black/10 rounded-lg p-6 sm:p-8">
            {submittedRef ? (
              <div className="py-8 space-y-5">
                <div className="inline-flex items-center gap-2 text-[#15803D] font-semibold text-sm">
                  <CheckCircle2 className="w-5 h-5" />
                  <span>Solicitud recibida correctamente</span>
                </div>

                <h3 className="font-display text-3xl font-bold text-[#111315]">
                  Referencia {submittedRef}
                </h3>

                <p className="text-sm text-[#525866] leading-relaxed">
                  Gracias, <strong className="text-[#111315]">{fullName}</strong>. Hemos registrado tu solicitud de{' '}
                  <strong className="text-[#111315]">{reason}</strong> para línea{' '}
                  <strong className="text-[#111315]">{genderTarget}</strong>. Un especialista de taller te responderá por{' '}
                  <strong className="text-[#111315]">{channel}</strong> ({contactValue}) en menos de 4 horas hábiles.
                </p>

                <div className="p-4 bg-[#F8F9FA] border border-black/8 rounded-md text-xs text-[#525866] space-y-1.5">
                  <div className="flex justify-between gap-4">
                    <span>Motivo seleccionado</span>
                    <span className="font-semibold text-[#111315]">{reason}</span>
                  </div>
                  <div className="flex justify-between gap-4">
                    <span>Patronaje / Línea</span>
                    <span className="font-semibold text-[#111315]">{genderTarget}</span>
                  </div>
                  {(reason === 'Equipación de Club / Equipo' ||
                    reason === 'Pedido Personalizado') && (
                    <>
                      <div className="flex justify-between gap-4">
                        <span>Disciplina</span>
                        <span className="font-semibold text-[#111315]">{discipline}</span>
                      </div>
                      <div className="flex justify-between gap-4">
                        <span>Volumen estimado</span>
                        <span className="font-semibold text-[#111315] tabular-nums">
                          {volume}
                        </span>
                      </div>
                    </>
                  )}
                  {reason === 'Asesoría de Talla y Tejido' && (
                    <>
                      <div className="flex justify-between gap-4">
                        <span>Prenda de interés</span>
                        <span className="font-semibold text-[#111315]">{selectedProduct}</span>
                      </div>
                      <div className="flex justify-between gap-4">
                        <span>Preferencia de calce</span>
                        <span className="font-semibold text-[#111315]">{fitPreference}</span>
                      </div>
                    </>
                  )}
                  {reason === 'Servicio de Taller / Ajuste' && (
                    <div className="flex justify-between gap-4">
                      <span>Trabajo requerido</span>
                      <span className="font-semibold text-[#111315]">{workshopJob}</span>
                    </div>
                  )}
                </div>

                <button
                  type="button"
                  onClick={resetForm}
                  className="px-5 py-2.5 text-sm font-semibold text-white bg-[#111315] hover:bg-[#1D4ED8] rounded-md transition-colors cursor-pointer"
                >
                  Enviar otra consulta
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6" noValidate>
                {/* Step 1: Reason selector */}
                <div>
                  <label className="block text-xs font-semibold text-[#111315] mb-2.5">
                    1. ¿Qué tipo de atención necesitas?
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {REASONS.map((item) => {
                      const active = reason === item;
                      return (
                        <button
                          key={item}
                          type="button"
                          onClick={() => setReason(item)}
                          className={`text-left px-3.5 py-2.5 text-xs sm:text-sm font-medium rounded-md border transition-colors cursor-pointer ${
                            active
                              ? 'bg-[#111315] text-white border-[#111315]'
                              : 'bg-[#F8F9FA] text-[#111315] border-black/10 hover:border-black/30'
                          }`}
                        >
                          {item}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Step 2: Adaptive Context Fields */}
                <div className="p-4 bg-[#F8F9FA] border border-black/8 rounded-md space-y-4">
                  <p className="text-xs font-semibold text-[#525866]">
                    2. Detalles específicos para {reason}
                  </p>

                  <div>
                    <span className="block text-xs font-medium text-[#111315] mb-1.5">
                      Línea de patronaje
                    </span>
                    <div className="flex flex-wrap gap-2">
                      {GENDER_TARGETS.map((target) => {
                        const active = genderTarget === target;
                        return (
                          <button
                            key={target}
                            type="button"
                            onClick={() => setGenderTarget(target)}
                            className={`px-3 py-1.5 text-xs font-semibold rounded-md border transition-colors cursor-pointer ${
                              active
                                ? 'bg-[#1D4ED8] text-white border-[#1D4ED8]'
                                : 'bg-white text-[#525866] border-black/12 hover:text-[#111315]'
                            }`}
                          >
                            {target}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {(reason === 'Equipación de Club / Equipo' ||
                    reason === 'Pedido Personalizado') && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label
                          htmlFor="contact-discipline"
                          className="block text-xs font-medium text-[#111315] mb-1.5"
                        >
                          Disciplina deportiva
                        </label>
                        <select
                          id="contact-discipline"
                          value={discipline}
                          onChange={(e) => setDiscipline(e.target.value)}
                          className="w-full px-3 py-2 text-sm bg-white border border-black/12 rounded-md text-[#111315] focus:outline-none focus:border-[#1D4ED8]"
                        >
                          {DISCIPLINES.map((d) => (
                            <option key={d} value={d}>
                              {d}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <label
                          htmlFor="contact-volume"
                          className="block text-xs font-medium text-[#111315] mb-1.5"
                        >
                          Cantidad estimada
                        </label>
                        <select
                          id="contact-volume"
                          value={volume}
                          onChange={(e) => setVolume(e.target.value)}
                          className="w-full px-3 py-2 text-sm bg-white border border-black/12 rounded-md text-[#111315] focus:outline-none focus:border-[#1D4ED8]"
                        >
                          {VOLUME_RANGES.map((v) => (
                            <option key={v} value={v}>
                              {v}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                  )}

                  {reason === 'Asesoría de Talla y Tejido' && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label
                          htmlFor="contact-product"
                          className="block text-xs font-medium text-[#111315] mb-1.5"
                        >
                          Prenda a consultar
                        </label>
                        <select
                          id="contact-product"
                          value={selectedProduct}
                          onChange={(e) => setSelectedProduct(e.target.value)}
                          className="w-full px-3 py-2 text-sm bg-white border border-black/12 rounded-md text-[#111315] focus:outline-none focus:border-[#1D4ED8]"
                        >
                          {PRODUCTS.map((p) => (
                            <option key={p.id} value={p.name}>
                              {p.name}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <label
                          htmlFor="contact-fit"
                          className="block text-xs font-medium text-[#111315] mb-1.5"
                        >
                          Ajuste preferido
                        </label>
                        <select
                          id="contact-fit"
                          value={fitPreference}
                          onChange={(e) => setFitPreference(e.target.value)}
                          className="w-full px-3 py-2 text-sm bg-white border border-black/12 rounded-md text-[#111315] focus:outline-none focus:border-[#1D4ED8]"
                        >
                          {FIT_PREFERENCES.map((f) => (
                            <option key={f} value={f}>
                              {f}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                  )}

                  {reason === 'Servicio de Taller / Ajuste' && (
                    <div>
                      <label
                        htmlFor="contact-workshop"
                        className="block text-xs font-medium text-[#111315] mb-1.5"
                      >
                        Tipo de intervención en taller
                      </label>
                      <select
                        id="contact-workshop"
                        value={workshopJob}
                        onChange={(e) => setWorkshopJob(e.target.value)}
                        className="w-full px-3 py-2 text-sm bg-white border border-black/12 rounded-md text-[#111315] focus:outline-none focus:border-[#1D4ED8]"
                      >
                        {WORKSHOP_JOBS.map((j) => (
                          <option key={j} value={j}>
                            {j}
                          </option>
                        ))}
                      </select>
                    </div>
                  )}
                </div>

                {/* Step 3: Contact Info & Preferred Channel */}
                <div className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label
                        htmlFor="contact-name"
                        className="block text-xs font-semibold text-[#111315] mb-1.5"
                      >
                        Nombre completo *
                      </label>
                      <input
                        id="contact-name"
                        type="text"
                        required
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        placeholder="Ej. Laura Gómez / Andrés Morales"
                        className="w-full px-3.5 py-2.5 text-sm bg-white border border-black/12 rounded-md text-[#111315] focus:outline-none focus:border-[#1D4ED8]"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="contact-club"
                        className="block text-xs font-semibold text-[#111315] mb-1.5"
                      >
                        Club, equipo o ciudad
                      </label>
                      <input
                        id="contact-club"
                        type="text"
                        value={clubOrCity}
                        onChange={(e) => setClubOrCity(e.target.value)}
                        placeholder="Ej. Club Norte / Ciudad"
                        className="w-full px-3.5 py-2.5 text-sm bg-white border border-black/12 rounded-md text-[#111315] focus:outline-none focus:border-[#1D4ED8]"
                      />
                    </div>
                  </div>

                  <div>
                    <span className="block text-xs font-semibold text-[#111315] mb-2">
                      Canal de respuesta preferido
                    </span>
                    <div className="flex flex-wrap gap-2 mb-3">
                      {CHANNELS.map((ch) => {
                        const active = channel === ch;
                        return (
                          <button
                            key={ch}
                            type="button"
                            onClick={() => setChannel(ch)}
                            className={`px-3.5 py-1.5 text-xs font-semibold rounded-md border transition-colors cursor-pointer ${
                              active
                                ? 'bg-[#1D4ED8] text-white border-[#1D4ED8]'
                                : 'bg-white text-[#525866] border-black/12 hover:text-[#111315]'
                            }`}
                          >
                            {ch}
                          </button>
                        );
                      })}
                    </div>

                    <label
                      htmlFor="contact-value"
                      className="block text-xs font-semibold text-[#111315] mb-1.5"
                    >
                      {channel === 'Correo Electrónico'
                        ? 'Tu correo electrónico *'
                        : 'Tu número de teléfono o WhatsApp *'}
                    </label>
                    <input
                      id="contact-value"
                      type={channel === 'Correo Electrónico' ? 'email' : 'tel'}
                      required
                      value={contactValue}
                      onChange={(e) => setContactValue(e.target.value)}
                      placeholder={
                        channel === 'Correo Electrónico'
                          ? 'nombre@correo.com'
                          : '+57 300 000 0000'
                      }
                      className="w-full px-3.5 py-2.5 text-sm bg-white border border-black/12 rounded-md text-[#111315] focus:outline-none focus:border-[#1D4ED8]"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="contact-message"
                      className="block text-xs font-semibold text-[#111315] mb-1.5"
                    >
                      Comentarios, distribución de tallas o fecha objetivo
                    </label>
                    <textarea
                      id="contact-message"
                      rows={3}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Indícanos tallas de dama y caballero, colores institucionales o fecha de competencia..."
                      className="w-full px-3.5 py-2.5 text-sm bg-white border border-black/12 rounded-md text-[#111315] focus:outline-none focus:border-[#1D4ED8]"
                    />
                  </div>
                </div>

                {errorMsg && (
                  <p role="alert" className="text-xs font-semibold text-[#DC2626]">
                    {errorMsg}
                  </p>
                )}

                <button
                  type="submit"
                  className="w-full sm:w-auto px-7 py-3 text-sm font-semibold text-white bg-[#1D4ED8] hover:bg-[#1E40AF] rounded-md transition-colors cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1D4ED8]"
                >
                  Enviar solicitud personalizada
                </button>
              </form>
            )}
          </div>

          {/* Right Column: Live Personalized Summary & Direct Atelier Channels */}
          <aside className="lg:col-span-5 space-y-6">
            <div className="bg-white border border-black/10 rounded-lg p-6 sm:p-7 space-y-5">
              <div>
                <p className="text-xs font-medium text-[#525866] mb-1">
                  Resumen en tiempo real
                </p>
                <h3 className="text-lg font-semibold text-[#111315]">
                  Configuración de tu consulta
                </h3>
              </div>

              <dl className="divide-y divide-black/6 text-sm">
                <div className="py-3 flex justify-between gap-4">
                  <dt className="text-[#525866]">Atención</dt>
                  <dd className="font-semibold text-[#111315] text-right">{reason}</dd>
                </div>
                <div className="py-3 flex justify-between gap-4">
                  <dt className="text-[#525866]">Patronaje</dt>
                  <dd className="font-semibold text-[#111315] text-right">
                    {genderTarget}
                  </dd>
                </div>
                {(reason === 'Equipación de Club / Equipo' ||
                  reason === 'Pedido Personalizado') && (
                  <>
                    <div className="py-3 flex justify-between gap-4">
                      <dt className="text-[#525866]">Disciplina</dt>
                      <dd className="font-semibold text-[#111315] text-right">{discipline}</dd>
                    </div>
                    <div className="py-3 flex justify-between gap-4">
                      <dt className="text-[#525866]">Volumen</dt>
                      <dd className="font-semibold text-[#111315] tabular-nums text-right">
                        {volume}
                      </dd>
                    </div>
                  </>
                )}
                {reason === 'Asesoría de Talla y Tejido' && (
                  <>
                    <div className="py-3 flex justify-between gap-4">
                      <dt className="text-[#525866]">Prenda</dt>
                      <dd className="font-semibold text-[#111315] text-right">
                        {selectedProduct}
                      </dd>
                    </div>
                    <div className="py-3 flex justify-between gap-4">
                      <dt className="text-[#525866]">Calce</dt>
                      <dd className="font-semibold text-[#111315] text-right">
                        {fitPreference}
                      </dd>
                    </div>
                  </>
                )}
                {reason === 'Servicio de Taller / Ajuste' && (
                  <div className="py-3 flex justify-between gap-4">
                    <dt className="text-[#525866]">Servicio</dt>
                    <dd className="font-semibold text-[#111315] text-right">{workshopJob}</dd>
                  </div>
                )}
                <div className="py-3 flex justify-between gap-4">
                  <dt className="text-[#525866]">Respuesta por</dt>
                  <dd className="font-semibold text-[#1D4ED8] text-right">{channel}</dd>
                </div>
                <div className="py-3 flex justify-between gap-4">
                  <dt className="text-[#525866]">Tiempo estimado</dt>
                  <dd className="font-semibold text-[#111315] tabular-nums text-right">
                    Menos de 4 horas hábiles
                  </dd>
                </div>
              </dl>
            </div>

            <div className="bg-white border border-black/10 rounded-lg p-6 sm:p-7 space-y-4">
              <h3 className="text-base font-semibold text-[#111315]">
                Canales directos del showroom y taller
              </h3>

              <div className="space-y-3 text-sm text-[#525866]">
                <div className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 text-[#111315] mt-1 shrink-0" />
                  <div>
                    <p className="font-medium text-[#111315]">Taller y Sala de Pruebas</p>
                    <p>Av. Estadio Norte 418, Local 3 · Lunes a Sábado 9:00 – 19:00</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <MessageSquare className="w-4 h-4 text-[#111315] mt-1 shrink-0" />
                  <div>
                    <p className="font-medium text-[#111315]">Atención Rápida WhatsApp</p>
                    <p className="tabular-nums">+57 314 555 0192 · Tallaje dama y caballero</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Phone className="w-4 h-4 text-[#111315] mt-1 shrink-0" />
                  <div>
                    <p className="font-medium text-[#111315]">Línea de Clubes y Cotizaciones</p>
                    <p className="tabular-nums">+57 (601) 555 0140</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Mail className="w-4 h-4 text-[#111315] mt-1 shrink-0" />
                  <div>
                    <p className="font-medium text-[#111315]">Correo de Producción</p>
                    <p>taller@cadenciasport.com</p>
                  </div>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}
