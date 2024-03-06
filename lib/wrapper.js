/*
 * Wrapper for async functions to catch errors and pass them to the next middleware
 * @param {Object} context - The context of the function
 * @param {Function} fn - The function to be wrapped
 */
module.exports = (context, fn) => {
	return (req, res, next) => {
		return context[fn].bind(context)(req, res).catch(err => next(err));
	};
};
