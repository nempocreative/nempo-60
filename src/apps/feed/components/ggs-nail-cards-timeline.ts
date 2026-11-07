/**
 * GGS Feed slide 21 — "Pilih Nail Art Favoritmu" card deck timeline.
 * One shared clock drives every card: each design is pulled from the deck,
 * shown up front, tucked back, and at the end all cards fan out together.
 * The CSS keyframes are generated from this schedule so preview and MP4 match.
 */
export const NAIL_CARDS_DURATION = 15;
export const NAIL_CARDS_COUNT = 5;
const FIRST_TURN = 0.8;
const TURN = 2.2;
const PULL = 0.35;
const LAND = 0.8;
const HOLD_END = 1.8;
const TUCK = 2.2;
const RETURN = 2.8;
export const FAN_START = 12.0;
export const FAN_IN = 12.8;
export const FAN_OUT = 14.2;
const EPS = 1e-6;

export type CardPose = { tx: number; ty: number; rot: number; ry: number; scale: number; z: number };
export type CardPhase = 'stack' | 'pull' | 'front' | 'tuck' | 'fan';

export const turnStart = (card: number) => FIRST_TURN + card * TURN;
const isLast = (card: number) => card === NAIL_CARDS_COUNT - 1;
const holdEnd = (card: number) => (isLast(card) ? FAN_START : turnStart(card) + HOLD_END);

const stackPose = (depth: number): CardPose => ({
  tx: depth * 2.6, ty: depth * -1.8, rot: 3 + depth * 3, ry: 0, scale: 0.84 - depth * 0.025, z: 10 - depth,
});
const PULL_POSE: CardPose = { tx: 36, ty: -3, rot: 14, ry: -18, scale: 0.92, z: 30 };
const FRONT_POSE: CardPose = { tx: 0, ty: 0, rot: 0, ry: 0, scale: 1, z: 30 };
const TUCK_POSE: CardPose = { tx: -34, ty: 3, rot: -13, ry: 14, scale: 0.88, z: 25 };
const fanPose = (card: number): CardPose => {
  const offset = card - (NAIL_CARDS_COUNT - 1) / 2;
  return { tx: offset * 15, ty: Math.abs(offset) * 3.2 + 4, rot: offset * 9, ry: 0, scale: 0.58, z: 20 + card };
};

/** Cards waiting in the deck at time t, front first. */
export function deckAt(t: number): number[] {
  const events: { time: number; card: number; kind: 'out' | 'in' }[] = [];
  for (let card = 0; card < NAIL_CARDS_COUNT; card++) {
    events.push({ time: turnStart(card) + PULL, card, kind: 'out' });
    if (!isLast(card)) events.push({ time: turnStart(card) + RETURN, card, kind: 'in' });
  }
  events.sort((a, b) => a.time - b.time);
  const deck = Array.from({ length: NAIL_CARDS_COUNT }, (_, i) => i);
  for (const event of events) {
    if (event.kind === 'out' && event.time < t - EPS) deck.splice(deck.indexOf(event.card), 1);
    if (event.kind === 'in' && event.time <= t + EPS) deck.push(event.card);
  }
  return deck;
}

export function cardPhase(card: number, t: number): CardPhase {
  if (t >= NAIL_CARDS_DURATION - EPS) return 'stack';
  if (t >= FAN_IN - EPS && t <= FAN_OUT + EPS) return 'fan';
  const start = turnStart(card);
  if (Math.abs(t - (start + PULL)) < EPS) return 'pull';
  if (t >= start + LAND - EPS && t <= holdEnd(card) + EPS) return 'front';
  if (!isLast(card) && Math.abs(t - (start + TUCK)) < EPS) return 'tuck';
  return 'stack';
}

/** Pose of a card at one of its keyframe times. */
export function cardPose(card: number, t: number): CardPose {
  if (t >= NAIL_CARDS_DURATION - EPS) return stackPose(card);
  const phase = cardPhase(card, t);
  if (phase === 'fan') return fanPose(card);
  if (phase === 'pull') return PULL_POSE;
  if (phase === 'front') return FRONT_POSE;
  if (phase === 'tuck') return TUCK_POSE;
  const depth = deckAt(t).indexOf(card);
  return stackPose(Math.max(depth, 0));
}

