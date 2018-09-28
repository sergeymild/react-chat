// CREDIT: Jhey Tompkins on Throttling and Debouncing in Javascript (codeburst.io)
// WEB: https://codeburst.io/throttling-and-debouncing-in-javascript-b01cad5c8edf

/* Helper Functions */

const throttle = (limit, action) => {
  let lastAction = null;
  let lastExecution = null;
  return ((...rest) => {
    const context = this;
    const args = rest;
    if (!lastExecution) {
      action.apply(context, args);
      lastExecution = Date.now();
      return;
    }
    clearTimeout(lastAction);
    lastAction = setTimeout(() => {
      if ((Date.now() - lastExecution) >= limit) {
        action.apply(context, args);
        lastExecution = Date.now();
      }
    }, limit - (Date.now() - lastExecution));
  });
};

export {
  throttle
};
