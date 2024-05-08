module.exports = (schema) => async (req, res, next) => {
    try {
      await schema.validate(req.body);
      next();
    } catch (error) {
      console.error(error);
      res.status(400).send({ error: error.errors });
    }
  };