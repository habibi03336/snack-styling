FROM node:latest

VOLUME ./:./

RUN npm install && \
 CI=false npm run build && \
 tar -cvf front.tar ./build/*


