import type { RefObject } from 'react';
import kidPhoto from '@/assets/ggs-story-kid-nails.jpg';
import storyOverlay from '@/assets/ggs-story-header-footer.png.asset.json';
import './GgsStoryCoverSlide.css';

/** GGS Story slide 04: reels-size (9:16) cover with the owner's story header/footer overlay. */
export function GgsStoryCoverSlide({ exportRef }: { exportRef?: RefObject<HTMLElement | null> }) {
  return (
    <main
      ref={exportRef as RefObject<HTMLElement | null>}
      aria-label="GGS Beauty — Story slide 04, peduli penampilan dari kecil"
      className="ggc-root"
    >
      <img
        className="ggc-photo"
        src={kidPhoto}
        alt="Anak memamerkan nail art bunga sambil memegang coaster GGS Studio Beauty"
      />
      <div className="ggc-shade" />
      <section className="ggc-copy">
        <span className="ggc-rule" aria-hidden="true" />
        <h2 className="ggc-title">
          <span>Peduli Penampilan</span>
          <em>dari Kecil</em>
        </h2>
        <span className="ggc-rule" aria-hidden="true" />
      </section>
      <img className="ggc-overlay" src={storyOverlay.url} alt="" aria-hidden="true" />
    </main>
  );
}
