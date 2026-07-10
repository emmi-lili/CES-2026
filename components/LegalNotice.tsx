/**
 * Aviso legal / descargo de responsabilidad. El summit es un evento educativo
 * y de networking; nada de lo expuesto constituye asesoría financiera.
 */
export default function LegalNotice() {
  return (
    <section className="border-t border-white/5 bg-black px-4 py-8">
      <div className="mx-auto max-w-3xl text-center">
        <h3 className="font-mono text-[11px] font-semibold uppercase tracking-[0.25em] text-white/40">
          Aviso legal
        </h3>
        <p className="mt-3 text-xs leading-relaxed text-white/40">
          El Crypto Experience Summit 2026 es un evento educativo y de
          networking. El contenido de las conferencias, paneles y materiales
          refleja la opinión personal de cada expositor y tiene fines
          exclusivamente informativos. Nada de lo presentado durante el evento
          constituye asesoría financiera, legal, tributaria o de inversión, ni
          una recomendación de compra o venta de activos digitales. Las
          inversiones en criptoactivos conllevan un alto riesgo y pueden
          resultar en la pérdida total del capital; cada asistente es
          responsable de sus propias decisiones. La organización no se
          responsabiliza por pérdidas económicas derivadas de acciones tomadas
          en base a la información compartida.
        </p>
      </div>
    </section>
  );
}
