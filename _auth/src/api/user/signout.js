const signout = (req, res) => {
  req.session.oauthUser = {};
  req.session.user = {};
  res.json({
    message: 'user session reset',
  });
};

export default signout;

