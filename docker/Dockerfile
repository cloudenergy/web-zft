FROM nginx:latest

COPY docker/nginx.conf /etc/nginx/nginx.conf
COPY docker/default.conf /etc/nginx/conf.d/default.conf

COPY .blade/dist /usr/share/nginx/html

WORKDIR /usr/share/nginx/html