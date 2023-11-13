export default (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;

  err.status = err.status || "error";
  console.error(err.stack);

  res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
    stack: err.stack,
    error: err,
  });

  if (err.code === "11000") {
  }
};
