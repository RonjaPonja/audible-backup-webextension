export const RECEIVE_REQUESTED = 'RECEIVE_REQUESTED';

export function receiveRequested(requested) {
  return {
    type: RECEIVE_REQUESTED,
    requested,
  };
}
