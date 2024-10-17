
FROM node:18-bullseye AS builder
WORKDIR /app
COPY ./package.json ./yarn.lock ./
RUN yarn install --frozen-lockfile
COPY . .
RUN yarn build

FROM node:18-bullseye AS production
WORKDIR /app
COPY --from=builder /app /app
CMD ["yarn", "start"]
EXPOSE 3000