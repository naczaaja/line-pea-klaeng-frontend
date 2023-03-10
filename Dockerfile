FROM node:19-alpine3.16 as build
WORKDIR /src/app/frontend
RUN npm cache clean --force
COPY package.json package-lock.json ./
COPY . .
RUN npm install
RUN npm run build


FROM nginx:1.23.3-alpine as ngi
RUN rm -rf /usr/share/nginx/html/*
RUN apt-get update && \
  apt-get install -y certbot python3-certbot-nginx && \
  apt-get clean && \
  rm -rf /var/lib/apt/lists/*
COPY nginx.conf /etc/nginx/nginx.conf
COPY --from=build /src/app/frontend/dist/frontend /usr/share/nginx/html
EXPOSE 80 443
ENTRYPOINT ["nginx", "-g", "daemon off;"]
