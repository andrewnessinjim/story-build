FROM node:16.10.0-bullseye-slim

ENV PATH /app/server_root/node_modules/.bin:/app/client_root/node_modules/.bin:$PATH
EXPOSE 3000
EXPOSE 3001
EXPOSE 9229

WORKDIR /app
COPY ./docker-entrypoint.sh .

WORKDIR /app/server_root/
COPY server/package*.json ./
RUN npm install && npm cache clean --force
COPY server ./server

WORKDIR /app/client_root/
COPY client/package*.json ./
RUN npm install && npm cache clean --force
COPY client ./client

WORKDIR /app

CMD ["bash", "/app/docker-entrypoint.sh"]