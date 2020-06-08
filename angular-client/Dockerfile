FROM node:10

ENV path /var/www/app/angular

RUN mkdir -p ${path}

WORKDIR ${path}

COPY package.json ${path}

RUN npm install

COPY . ${path}

EXPOSE 4200

CMD [ "npm", "start" ]

