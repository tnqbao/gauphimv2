# Stage 1: Builder
FROM node:18-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm cache clean --force && npm ci --legacy-peer-deps
COPY . .
RUN rm -rf .next && npm run build

# Stage 2: Production
FROM node:18-alpine
WORKDIR /app
COPY --from=builder /app ./
RUN npm ci --only=production --legacy-peer-deps
EXPOSE 3000
CMD ["npm", "run", "start"]
