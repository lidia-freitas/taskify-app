FROM node:20.18.0-alpine AS builder

WORKDIR /app

ARG API_CONN

ENV API_CONN=$API_CONN

COPY package.json ./

RUN yarn install

COPY tsconfig.json vite.config.ts index.html ./
COPY src ./src
COPY public ./public

RUN yarn build

FROM node:20.18.0-alpine AS runner

WORKDIR /app

COPY --from=builder /app/dist ./dist

COPY package.json ./

EXPOSE ${WEB_PORT}

CMD ["sh", "-c", "npx serve -s dist -l $WEB_PORT"]
