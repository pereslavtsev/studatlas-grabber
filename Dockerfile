FROM node:lts-buster

ENV NPM_CONFIG_LOGLEVEL warn

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

COPY package.json /usr/src/app/
COPY yarn.lock /usr/src/app/
RUN yarn install --production

COPY . /usr/src/app/

RUN yarn build

ENTRYPOINT ["yarn", "start:prod"]
