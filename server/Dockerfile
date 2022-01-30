# ==================================================================
# Development
# ==================================================================
FROM node:lts-alpine AS DEV

USER node:node

WORKDIR /home/node

CMD [ "npm", "run", "dev" ]

# ==================================================================
# Production
# ==================================================================
FROM node:lts-alpine AS BUILD

USER node:node

WORKDIR /home/node

COPY --chown=node:node ["package.json", "package-lock.json", "./"]

RUN npm install 

COPY --chown=node:node . .

RUN npm run build


FROM node:lts-alpine AS PROD

ENV NODE_ENV=production
ENV PORT=80

USER node:node

WORKDIR /home/node

COPY --chown=node:node ["package.json", "package-lock.json", "./"]

RUN npm install --production

COPY --from=BUILD /home/node/dist .

CMD [ "node", "index.js" ]

