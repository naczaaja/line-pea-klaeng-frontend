FROM node:19-alpine3.16 as build
WORKDIR /src/app/frontend
RUN npm cache clean --force
COPY package.json package-lock.json ./
COPY . .
RUN npm install
RUN npm run build


FROM nginx:1.23.3-alpine as ngi
RUN rm -rf /usr/share/nginx/html/*
COPY nginx.conf /etc/nginx/nginx.conf
COPY --from=build /src/app/frontend/dist/frontend /usr/share/nginx/html
EXPOSE 80
ENTRYPOINT ["nginx", "-g", "daemon off;"]
