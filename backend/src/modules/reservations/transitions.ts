import { ReservationStatus } from '@prisma/client';
import { ApiError } from '../../lib/http.js';

const transitions: Record<ReservationStatus, ReservationStatus[]> = {
  REQUESTED: ['REVIEWING', 'CANCELLED'],
  REVIEWING: ['APPROVED', 'DECLINED', 'CANCELLED'],
  APPROVED: ['COMPLETED', 'CANCELLED'],
  DECLINED: [],
  CANCELLED: [],
  COMPLETED: [],
};

export function assertReservationTransition(from: ReservationStatus, to: ReservationStatus) {
  if (!transitions[from].includes(to)) {
    throw new ApiError(409, 'INVALID_STATUS_TRANSITION', `A reservation cannot move from ${from} to ${to}.`);
  }
}
