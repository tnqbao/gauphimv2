# Step 1: Build
FROM node:18-slim AS builder
WORKDIR /home/node/blog_frontend

COPY package*.json yarn.lock tsconfig.json next-i18next.config.js ./

RUN npm install --global yarn ts-node typescript && \
    yarn install --check-files && \
    yarn build

# Step 2: Production
FROM node:18-slim AS production
WORKDIR /home/node/blog_frontend

COPY --from=builder /home/node/blog_frontend/.next ./.next
COPY --from=builder /home/node/blog_frontend/public ./public
COPY --from=builder /home/node/blog_frontend/package.json ./
COPY --from=builder /home/node/blog_frontend/yarn.lock ./
COPY --from=builder /home/node/blog_frontend/next-i18next.config.js ./
COPY --from=builder /home/node/blog_frontend/next.config.mjs ./
COPY --from=builder /home/node/blog_frontend/tsconfig.json ./
COPY --from=builder /home/node/blog_frontend/i18n.ts ./

RUN yarn install --production --frozen-lockfile

COPY .env.production .env

EXPOSE 3000
CMD ["yarn", "start"]
