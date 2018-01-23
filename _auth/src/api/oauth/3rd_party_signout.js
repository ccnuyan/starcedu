const signout = (req, res) => {
  req.session.oauthUser = {};
  res.json({
    message: 'oauth session reset',
  });
};

export default signout;
