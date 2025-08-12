module.exports = function catchMulterError(multerMiddleware) {
  return function (req, res, next) {
    multerMiddleware(req, res, function (err) {
      if (err) {
        // console for debug
        console.error(" Multer error caught:", err.message);
        return next(err); // Pass to error handler
      }
      next();
    });
  };
};
