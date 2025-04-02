FROM node:18-alpine

WORKDIR /app

# Copy package files first for better caching
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Create log directory
RUN mkdir -p logs

# Expose the application port
EXPOSE 4000

# Start the application
CMD ["npm", "start"]
