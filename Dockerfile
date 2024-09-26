FROM node:18-alpine AS builder
WORKDIR /app
COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile
COPY . .
RUN yarn build

FROM node:18-alpine AS production
WORKDIR /app
COPY --from=builder /app /app
RUN yarn install --production --frozen-lockfile
CMD ["sh", "-c", "cd /app && yarn start"]
EXPOSE 3000
