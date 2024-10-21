# backend/Dockerfile

# Use official Node.js LTS version
FROM node:18-alpine

# Set working directory
WORKDIR /usr/src/app

# Copy package.json and package-lock.json
COPY package.json ./
COPY package-lock.json ./

# Install dependencies
RUN npm install --production

# Copy the rest of the application code
COPY . ./

# Expose backend port
EXPOSE 4000

# Start the backend server
CMD ["node", "server.js"]
