FROM node:latest

RUN mkdir -p /src/front

WORKDIR /src/front
CMD npm install && \
 CI=false npm run build
