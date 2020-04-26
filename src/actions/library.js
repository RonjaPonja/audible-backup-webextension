export const RECEIVE_LIBRARY = 'RECEIVE_LIBRARY';

export function receiveLibrary(library) {
  return {
    type: RECEIVE_LIBRARY,
    library,
  };
}
