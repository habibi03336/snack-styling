FROM node:latest

VOLUME ./:/src/front
WORKDIR /src/front

RUN npm install && \
 CI=false npm run build && \
 tar -cvf front.tar ./build/*


