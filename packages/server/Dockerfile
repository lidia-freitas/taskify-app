FROM node:20.18.0-alpine AS builder

WORKDIR /app

COPY package.json ./

RUN yarn install

COPY tsconfig.json ./
COPY src ./src

RUN yarn build

FROM node:20.18.0-alpine AS runner

WORKDIR /app

COPY --from=builder /app/dist ./dist

COPY package.json ./

RUN yarn install --production

EXPOSE ${API_PORT}

CMD ["node", "dist/index.js"]