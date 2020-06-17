FROM node:alpine3.12

WORKDIR /var/www/app

RUN npm install -g nodemon

COPY package.json .

RUN npm install

COPY . .

EXPOSE 3000

CMD ["npm", "run", "watch"]