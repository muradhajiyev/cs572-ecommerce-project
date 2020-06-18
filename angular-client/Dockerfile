# init stage
FROM node:alpine3.12 as init

WORKDIR /var/www/app/

COPY package*.json ./

RUN npm install

COPY . .

# dev stage
FROM init as dev

WORKDIR /var/www/app

RUN npm install --only=dev

ENV NODE_ENV=development

EXPOSE 4200

CMD [ "npm", "start" ]

# builder stage
FROM init as builder

WORKDIR /var/www/app/

RUN npm run build -- --output-path=./dist/out --prod

# prod stage
FROM nginx:alpine as prod

COPY --from=builder /var/www/app/dist/out/ /usr/share/nginx/html
COPY --from=builder /var/www/app/config/nginx-custom.conf /etc/nginx/conf.d/default.conf

EXPOSE 80


CMD ["nginx", "-g", "daemon off;"]
