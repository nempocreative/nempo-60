import type { RefObject } from 'react';
import nailPhoto from '@/assets/ggs-nail-pahlawan.jpg';
import ggsWatermark from '@/assets/ggs-header-footer-v2.png.asset.json';
import './GgsLokerSlide.css';

/** GGS Feed slide 19: static photo slide (v2 header/footer like slides 12–18) — open loker Eyelash & Nail Art; exports as PNG. */
export function GgsLokerSlide({ exportRef }: { exportRef?: RefObject<HTMLElement | null> }) {
  return (
    <div ref={exportRef as RefObject<HTMLDivElement | null>} className="ggl-root">
      <img className="ggl-photo" src={nailPhoto} alt="Kuku nail art" />
      <div className="ggl-shade" />
      <section className="ggl-copy">
        <p className="ggl-kicker">
          <span className="ggl-dot" aria-hidden="true" />
          Lowongan Kerja
        </p>
        <h2 className="ggl-title">
          Open <em>Loker</em>
        </h2>
        <p className="ggl-sub">Gabung jadi bagian tim GGS Beauty Salon &amp; Spa.</p>
        <ul className="ggl-roles">
          <li className="ggl-role">Eyelash Extension</li>
          <li className="ggl-role">Nail Art</li>
        </ul>
      </section>
      <section className="ggl-cta">
        <p className="ggl-cta-label">Kirim lamaran via WhatsApp</p>
        <p className="ggl-cta-value">0823-4277-7723</p>
      </section>
      <img className="ggl-watermark" src={ggsWatermark.url} alt="" aria-hidden="true" />
    </div>
  );
}
