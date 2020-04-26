export const POPUP_OPENED = 'POPUP_OPENED';

export function popupOpened() {
  return {
    type: POPUP_OPENED,
    time: Math.round((new Date()).getTime() / 1000),
  };
}
