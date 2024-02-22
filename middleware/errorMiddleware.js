const notFound = (req, res, next) => {
  res.status(404);
  next();
};

const errorHandler = (req, res, next) => {
  let statuscode = res.statuscode === 200 ? 500 : res.statuscode;
  let message = err.message;
};

module.exports = { notFound, errorHandler };
