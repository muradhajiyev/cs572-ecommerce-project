FROM node:alpine3.12

RUN mkdir -p /var/www/app

WORKDIR /var/www/app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 4200
# EXPOSE 49153

CMD [ "npm", "start" ]

