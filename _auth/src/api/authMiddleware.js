export default (req, res, next) => {
  if (req.user && req.user.id) {
    return next();
  }
  return res.status(401).send({
    code: 401,
    message: 'user unauthenticated',
  });
};