/** Times (seconds) where this card needs a keyframe. */
export function cardKeyTimes(card: number): number[] {
  const start = turnStart(card);
  const times = [0, start, start + PULL, start + LAND, holdEnd(card), FAN_START, FAN_IN, FAN_OUT, NAIL_CARDS_DURATION];
  if (!isLast(card)) times.push(start + TUCK, start + RETURN);
  for (let other = 0; other < card; other++) {
    // Cards behind shift forward when a card in front of them is pulled out.
    const removal = turnStart(other) + PULL;
    if (deckAt(removal).includes(card)) times.push(removal, turnStart(other) + LAND);
  }
  for (let other = card + 1; other < NAIL_CARDS_COUNT; other++) {
    const removal = turnStart(other) + PULL;
    if (removal > start + RETURN && removal < FAN_START) times.push(removal, turnStart(other) + LAND);
  }
  return [...new Set(times.map((time) => Math.round(time * 1000) / 1000))].sort((a, b) => a - b);
}

const pct = (t: number) => `${Math.round((t / NAIL_CARDS_DURATION) * 100000) / 1000}%`;
const EASE = 'cubic-bezier(.65,0,.25,1)';
const transform = (pose: CardPose) =>
  `translate3d(${pose.tx}cqw,${pose.ty}cqw,0) rotate(${pose.rot}deg) rotateY(${pose.ry}deg) scale(${pose.scale})`;

function opacityWindow(name: string, from: number, to: number, fade: number, rise = 0): string {
  const hidden = `opacity:0;transform:translateY(${rise}cqw)`;
  const shown = 'opacity:1;transform:translateY(0)';
  return `@keyframes ${name}{0%{${hidden}}${pct(from)}{${hidden}}${pct(from + fade)}{${shown}}${pct(to - fade)}{${shown}}${pct(to)}{${hidden}}100%{${hidden}}}`;
}

/** Full CSS for the deck animation; the root's `ggn-` styles do the rest. */
export function buildNailCardsCss(): string {
  const rules: string[] = [];
  for (let card = 0; card < NAIL_CARDS_COUNT; card++) {
    const frames = cardKeyTimes(card)
      .map((t) => {
        const pose = cardPose(card, t);
        return `${pct(t)}{transform:${transform(pose)};z-index:${pose.z};animation-timing-function:${EASE}}`;
      })
      .join('');
    rules.push(`@keyframes ggn-card-${card}{${frames}}`);
    rules.push(`.ggn-card[data-i="${card}"]{animation-name:ggn-card-${card}}`);
    const start = turnStart(card);
    const sheen = `@keyframes ggn-sheen-${card}{0%,${pct(start + LAND)}{transform:translateX(-130%)}${pct(start + LAND + 0.7)},100%{transform:translateX(130%)}}`;
    rules.push(sheen, `.ggn-card[data-i="${card}"] .ggn-sheen{animation-name:ggn-sheen-${card}}`);
    rules.push(opacityWindow(`ggn-note-${card}`, start + 0.55, holdEnd(card) + 0.25, 0.3, 1.2));
    rules.push(`.ggn-note[data-i="${card}"]{animation-name:ggn-note-${card}}`);
    const dotOn = start + PULL;
    const dotOff = holdEnd(card) + 0.4;
    rules.push(
      `@keyframes ggn-dot-${card}{0%,${pct(dotOn)}{opacity:.35;transform:scaleX(1)}${pct(dotOn + 0.3)},${pct(dotOff)}{opacity:1;transform:scaleX(2.6)}${pct(dotOff + 0.3)},${pct(FAN_IN - 0.3)}{opacity:.35;transform:scaleX(1)}${pct(FAN_IN)},${pct(FAN_OUT)}{opacity:1;transform:scaleX(1)}100%{opacity:.35;transform:scaleX(1)}}`,
      `.ggn-dot[data-i="${card}"]{animation-name:ggn-dot-${card}}`,
    );
  }
  rules.push(opacityWindow('ggn-final', FAN_IN - 0.4, FAN_OUT + 0.3, 0.4, 1.2));
  return rules.join('\n');
}
