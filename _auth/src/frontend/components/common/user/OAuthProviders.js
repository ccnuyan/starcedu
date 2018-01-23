import React from 'react';

const OAuthProviders = () => {
  return (
    <div>
      <div className="ui divider"></div>
      <a href="/oauth/luanch/qq">
        <i className="qq yellow icon"></i>
          QQ
      </a>
      {' | '}
      <a href=""><i className="wechat grey icon"></i>微信</a>
      {' | '}
      <a href=""><i className="weibo grey icon"></i>微博</a>
      {' | '}
      <a href=""><i className="paypal grey icon"></i>支付宝</a>
    </div>
  );
};

export default OAuthProviders;
