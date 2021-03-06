# 用户网盘API

BaseUrl:`/apps/disk/`  
Endpoint: `api/:from/*`  
Authentications:  
[session](../../../../docs/auth/session-authentication.md)  
[usertoken](../../../../docs/auth/usertoken-authentication.md)  

from有两个值:
1. `local` for local-tenant-web-app  
2. `tenant` for local-tenant-client-app & oauth-tenant-client-app

所有服务需 用户token 认证, baseUrl: /apps/disk/
## 1. 请求上传令牌
>FOR:  
local-tenant-web-app: session  
local-tenant-client-app: usertoken  
oauth-tenant-client-app: usertoken

Endpoint: `api/:from/files/`  
Method: `POST`    
Request:
```
{
    filename:$filename
}
```
Response:
```
status[200]:{
    message: 'token created',
    data:   
    { 
        id: '275849625351488583',
        uploader_id: '1234567890',
        title: null,
        filename: 'filename',
        etag: null,
        mime: null,
        size: null,
        uploaded_at: '2018-01-16T06:23:57.861Z',
        file_status: 0,
        success: true,
        message: 'New file created',
        token: $token 
    }
}
```

## 2. 请求网盘单个文件访问地址
>FOR:  
local-tenant-web-app: session  
local-tenant-client-app: usertoken  
oauth-tenant-client-app: usertoken

Endpoint: `api/:from/files/access?file_id={$file_id}`  
Method: `GET`  
Response:  
1. Ajax:
```
{
    message: 'access url retrived',
    data:{
        access_url:#access_url
    }
}
```
2. Browser:  
Redirect(301) to file access_url

## 3. 请求网盘单个文件详情
>FOR:  
local-tenant-web-app: session  
local-tenant-client-app: usertoken  
oauth-tenant-client-app: usertoken

Endpoint: `api/:from/files?file_id={$file_id}`  
Method: `GET`  
Response:
```
status[200]:{ 
    message: 'file get',
    data:
    { 
        id: '275851386145473610',
        uploader_id: '1234567890',
        title: null,
        filename: 'filename',
        etag: 'abcdefg',
        mime: 'text/html',
        size: 123,
        uploaded_at: '2018-01-16T06:27:27.776Z',
        file_status: 1,
        success: true,
        message: 'Required file found' 
    } 
}
```
## 4. 请求已上传网盘文件列表
>FOR:  
local-tenant-web-app: session  
local-tenant-client-app: usertoken  
oauth-tenant-client-app: usertoken

Endpoint: `api/:from/files/uploaded`  
Method: `GET`  

Response:
```
{ 
    message: 'files get',
    data:[ { 
            id: '275710677916582930',
            uploader_id: '275710677136442427',
            filename: 'filename',
            title: null,
            etag: 'abcdefg',
            mime: 'text/html',
            size: 123,
            uploaded_at: '2018-01-16T01:47:54.049Z',
            status: 1 
        } 
        ...
    ] 
}
```
## 5. 添加远程文件至网盘
>FOR:  
local-tenant-web-app: session  
local-tenant-client-app: usertoken  
oauth-tenant-client-app: usertoken

Endpoint: `api/:from/files/remote`  
Method: `POST`    
Request:
```
{
    filename:$filename
    file_url:$file_url
}
```
Response:
```
status[200]：{ 
    message: 'file created',
    data: { 
        id: '275715293370647585',
        uploader_id: '275715290585629777',
        title: null,
        filename: 'ccnu.jpg',
        etag: 'FnZ-CRvqHbJ5KtGfGYVX92ULrA-V',
        mime: 'image/jpeg',
        size: 79420,
        uploaded_at: '2018-01-16T01:57:04.244Z',
        file_status: 1,
        success: true,
        message: 'File updated' 
    } 
}
```
## 6. 更新文件状态（用于回调）// 生产环境不调用
__PS__: 此服务无需认证  
Endpoint: `api/files/upload_callback`  
Method: `POST`  
Request:
```
{
    etag,
    mime,
    size,
    id
}
```
Response: 
```
status[200]: { 
    id: '275717083138884643',
    uploader_id: '275717082534904915',
    title: null,
    filename: 'filename',
    etag: 'abcdefg',
    mime: 'text/html',
    size: 123,
    uploaded_at: '2018-01-16T02:00:37.609Z',
    file_status: 1,
    success: true,
    message: 'File updated' 
}
```


## 0. 其他网盘服务  

__PS__: 以下服务不建议租户应用调用,可在前端引导用户前往网盘应用完成以下业务
1. 更新网盘文件名
Endpoint: `api/:from/files?file_id={$file_id}`  
Method: `PUT`
Params: `uploader_id, file_id, title`
1. 删除网盘文件
Endpoint: `api/:from/files?file_id={$file_id}`  
Method: `DELETE`  
Params: `uploader_id, file_id`  


