[![Build Status](https://www.travis-ci.org/ccnuyan/starcedu.svg?branch=master)](https://www.travis-ci.org/ccnuyan/starcedu)

[系统架构](/docs/arch/readme.md)

系统支持三种租户应用情景

1. local-tenant-client-app  
    * android笔记应用  
    * 笔记桌面端应用
1. local-tenant-web-app  
    * 网盘应用
    * 如web笔记应用
1. oauth-tenant-web-app      

# Goto:

## 开发配置

1. [应用程序开发配置](/docs/config/app-dev-config.md)

## 认证中间件

1. [Session Authentication](/docs/auth/session-authentication.md)

1. [User Token Authentication](/docs/auth/usertoken-authentication.md)

1. [Tenant Authentication](/docs/auth/tenant-authentication.md)

## 用户业务

1. [用户 API](/_auth/src/api/test/api.user.md)

## 网盘业务

1. [用户网盘 API](/_disk/src/api/test/api.user.disk.md)

1. [租户网盘 API](/_disk/src/api/test/api.tenant.disk.md)