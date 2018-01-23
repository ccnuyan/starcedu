export default (req, res, next) => {
  if (req.tenant && req.tenant.id) {
    return next();
  }
  res.status(401).send({
    code: 401,
    message: 'tenant unauthenticated',
  });
};
