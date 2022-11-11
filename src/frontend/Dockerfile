FROM node:latest

COPY . /src/frontend

WORKDIR /src/frontend

RUN npm install && \
 mkdir result

CMD CI=false npm run build && \
 tar -cvf result/front.tar ./build/*