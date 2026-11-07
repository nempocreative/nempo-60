import type { RefObject } from 'react';
import nailPhoto from '@/assets/ggs-nail-pahlawan.jpg';
import ggsWatermark from '@/assets/ggs-header-footer.png.asset.json';
import './GgsNailPahlawanSlide.css';

/** GGS Feed slide 9: static photo slide (same header/footer as slide 8) — open loker Eyelash & Nail Art; exports as PNG. */
export function GgsNailPahlawanSlide({ exportRef }: { exportRef?: RefObject<HTMLElement | null> }) {
  return (
    <div ref={exportRef as RefObject<HTMLDivElement | null>} className="ggn-root">
      <img className="ggn-photo" src={nailPhoto} alt="Kuku nail art" />
      <div className="ggn-shade" />
      <section className="ggn-copy">
        <p className="ggn-kicker">
          <span className="ggn-dot" aria-hidden="true" />
          Lowongan Kerja
        </p>
        <h2 className="ggn-title">
          Open <em>Loker</em>
        </h2>
        <p className="ggn-sub">Gabung jadi bagian tim GGS Beauty Salon &amp; Spa.</p>
        <ul className="ggn-roles">
          <li className="ggn-role">Eyelash Extension</li>
          <li className="ggn-role">Nail Art</li>
        </ul>
      </section>
      <section className="ggn-cta">
        <p className="ggn-cta-label">Kirim lamaran via WhatsApp</p>
        <p className="ggn-cta-value">0823-4277-7723</p>
      </section>
      <img className="ggn-watermark" src={ggsWatermark.url} alt="" aria-hidden="true" />
    </div>
  );
}
