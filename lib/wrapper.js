/*
 * Wrapper for async functions to catch errors and pass them to the next middleware
 *
 * @param {Object} context - The context of the function
 * @param {Function} fn - The function to be wrapped
 *
 * or
 *
 * @param {Function} fn - The function to be wrapped
 */
module.exports = (context, fn) => {
  const { length } = arguments;
  if (length === 2) {
    return (req, res, next) => {
      return context[fn].bind(context)(req, res).catch(err => next(err));
    };
  } else if (length === 1) {
    return (req, res, next) => {
      fn(req, res).catch(err => next(err));
    };
  } else {
    throw new TypeError('Invalid arguments');
  }

};