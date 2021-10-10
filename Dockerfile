FROM node:16.10.0-bullseye-slim as base

ENV PATH /app/server_root/node_modules/.bin:/app/client_root/node_modules/.bin:$PATH

# Express port in prod, webpack dev server port in dev
EXPOSE 3000

WORKDIR /app
COPY ./docker-entrypoint-dev.sh .

WORKDIR /app/server_root/
COPY server/package*.json ./
RUN npm install && npm cache clean --force
COPY server ./server

WORKDIR /app/client_root/
COPY client/package*.json ./
RUN npm install && npm cache clean --force
COPY client ./client

WORKDIR /app

FROM base as dev

#Express port in dev
EXPOSE 3001

#Node debugger
EXPOSE 9229

CMD ["bash", "/app/docker-entrypoint-dev.sh"]