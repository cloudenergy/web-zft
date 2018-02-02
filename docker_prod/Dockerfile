FROM nginx:latest

COPY docker_prod/nginx.conf /etc/nginx/nginx.conf
COPY docker_prod/default.conf /etc/nginx/conf.d/default.conf

COPY .blade/dist /usr/share/nginx/html

WORKDIR /usr/share/nginx/html
