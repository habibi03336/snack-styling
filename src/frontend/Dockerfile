FROM node:latest

WORKDIR /src/front
COPY ./ /src/front

RUN npm install && \
 CI=false npm run build
