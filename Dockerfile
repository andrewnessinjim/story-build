# TODO 
# Document the file
# Display node and npm versions


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

FROM base as prod
WORKDIR /app/server_root/
COPY server ./server

WORKDIR /app/client_root
COPY client ./client
WORKDIR /app/client_root/client
RUN npm run build && cp -R build ../../server_root/server/static && rm -rf /app/client_root
WORKDIR /app/server_root/server

CMD ["node","main.js"]