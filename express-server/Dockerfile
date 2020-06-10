FROM node:10

RUN mkdir -p /var/www/app

WORKDIR /var/www/app

RUN npm install -g nodemon

COPY package.json .

RUN npm install

COPY . .

EXPOSE 3000

CMD ["npm", "run", "watch"]