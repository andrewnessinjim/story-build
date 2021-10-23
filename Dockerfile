# TODO 
# Document the file
# Display node and npm versions

#base stage is not meant to be a build target, it supports dev and prod stages
FROM node:16.10.0-bullseye-slim as base

ENV NODE_ENV=production

#Express port
EXPOSE 3000

WORKDIR /app/server_root/
COPY server/package*.json ./
RUN npm ci && npm cache clean --force

WORKDIR /app/client_root/
COPY client/package*.json ./
RUN npm ci && npm cache clean --force

WORKDIR /app

#dev is derived from base. It's meant for local development only. It does not copy code because its only meant to be used with docker-compose, which bind mounts the code anyway.
FROM base as dev

ENV PATH=/app/server_root/node_modules/.bin:/app/client_root/node_modules/.bin:$PATH
ENV NODE_ENV=development

#Webpack dev server port
EXPOSE 3001

#Node debugger
EXPOSE 9229

WORKDIR /app/server_root/server

#npm ci uses NODE_ENV value to determine whether to install for dev or prod
RUN npm ci && npm cache clean --force
WORKDIR /app
COPY ./docker-entrypoint-dev.sh .

CMD ["bash", "/app/docker-entrypoint-dev.sh"]

#prod is derived from base. Static client artifacts are served out by express, so client_root is unnecessary. client_root was used only to support webpack dev server in dev stage.
FROM base as prod
WORKDIR /app/server_root/
COPY server ./server

WORKDIR /app/client_root
COPY client ./client
WORKDIR /app/client_root/client
RUN npm run build && cp -R build ../../server_root/server/static && rm -rf /app/client_root
WORKDIR /app/server_root/server

CMD ["node","main.js"]