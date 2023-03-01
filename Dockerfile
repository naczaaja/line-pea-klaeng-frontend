FROM node:19-alpine3.16 as build
WORKDIR /usr/src/app/lineoa-klaeng/frontend
COPY package.json package-lock.json ./
RUN npm install
COPY . .
RUN npm run build


FROM nginx:1.23.3-alpine
COPY nginx.conf /etc/nginx/nginx.conf
COPY --from=build /usr/src/app/lineoa-klaeng/frontend/dist/frontend /usr/share/nginx/html
EXPOSE 80
ENTRYPOINT ["nginx", "-g", "daemon off;"]
