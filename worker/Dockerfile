FROM node:18-alpine

WORKDIR /app

# Copy package files first for better caching
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Create logs directory
RUN mkdir -p logs

# Start the worker service
CMD ["npm", "start"]
