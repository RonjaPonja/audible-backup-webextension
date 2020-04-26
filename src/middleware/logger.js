const logger = (store) => (next) => (action) => {
  /* eslint-disable no-console */
  console.group(action.type);
  console.log('The action: ', action);
  const returnValue = next(action);
  console.log('The new state: ', store.getState());
  console.groupEnd();
  /* eslint-enable no-console */
  return returnValue;
};

export default logger;
