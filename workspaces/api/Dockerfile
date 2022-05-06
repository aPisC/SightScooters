FROM node:16-alpine as builder
WORKDIR /app

COPY package.json package.json
COPY workspaces/api workspaces/api

RUN yarn --production=false
RUN yarn workspace api build



FROM node:16-alpine as server

COPY package.json package.json
COPY --from=0 /app/workspaces/api workspaces/api
RUN yarn --production=false

ENV NODE_PORT=80

CMD yarn workspace api start

