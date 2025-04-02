FROM node:18-alpine

WORKDIR /app

# Copy package files first for better caching
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Expose port 3000 for development server
EXPOSE 3000

# Start development server with host set to allow external access
CMD ["npm", "start", "--", "--host", "0.0.0.0"]
