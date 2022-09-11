FROM node:18-slim

RUN apt-get update
RUN apt-get install -y openssl
RUN apt-get install -y procps && rm -rf /var/lib/apt/lists/*

WORKDIR /usr/src/app

COPY package.json ./
COPY *.lock ./
RUN yarn install

COPY . .

EXPOSE 3000

RUN yarn run build
