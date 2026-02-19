# Build stage for frontend
FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Production stage
FROM node:20-alpine
WORKDIR /app

# Copy backend files
COPY server/ ./server/
COPY package*.json ./
RUN npm install --production

# Copy built frontend
COPY --from=builder /app/dist ./dist

# Expose port
EXPOSE 10000

# Start both frontend and backend
CMD ["node", "server/index.cjs"]
