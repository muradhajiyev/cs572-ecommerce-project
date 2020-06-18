# prod stage
FROM node:wheezy as prod

WORKDIR /var/www/app

COPY package*.json ./
 
RUN npm install

COPY . .

ENV NODE_ENV=production

CMD ["npm", "start"]


# dev stage
FROM prod as dev

RUN npm install -g nodemon && npm install --only=dev

EXPOSE 3000

ENV NODE_ENV=development

CMD ["npm", "run", "watch"]
