import type { RefObject } from 'react';
import salonPhoto from '@/assets/ggs-we-are-open-pink.jpg';
import ggsWatermark from '@/assets/ggs-header-footer-v2.png.asset.json';
import './GgsOpenHoursSlide.css';

/** GGS Feed slide 23: "We are open" every day 09.00 – 21.00, framed for the v2 header/footer; exports as PNG. */
export function GgsOpenHoursSlide({ exportRef }: { exportRef?: RefObject<HTMLElement | null> }) {
  return (
    <div
      ref={exportRef as RefObject<HTMLDivElement | null>}
      className="ggh-root"
      aria-label="GGS Beauty — We are open, setiap hari jam 09.00 sampai 21.00"
    >
      <img
        className="ggh-photo"
        src={salonPhoto}
        alt="Ruangan salon GGS Beauty dengan nuansa pink"
      />
      <div className="ggh-shade" />
      <section className="ggh-copy">
        <h2 className="ggh-title">We are open</h2>
        <span className="ggh-rule" aria-hidden="true" />
        <p className="ggh-hours">
          <span>09.00</span>
          <em>&ndash;</em>
          <span>21.00</span>
        </p>
        <p className="ggh-days">Setiap hari</p>
      </section>
      <img className="ggh-watermark" src={ggsWatermark.url} alt="" aria-hidden="true" />
    </div>
  );
}
