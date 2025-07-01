# Use official Node.js LTS image as base
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json (if exists)
COPY package*.json ./

# Copy the rest of the application code
COPY . .

# Install dependencies
RUN npm install

# Build the React app for production
RUN npm run build

# Install a lightweight server to serve the static files
RUN npm install -g serve

# Expose port 3000 (default for React)
EXPOSE 3000

# Command to serve the built app
CMD ["serve", "-s", "build", "-l", "3000"]