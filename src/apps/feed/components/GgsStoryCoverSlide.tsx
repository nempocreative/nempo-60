import type { RefObject } from 'react';
import teamPhoto from '@/assets/ggs-team-professional-pink.jpg';
import storyOverlay from '@/assets/ggs-story-header-footer.png.asset.json';
import './GgsStoryCoverSlide.css';

/** GGS Story slide 04: reels-size (9:16) cover with the owner's story header/footer overlay. */
export function GgsStoryCoverSlide({ exportRef }: { exportRef?: RefObject<HTMLElement | null> }) {
  return (
    <main
      ref={exportRef as RefObject<HTMLElement | null>}
      aria-label="GGS Beauty — Story slide 04, sampul reels"
      className="ggc-root"
    >
      <img className="ggc-photo" src={teamPhoto} alt="Tim GGS Beauty berseragam jas pink" />
      <div className="ggc-shade" />
      <section className="ggc-copy">
        <h2 className="ggc-title">
          GGS <em>Beauty</em>
        </h2>
        <span className="ggc-rule" aria-hidden="true" />
        <p className="ggc-sub">Salon &amp; Spa</p>
        <p className="ggc-place">Jl. Cimanuk No. 309, Sukagalih, Garut</p>
      </section>
      <img className="ggc-overlay" src={storyOverlay.url} alt="" aria-hidden="true" />
    </main>
  );
}
