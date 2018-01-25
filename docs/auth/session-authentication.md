# Session 认证

>FOR  
local-tenant-web-app [frontend]  

Session 认证用于 `local-tenant-web-app`，前端调用用户相关API请携带以下cookie访问

key: `connect.sid`  

# Session 解析

>FOR  
`local_tenant_web_app` [backend as server]  

## How to get session's id in redis:

Session ID Format in cookie  
key: `connect.sid`  
value: 
```
  s:${crypto.createHmac('sha256', secret)
      .update(decodeURIComponent(sesionid))
      .digest('base64')
      .replace(/\=+$/, '')}
```

Redis sessionid prefix: 'sess:'

### Example:

* value of connect.sid:
`s%3AzlV2novTfZbZb2ocU7f383zY9yESBgQG.pDyFCoZoVKNLa%2FpIAE%2FaDx2ueXwWAYHm1%2Bra0cqo5fU`

* url decoded:
`s:zlV2novTfZbZb2ocU7f383zY9yESBgQG.pDyFCoZoVKNLa/pIAE/aDx2ueXwWAYHm1+ra0cqo5fU`

* verification:  
```
crypto.createHmac('sha256', '12345678')
      .update('zlV2novTfZbZb2ocU7f383zY9yESBgQG')
      .digest('base64')
      .replace(/\=+$/, '') 
```

`pDyFCoZoVKNLa/pIAE/aDx2ueXwWAYHm1+ra0cqo5fU`

* session id in redis:  
`sess:zlV2novTfZbZb2ocU7f383zY9yESBgQG`  

* query result:  
```
{
  "user": {
    "id": "267207801858688392",
    "username": "ccnuyan@gmail.com",
  }
  "cookie": { // cookie 字段只供参考，非认证主站请勿使用, 
    "originalMaxAge": 1209600000,
    "expires": "2018-01-19T01:18:56.535Z",
    "httpOnly": true,
    "path": "/"
  },
  "oauthUser": // 非认证主站请勿使用, 
  "tenant": // 非认证主站请勿使用, 
  "callback": // 非认证主站请勿使用, 
}
```

secret的开发配置是'12345678'.  
secret生产环境的配置再定.