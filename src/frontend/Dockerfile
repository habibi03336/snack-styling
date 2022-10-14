FROM node:latest

COPY . /src/front

WORKDIR /src/front

RUN npm install && \
 mkdir file

CMD CI=false npm run build && \
 tar -cvf file/front.tar ./build/*