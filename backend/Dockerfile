FROM node:22-alpine AS deps
WORKDIR /app
COPY package*.json ./
RUN npm ci

FROM node:22-alpine AS build
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY package*.json tsconfig.json ./
COPY prisma ./prisma
COPY src ./src
RUN npx prisma generate && npm run build

FROM node:22-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
RUN addgroup -S nodejs && adduser -S voyapi -G nodejs
COPY --from=build --chown=voyapi:nodejs /app/package*.json ./
COPY --from=build --chown=voyapi:nodejs /app/node_modules ./node_modules
COPY --from=build --chown=voyapi:nodejs /app/dist ./dist
COPY --from=build --chown=voyapi:nodejs /app/prisma ./prisma
USER voyapi
EXPOSE 3000
CMD ["node", "dist/src/server.js"]
