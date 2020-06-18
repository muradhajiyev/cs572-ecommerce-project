FROM pkosiec/mongo-seeding:3.4.1

WORKDIR /data-import

COPY . .

ENV DB_URI=mongodb://mongodb/ecommerce
ENV DROP_DATABASE=true