# 应用开发服务器的配置（Windows系统）

## 添加一条域名指向信息至 C:\Windows\System32\drivers\etc\hosts
```
127.0.0.1	www.syncollege.com
```
## Nginx 配置信息
```
worker_processes  1;

events {
    worker_connections  1024;
}


http {
    include       mime.types;
    default_type  application/octet-stream;
    sendfile        on;
    keepalive_timeout  65;

    server {
        # server entry
        listen  80;
        
        location /apps/yourapp/ { # by you
            # frontend
            proxy_pass http://{localhost}:dev_port/; # 本地应用服务器
        }

        location / {  # by yan zhonghua
            # frontend
            proxy_pass http://{dev_server_ip}/; # 开发服务器
        }
    }
}
```

之后通过以下地址访问  

认证系统  
http://www.syncollege.com  
应用  
http://www.syncollege.com/apps/notebook

# 直接访问开发服务器（Windows系统）

## 添加一条域名指向信息至 C:\Windows\System32\drivers\etc\hosts
```
{dev_server_ip}	www.syncollege.com
```
之后通过以下地址访问  
http://www.syncollege.com  