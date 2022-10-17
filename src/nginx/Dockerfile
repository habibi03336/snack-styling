FROM nginx:latest

COPY ./config /etc/nginx/

RUN apt-get update && \
    envsubst < /etc/nginx/mysite.conf.template
#  apt-get install certbot -y && \
#  certbot certonly -i nginx --dns-route53 -d *.${domain_name} --dry-run

CMD ["nginx", "-g", "daemon off;"]

EXPOSE 80