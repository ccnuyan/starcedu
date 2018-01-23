const signout = (req, res) => {
  req.session.tenant = {};
  res.json({
    message: 'tenant session reset',
  });
};

export default signout;

