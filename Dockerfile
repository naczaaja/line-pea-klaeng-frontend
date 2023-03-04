FROM node:19-alpine3.16 as build
WORKDIR /src/app/frontend
RUN npm cache clean --force
COPY package.json package-lock.json ./
RUN npm install
COPY . .
RUN npm run build --prod


FROM nginx:1.23.3-alpine
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /src/app/frontend/dist/frontend /usr/share/nginx/html
EXPOSE 80
ENTRYPOINT ["nginx", "-g", "daemon off;"]
