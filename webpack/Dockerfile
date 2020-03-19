FROM node:12-alpine as builder
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

FROM nginx:1-alpine
WORKDIR /app
COPY --from=builder /app/dist ./www
COPY ./server ./server
RUN chmod +x ./server/init_app.sh \
   && cp ./server/nginx.conf /etc/nginx/nginx.conf
CMD /bin/sh -c "./server/init_app.sh"