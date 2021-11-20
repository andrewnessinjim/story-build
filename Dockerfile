# TODO 
# Document the file
# Display node and npm versions

#base stage is not meant to be a build target, it supports dev and prod stages
FROM node:16.10.0-bullseye-slim as base

ENV NODE_ENV=production

#Express port
EXPOSE 3000

RUN mkdir /app && chown -R node:node /app
WORKDIR /app
COPY --chown=node:node package*.json ./
USER node

RUN npm ci && npm cache clean --force

COPY --chown=node:node . .

#dev is derived from base. It's meant for local development only. It does not copy code because its only meant to be used with docker-compose, which bind mounts the code anyway.
FROM base as dev

ENV PATH=/app/node_modules/.bin:$PATH
ENV NODE_ENV=development

#Node debugger
EXPOSE 9229

CMD npm ci && npm cache clean --force && gulp dev 

#prod is derived from base.
FROM base as prod

RUN gulp build

CMD ["node","/app/run.js"]