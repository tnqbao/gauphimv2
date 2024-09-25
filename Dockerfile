FROM node:18-alpine AS builder

WORKDIR /app

COPY package*.json ./

RUN npm install -g npm@latest  
RUN npm cache clean --force 
RUN npm install --legacy-peer-deps
COPY . .
RUN rm -rf .next
RUN npm run build

FROM node:18-alpine
WORKDIR /app
COPY --from=builder /app .
RUN npm install --production --legacy-peer-deps
EXPOSE 3000
CMD ["npm", "run", "start"]
