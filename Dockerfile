#install and buidl
FROM node:16-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm cache clean --force && npm install --legacy-peer-deps
COPY . .
RUN rm -rf .next
RUN npm run build

#deploy
FROM node:16-alpine
WORKDIR /app
COPY --from=builder /app .
RUN npm install --production --legacy-peer-deps
EXPOSE 3000
CMD ["npm", "run", "start"]
