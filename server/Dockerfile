# ==================================================================
# Development
# ==================================================================
FROM node:lts-alpine AS DEV

USER node:node

WORKDIR /home/node/app

ENV NODE_ENV=development

COPY --chown=node:node package-lock.json package.json ./

RUN npm install

COPY --chown=node:node . .

CMD [ "npm", "run", "dev" ]

# ==================================================================
# Production
# ==================================================================
FROM node:lts-alpine AS BUILD

USER node:node

WORKDIR /home/node/app

COPY --chown=node:node ["package.json", "package-lock.json", "./"]

RUN npm install 

COPY --chown=node:node . .

RUN npm run build


FROM node:lts-alpine AS PROD

ENV NODE_ENV=production
ENV PORT=80

USER node:node

WORKDIR /home/node/app

COPY --chown=node:node ["package.json", "package-lock.json", "./"]

RUN npm install --production

COPY --from=BUILD /home/node/app/dist .

CMD [ "node", "index.js" ]

