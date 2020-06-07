FROM node:10

ENV path=/var/www/app/express-server

RUN mkdir -p ${path}

WORKDIR ${path}

COPY package.json ${path}

RUN npm install

RUN npm install -g nodemon

COPY . ${path}

EXPOSE 3000

CMD ["npm", "run", "watch"]