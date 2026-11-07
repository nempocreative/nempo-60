import { describe, expect, it } from 'vitest';
import { cardPhase, cardPose, deckAt, FAN_IN, FAN_OUT, NAIL_CARDS_COUNT, NAIL_CARDS_DURATION, turnStart } from './ggs-nail-cards-timeline';

describe('GGS slide 21 nail art card deck', () => {
  it('shows each of the five designs up front, one at a time, in order', () => {
    for (let card = 0; card < NAIL_CARDS_COUNT; card++) {
      const mid = turnStart(card) + 1.2;
      expect(cardPhase(card, mid)).toBe('front');
      for (let other = 0; other < NAIL_CARDS_COUNT; other++) {
        if (other !== card) expect(cardPhase(other, mid)).not.toBe('front');
      }
    }
  });

  it('fans every card out together at the end', () => {
    for (let card = 0; card < NAIL_CARDS_COUNT; card++) {
      expect(cardPhase(card, FAN_IN)).toBe('fan');
      expect(cardPhase(card, FAN_OUT)).toBe('fan');
    }
  });

  it('loops seamlessly: the deck at the end matches the start', () => {
    expect(NAIL_CARDS_DURATION).toBe(15);
    for (let card = 0; card < NAIL_CARDS_COUNT; card++) {
      expect(cardPose(card, NAIL_CARDS_DURATION)).toEqual(cardPose(card, 0));
    }
    expect(deckAt(0)).toEqual([0, 1, 2, 3, 4]);
  });
});
