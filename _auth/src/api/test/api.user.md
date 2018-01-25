# 用户业务API

BaseUrl:`/`  
Endpoint: `api/:from/*`  
Authentications:  
[session](../../../../docs/auth/session-authentication.md)     
[tenant](../../../../docs/auth/tenant-authentication.md)  
[usertoken](../../../../docs/auth/usertoken-authentication.md)  

from有两个值:
1. `local` for local-tenant-web-app  
2. `tenant` for local-tenant-client-app & oauth-tenant-client-app
## 1. 登入  

>FOR:  
local-tenant-web-app: session   
local-tenant-client-app: tenant

Endpoint: `api/:from/user/signin`  
Method: `POST`  
Request:
```
{  
    "username":"user@test.com",
    "password":"testpass",
}
```  

Response 400:

```
status[400]:{"message":"username empty"}
status[400]:{"message":"password empty"}
status[400]:{"message":"provided username illigal"}
status[400]:{"message":"provided password illigal"}
status[400]:{"message":"credentials invalid"}
```

Response OK:

local-tenant-web-app:  
1. Without valid `oauthUser` object in session
```
status[200]:{  
   "data":{  
      "id":"251795677628072963",
      "username":"user@test.com",
   },
   "message":"authenticate successfully"
}
```
2. With valid `oauthUser` object in session
```
status[200]:{  
   "data":{  
      "id":"251795677628072963",
      "username":"user@test.com",
   },
   "message":"authenticate and bind successfully"
}
```
local-tenant-client-app:  
```
status[200]:{  
   "data":{  
      "id":"251795677628072963",
      "username":"user@test.com",
      "token":$string
   },
   "message":"authenticate successfully"
}
```
## 2. 注册

>FOR:  
local-tenant-web-app: session  
local-tenant-client-app: tenant

Endpoint: `api/:from/user/signup`  
Method: `POST`  
Request:
```
{  
    "username":"user@test.com",
    "password":"testpass",
}
```  

Response 400:

```
status[400]:{"message":"username empty"}
status[400]:{"message":"password empty"}
status[400]:{"message":"provided username illigal"}
status[400]:{"message":"provided password illigal"}
status[400]:{"message":"user with this username already existed"}
```

Response OK:  
local-tenant-web-app:  
1. Without valid `oauthUser` object in session
```
status[200]:{  
   "data":{  
      "id":"255528588483232905",
      "username":"user@test.com",
   },
   "message":"register successfully"
}
```
2. With valid `oauthUser` object in session
```
status[200]:{  
   "data":{  
      "id":"255528588483232905",
      "username":"user@test.com",
   },
   "message":"bind and register successfully"
}
```
local-tenant-client-app:  
```
status[200]:{  
   "data":{  
      "id":"251795677628072963",
      "username":"user@test.com",
      "token":$string
   },
   "message":"register successfully"
}
```
## 3. 更新密码

>FOR:  
local-tenant-web-app: session  
local-tenant-client-app: tenant & usertoken  

Endpoint: `api/:from/user/update_password`  
Method: `PUT`  
Params: 
```
{  
    "old_password":"oldpassword",
    "new_password":"newpassword",
}
```
Response 400: 
```
status[400]:{"message":"old_password empty"}
status[400]:{"message":"new_password empty"}
status[400]:{"message":"provided old_password illigal"}
status[400]:{"message":"provided new_password illigal"}
status[400]:{"message":"credentials invalid"}
```
Response OK:  
```
status[200]:{  
   "data":{  
      "id":"251795677628072963",
      "username":"user@test.com",
   },
   "message":"authenticate successfully"
}
```