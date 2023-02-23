function asyncErrorBoundary(delegate, defaultStatus) {
  return (req, res, next) => {
    Promise.resolve()
      .then(() => delegate(req, res, next))
      .catch((err = {}) => {
        const { status = defaultStatus, message = err } = err;
        next({
          status,
          message,
        });
      });
  };
}

module.exports = asyncErrorBoundary;
