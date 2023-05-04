FROM node:16.18.1-alpine3.17

ENV DOCKER_BUILDKIT_SESSION_TIMEOUT=600

ENV YARN_NETWORK_TIMEOUT=1000000

WORKDIR /usr/src/backend

COPY package.json yarn.lock ./

RUN yarn install

COPY . .

RUN yarn build

CMD ["sh","-c","yarn dev"]