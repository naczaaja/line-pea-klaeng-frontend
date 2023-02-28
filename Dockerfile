# Stage 1: Compile and Build angular codebase

# Use official node image as the base image
FROM node:19-alpine3.16 as build

# Set the working directory
# RUN mkdir /app/lineoa-klaeng/frontend
WORKDIR /usr/src/app/lineoa-klaeng/frontend

# Install all the dependencies
COPY package.json package-lock.json ./
RUN npm install

# Add the source code to app
COPY . .

# Generate the build of the application
RUN npm run build --production

FROM certbot/certbot

# Stage 2: Serve app with nginx server

# Use official nginx image as the base image
FROM nginx:1.23.3-alpine

ADD nginx.conf /etc/nginx/conf.d/default.conf

# Copy the build output to replace the default nginx contents.
COPY --from=build /usr/src/app/lineoa-klaeng/frontend/dist/frontend /usr/share/nginx/html

RUN apt-get update && \
    apt-get install -y certbot && \
    certbot --nginx -d c2.pea-klaeng.com --non-interactive --agree-tos -m chirayu.chomsri@gmail.com && \
    sed -i 's/listen 80;/listen 80;\n    return 301 https:\/\/$host$request_uri;/' /etc/nginx/conf.d/default.conf && \
    sed -i 's/# ssl_/ssl_/' /etc/nginx/conf.d/default.conf

# Expose port 80
EXPOSE 80 443

ENTRYPOINT ["nginx", "-g", "daemon off;"]
