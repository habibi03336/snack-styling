FROM nginx:latest

COPY ./config /etc/nginx/

RUN apt-get update && \
    envsubst < /etc/nginx/mysite.conf.template
    
CMD ["nginx", "-g", "daemon off;"]

EXPOSE 80 
