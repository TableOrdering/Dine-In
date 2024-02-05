const asyncHandler = (fn) => async (req, res, next) => {
  try {
    await fn(req, res, next);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: err.message });
  }
};

export default asyncHandler;
