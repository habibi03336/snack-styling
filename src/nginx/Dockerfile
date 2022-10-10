FROM nginx:latest

COPY ./config /etc/nginx/

VOLUME ../frontend/build:/frontend

RUN apt-get update 
#  apt-get install certbot -y && \
#  certbot certonly -i nginx --dns-route53 -d *.${domain_name} --dry-run

CMD ["nginx"]

EXPOSE 80