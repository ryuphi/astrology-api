
FROM node:12-alpine as builder

RUN apk add --no-cache python make g++

RUN mkdir -p /home/node/app

WORKDIR /home/node/app

COPY . .

RUN npm install --production


FROM node:12-alpine

RUN mkdir -p /home/node/app

WORKDIR /home/node/app

USER node

COPY --chown=node:node --from=builder /home/node/app .

EXPOSE 3000

CMD [ "node", "index" ]