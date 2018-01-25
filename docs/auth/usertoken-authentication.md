# 用户 Token 认证

>FOR  
local-tenant-client-app  

用户Token认证需要加 Header

`authorization: bearer ${access_token}`

其中 `access_token` 有几种获得方式:

1 local-tenant-client-app: 调用用户登入接口后获得

2 oauth-tenant-web-app: 使用OAuth服务登入后获得

__PS__： `local-tenant-web-app` 调用任何服务时都不需要此认证

# 用户 Token 解析

>FOR  
`local-tenant-web-app` [backend as server] 

使用json web token标准

解码后
```
{
     "id": "275699011862660097",
     "username": "ccnuyan@gmail.com",
     "to": "oauth_test_tenant1",
     "iat": 1516160064,
     "exp": 1517369664,
     "iss": "local" 
}
```
secret的开发配置是'12345678'.  
secret生产环境的配置再定.


