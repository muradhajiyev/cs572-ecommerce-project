# builder stage
FROM node:alpine3.12 as builder

WORKDIR /usr/www/app/

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build -- --output-path=./dist/out --prod


# prod stage
FROM nginx:alpine as prod

COPY --from=builder /usr/www/app/dist/out/ /usr/share/nginx/html
# COPY /nginx.conf /etc/nginx/conf.d/default.conf


# dev stage
FROM node:alpine3.12 as dev

WORKDIR /var/www/app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 4200

CMD [ "npm", "start" ]