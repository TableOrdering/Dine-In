
After the actions options is done : sudo ./svc.sh install
After Installing we need to start the code  : sudo ./svc.sh start 
(And Check the Runner options in the setting Page)

1. sudo apt update
2. sudo apt-get install -y nodejs npm
3. sudo apt-get install -y nginx
4. sudo npm i -g pm2

5. cd /etc/nginx/sites-available
6. sudo nano default

7. location /api {
    rewrite ^\/api\/(.*)$ /api/$1 break;
    proxy_pass http://localhost:8000;
    proxy_set_header Host $host;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
}

ctrl+s then ctrl+x ( to save and exit )

8. sudo systemctl restart nginx
9. cd /path/to/your/app
   pm2 start server.js --name=Backend
10. pm2 restart Backend
