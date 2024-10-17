# Stage 1: Build the application
FROM node:18-bullseye AS builder
WORKDIR /app
COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile
COPY . .
RUN yarn build

# Stage 2: Serve the application
FROM node:18-alpine AS production
WORKDIR /app
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/package.json ./
COPY --from=builder /app/yarn.lock ./
RUN yarn install --production --frozen-lockfile
COPY .env.production .env
EXPOSE 3000
CMD ["yarn", "start"]