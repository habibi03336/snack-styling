FROM node:latest

COPY . /src/frontend

WORKDIR /src/frontend

RUN npm install && \
 mkdir file

CMD CI=false npm run build && \
 tar -cvf file/front.tar ./build/*