# Stage 1: Compile and Build angular codebase

# Use official node image as the base image
FROM node:19-alpine3.16 as build

# Set the working directory
# RUN mkdir /app/lineoa-klaeng/frontend
WORKDIR /app/lineoa-klaeng/frontend

# Add the source code to app
COPY ./ ./

# Install all the dependencies
RUN npm install

# Generate the build of the application
RUN npm run build

# Stage 2: Serve app with nginx server

# Use official nginx image as the base image
FROM nginx:1.23.3-alpine

COPY nginx.conf /etc/nginx/nginx.conf

# Copy the build output to replace the default nginx contents.
COPY --from=build /app/lineoa-klaeng/frontend/dist/frontend /usr/share/nginx/html

# Expose port 80
EXPOSE 80

ENTRYPOINT ["nginx", "-g", "daemon off;"]
