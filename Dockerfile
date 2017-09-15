FROM node:latest
MAINTAINER Rodrigo Cipriani da Rosa
COPY . /var/www
WORKDIR /var/www
RUN npm install
ENTRYPOINT npm start
EXPOSE 3000
