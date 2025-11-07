FROM node:18-slim

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
COPY package.json package-lock.json* ./
RUN npm ci --only=production || npm install --only=production

# Bundle app source
COPY . .

# Expose the port (Render will set PORT env var at runtime)
EXPOSE 3000

CMD ["node", "server.js"]
