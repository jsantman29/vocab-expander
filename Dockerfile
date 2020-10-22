# A Docker image that builds and serves a React App on port 80 using nginx.

# Stage 1 - the build process
FROM node:current-alpine as build
WORKDIR /usr/src/app
COPY package.json yarn.lock ./
RUN yarn
COPY . ./
RUN yarn build

# Stage 2 - the production environment
FROM nginx
COPY --from=build /usr/src/app/build /usr/share/nginx/html
EXPOSE 80
# CMD ["nginx", "-g", "daemon off;"]