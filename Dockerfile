FROM node:latest
MAINTAINER Rodrigo Cipriani da Rosa
COPY . /var/www
WORKDIR /var/www
ENTRYPOINT npm i
EXPOSE 3000