# stage 1
FROM node:20.11-alpine as builder
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install
COPY . .
RUN npx ng build --configuration production 

# #stage 2
# FROM nginx:alpine
# COPY --from=builder /app/dist /usr/share/html
# COPY ./gateway/nginx.conf /etc/nginx/
# COPY ./gateway/default.conf /etc/nginx/conf.d/

