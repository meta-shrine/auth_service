FROM node:16-alpine As development

WORKDIR / auth

COPY package*.json ./

RUN apk add --no-cache python3 make g++


RUN npm install

COPY . .

RUN npm run build

FROM node:16-alpine as production

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

WORKDIR /auth

COPY package*.json ./


RUN npm install

COPY . .

COPY --from=development /auth/dist ./dist

CMD ["node", "dist/main"]
