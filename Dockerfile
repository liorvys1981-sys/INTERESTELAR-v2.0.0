# INTERESTELAR v2.0.0 — LGG AUTO SUPPLIES LLC
# Production Dockerfile for Render

FROM node:20-alpine

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci --only=production

# Copy source code
COPY . .

# Build the application (frontend + backend)
RUN npm run build

# Expose port
EXPOSE 3000

# Start the server
CMD ["node", "dist/boot.js"]
