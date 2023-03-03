FROM node:19-alpine3.16 as build
WORKDIR /source-code/line-pea-klaeng-frontend
COPY package.json package-lock.json ./
RUN npm install
COPY . .
RUN npm run build


FROM nginx:1.23.3-alpine
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /source-code/line-pea-klaeng-frontend/dist/frontend /usr/share/nginx/html
EXPOSE 80
ENTRYPOINT ["nginx", "-g", "daemon off;"]
