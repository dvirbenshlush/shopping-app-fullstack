# Step 1: Base image
FROM node:20

# Set working directory inside the container
WORKDIR /app

# Copy dependency files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application
COPY . .

# Expose the port the app runs on
EXPOSE 3000

# Run the server
CMD ["node", "index.js"]
