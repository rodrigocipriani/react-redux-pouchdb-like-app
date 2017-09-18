FROM node:latest
MAINTAINER Rodrigo Cipriani da Rosa
RUN mkdir -p /opt/likeapp
COPY . /opt/likeapp

WORKDIR /opt/likeapp
RUN npm install && npm cache clean --force

WORKDIR /opt/likeapp/client
RUN npm install && npm cache clean --force

WORKDIR /opt/likeapp/server
RUN npm install && npm cache clean --force

WORKDIR /opt/likeapp
ENTRYPOINT npm start

EXPOSE 3000
