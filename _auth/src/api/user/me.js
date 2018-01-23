const me = async (req, res) => {
  if (req.session.user) {
    return res.status(200).send({
      message: 'success',
      data: req.session.user,
    });
  }
  res.status(401).send({
    message: 'Unauthenticated',
  });
};

export default me;
