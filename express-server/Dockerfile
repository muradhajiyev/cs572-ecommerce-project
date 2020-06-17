# prod stage
FROM node:alpine3.12 as prod

WORKDIR /var/www/app

COPY package*.json ./
 
RUN npm install

COPY . .

ENV NODE_ENV=production

CMD ["npm", "start"]


# dev stage
FROM prod as dev

EXPOSE 3000

ENV NODE_ENV=development

RUN npm install -g nodemon && npm install --only=dev

CMD ["npm", "run", "watch"]
