/**
 * Nempo Feed slides 35–36 — Kala Muda recruitment timelines.
 * Slide 35 ("team") reuses the smooth 3D carousel schedule from
 * ggs-nail-cards-timeline (same keyframe times and poses) but emits
 * `kmr-`-prefixed keyframes so both decks can live on one page.
 * Slide 36 ("info") reveals requirements, divisions and the sign-up
 * steps in sequence, holds, then fades out for a seamless loop.
 * The CSS keyframes are generated from this schedule so preview and
 * MP4 match.
 */
import {
  NAIL_CARDS_COUNT,
  NAIL_CARDS_DURATION,
  FAN_START,
  FAN_IN,
  FAN_OUT,
  turnStart,
  cardPose,
  keyTimes,
  type CardPose,
} from './ggs-nail-cards-timeline';

export const KMR_DURATION = NAIL_CARDS_DURATION;
export const KMR_TEAM_CARDS = NAIL_CARDS_COUNT;
const MOVE = 0.9;
const holdEnd = (card: number) =>
  card === NAIL_CARDS_COUNT - 1 ? FAN_START : turnStart(card + 1) - MOVE;

const pct = (t: number) => `${Math.round((t / KMR_DURATION) * 100000) / 1000}%`;
const EASE = 'cubic-bezier(.45,0,.2,1)';
const transform = (pose: CardPose) =>
  `translate3d(${pose.tx}cqw,${pose.ty}cqw,${pose.tz}cqw) rotate(${pose.rot}deg) rotateY(${pose.ry}deg) scale(${pose.scale})`;

function opacityWindow(name: string, from: number, to: number, fade: number, rise = 0): string {
  const hidden = `opacity:0;transform:translateY(${rise}cqw)`;
  const shown = 'opacity:1;transform:translateY(0)';
  const start = from <= 0 ? `0%{${shown}}` : `0%{${hidden}}${pct(from)}{${hidden}}${pct(from + fade)}{${shown}}`;
  return `@keyframes ${name}{${start}${pct(to - fade)}{${shown}}${pct(to)}{${hidden}}100%{${hidden}}}`;
}

/** Full CSS for the slide 35 team carousel; the root's `kmr-` styles do the rest. */
export function buildKmrTeamCss(): string {
  const rules: string[] = [];
  const times = keyTimes();
  for (let card = 0; card < NAIL_CARDS_COUNT; card++) {
    const frames = times
      .map((t) => {
        const pose = cardPose(card, t);
        return `${pct(t)}{transform:${transform(pose)};opacity:${pose.opacity};animation-timing-function:${EASE}}`;
      })
      .join('');
    rules.push(`@keyframes kmr-card-${card}{${frames}}`);
    rules.push(`.kmr-card[data-i="${card}"]{animation-name:kmr-card-${card}}`);
    const start = turnStart(card) + 0.15;
    rules.push(
      `@keyframes kmr-sheen-${card}{0%,${pct(start)}{transform:translateX(-130%)}${pct(start + 0.9)},100%{transform:translateX(130%)}}`,
      `.kmr-card[data-i="${card}"] .kmr-sheen{animation-name:kmr-sheen-${card}}`,
    );
    rules.push(opacityWindow(`kmr-note-${card}`, turnStart(card) - 0.2, holdEnd(card) + 0.3, 0.35, 1));
    rules.push(`.kmr-note[data-i="${card}"]{animation-name:kmr-note-${card}}`);
    const dotOn = Math.max(turnStart(card) - MOVE, 0);
    const dotOff = holdEnd(card);
    const dotStart = card === 0 ? '0%' : `0%,${pct(dotOn)}{opacity:.35;transform:scaleX(1)}${pct(turnStart(card))}`;
    rules.push(
      `@keyframes kmr-dot-${card}{${dotStart},${pct(dotOff)}{opacity:1;transform:scaleX(2.6)}${pct(dotOff + MOVE)},${pct(FAN_START)}{opacity:.35;transform:scaleX(1)}${pct(FAN_IN)},${pct(FAN_OUT)}{opacity:1;transform:scaleX(1)}100%{opacity:${card === 0 ? '1;transform:scaleX(2.6)' : '.35;transform:scaleX(1)'}}}`,
      `.kmr-dot[data-i="${card}"]{animation-name:kmr-dot-${card}}`,
    );
  }
  rules.push(opacityWindow('kmr-final', FAN_IN - 0.5, FAN_OUT + 0.4, 0.4, 1));
  return rules.join('\n');
}

/**
 * Slide 36 info schedule (seconds): title, "siapa yang bisa daftar",
 * division chips, sign-up steps, then the WhatsApp CTA. Everything
 * holds from INFO_HOLD until INFO_FADE_OUT, then fades for the loop.
 */
export const INFO_TITLE_IN = 0;
export const INFO_WHO_IN = 1.0;
export const INFO_DIVISIONS_IN = 3.2;
export const INFO_STEPS_IN = 6.6;
export const INFO_CTA_IN = 9.4;
export const INFO_FADE_OUT = 14.2;

export const INFO_DIVISIONS = [
  'Designer',
  'Web Developer',
  'Content Creator',
  'Videografer & Fotografer',
  'Marketing',
  'Event Management',
] as const;
export const INFO_WHO = ['Pelajar SMP/SMA/SMK', 'Mahasiswa', 'Umum / pekerja'] as const;
export const INFO_STEPS = [
  'Isi formulir di nempo.id/komunitas',
  'Formulir terkirim ke WhatsApp kami',
  'Tim Kala Muda menghubungi kamu',
] as const;

/** Full CSS for the slide 36 info reveal; the root's `kmi-` styles do the rest. */
export function buildKmrInfoCss(): string {
  const rules: string[] = [];
  const out = INFO_FADE_OUT;
  rules.push(opacityWindow('kmi-title', INFO_TITLE_IN, out, 0.7, 2));
  rules.push(opacityWindow('kmi-who-head', INFO_WHO_IN, out, 0.5, 1.4));
  INFO_WHO.forEach((_, i) => {
    rules.push(opacityWindow(`kmi-who-${i}`, INFO_WHO_IN + 0.35 + i * 0.3, out, 0.4, 1.2));
    rules.push(`.kmi-who[data-i="${i}"]{animation-name:kmi-who-${i}}`);
  });
  rules.push(opacityWindow('kmi-free', INFO_WHO_IN + 1.4, out, 0.45, 1));
  rules.push(opacityWindow('kmi-div-head', INFO_DIVISIONS_IN, out, 0.5, 1.4));
  INFO_DIVISIONS.forEach((_, i) => {
    rules.push(opacityWindow(`kmi-div-${i}`, INFO_DIVISIONS_IN + 0.3 + i * 0.32, out, 0.4, 1.2));
    rules.push(`.kmi-div[data-i="${i}"]{animation-name:kmi-div-${i}}`);
  });
  rules.push(opacityWindow('kmi-steps-head', INFO_STEPS_IN, out, 0.5, 1.4));
  INFO_STEPS.forEach((_, i) => {
    rules.push(opacityWindow(`kmi-step-${i}`, INFO_STEPS_IN + 0.3 + i * 0.45, out, 0.45, 1.2));
    rules.push(`.kmi-step[data-i="${i}"]{animation-name:kmi-step-${i}}`);
  });
  rules.push(opacityWindow('kmi-cta', INFO_CTA_IN, KMR_DURATION, 0.6, 1.6));
  return rules.join('\n');
}
