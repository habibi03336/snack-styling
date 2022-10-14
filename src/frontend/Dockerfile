FROM node:latest

COPY . /src/front

WORKDIR /src/front

RUN npm install

CMD CI=false npm run build
