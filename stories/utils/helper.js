/* Helper Functions */

const throttle = (limit, func) => {
  let lastFunc;
  let lastRan;
  return function(...rest) {
    const context = this;
    const args = rest;
    if (!lastRan) {
      func.apply(context, args);
      lastRan = Date.now();
      return;
    }
    clearTimeout(lastFunc);
    lastFunc = setTimeout(() => {
      if ((Date.now() - lastRan) >= limit) {
        func.apply(context, args);
        lastRan = Date.now();
      }
    }, limit - (Date.now() - lastRan));
  };
};

export {
  throttle
};
