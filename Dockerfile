
FROM node:18-alpine as base

FROM base as builder

# deps for post-install scripts
RUN apk add --update --no-cache \
    python3 \
    make \
    git \
    g++


WORKDIR /usr/src/app

COPY package.json ./

RUN yarn install

COPY . .

RUN NODE_ENV=production yarn build && yarn build:docs

EXPOSE 40121 40122

CMD [ "node", "dist/start.js" ]