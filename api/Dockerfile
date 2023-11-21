FROM node:18 as base 

WORKDIR /home/node/app

COPY package*.json ./

RUN npm install

COPY . .


# Production
FROM base as production

ENV NODE_PATH=./build

RUN npm run build