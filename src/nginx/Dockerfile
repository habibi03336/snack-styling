FROM nginx:latest

COPY ./config /etc/nginx/

RUN apt-get update
    
CMD ["nginx", "-g", "daemon off;"]

EXPOSE 80 
