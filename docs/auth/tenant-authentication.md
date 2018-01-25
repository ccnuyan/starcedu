# 租户认证

>FOR  
local-tenant-client-app  
local-tenant-web-app [backend as client]  
oauth-tenant-web-app [backend as client]  

租户认证 使用 Http Baisc Authentication：需要添加 Header   
key: `starcedu-tenant-authorization`  
value: `basic ${base64encode(tenant_id:tenant_pass)}`  

其中 `tenant_id/tenant_pass` 由系统管理员提供

