const ctrlWrapper = (ctrl) => {
  const func = async (req, res, next) => {
    try {
      await ctrl(req, res, next);
    } catch (error) {

      if (error.name === "ValidationError") {
          res.status(400).json({ error: error.message });
      } else {
          next(error); // Pass the error to the next middleware (usually the error handling middleware)
      }
      // next(error);
    }
  };

  return func;
};

module.exports = ctrlWrapper;

