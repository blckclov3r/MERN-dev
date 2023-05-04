FROM node:16.18.1-alpine3.17

ENV DOCKER_BUILDKIT_SESSION_TIMEOUT=600

ENV YARN_NETWORK_TIMEOUT=1000000

WORKDIR /usr/src/frontend

COPY yarn.lock ./

RUN yarn install

COPY . .

EXPOSE 3000

RUN yarn build

CMD ["sh","-c","yarn dev"]