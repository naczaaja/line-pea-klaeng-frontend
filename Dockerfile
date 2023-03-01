FROM node:19-alpine3.16 as build
WORKDIR /usr/src/app/lineoa-klaeng/frontend
COPY package.json package-lock.json ./
RUN npm install
COPY . .
RUN npm run build-prod


FROM nginx:1.23.3-alpine
ADD nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /usr/src/app/lineoa-klaeng/frontend/dist/frontend /usr/share/nginx/html
# Install Certbot and obtain certificate
RUN apt-get update && \
    apt-get install -y certbot && \
    certbot --nginx -d pea-klaeng.com --non-interactive --agree-tos -m chirayu.chomsri@gmail.com && \
    sed -i 's/# ssl_/ssl_/' /etc/nginx/conf.d/default.conf
EXPOSE 80 443
ENTRYPOINT ["nginx", "-g", "daemon off;"]
