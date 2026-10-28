import { describe, expect, it } from 'vitest';
import { assertReservationTransition } from '../src/modules/reservations/transitions.js';

describe('reservation lifecycle', () => {
  it('allows the supported approval path', () => {
    expect(() => assertReservationTransition('REQUESTED', 'REVIEWING')).not.toThrow();
    expect(() => assertReservationTransition('REVIEWING', 'APPROVED')).not.toThrow();
    expect(() => assertReservationTransition('APPROVED', 'COMPLETED')).not.toThrow();
  });

  it('rejects invalid jumps and terminal state changes', () => {
    expect(() => assertReservationTransition('REQUESTED', 'COMPLETED')).toThrow(/cannot move/);
    expect(() => assertReservationTransition('DECLINED', 'APPROVED')).toThrow(/cannot move/);
    expect(() => assertReservationTransition('CANCELLED', 'REVIEWING')).toThrow(/cannot move/);
  });
});
