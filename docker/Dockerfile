FROM node:7

COPY . /opt/app/

WORKDIR /opt/app

RUN cd /opt/app && npm install

EXPOSE 8080

CMD ["npm", "run", "dev"]