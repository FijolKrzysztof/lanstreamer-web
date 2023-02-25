FROM node:18-alpine as build
WORKDIR /usr/local/app
COPY ./ /usr/local/app/
RUN npm install --force
RUN npm run build

FROM nginx:latest
COPY ./nginx.conf /etc/nginx/nginx.conf
COPY --from=build /usr/local/app/dist/lanstreamer-web /usr/share/nginx/html
EXPOSE 80
