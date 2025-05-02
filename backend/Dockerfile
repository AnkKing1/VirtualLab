# Start with an official Node.js image (base image)
FROM node:16

# Install essential build tools and compilers
RUN apt-get update && apt-get install -y \
    build-essential \
    g++ \
    gcc \
    python3 \
    python3-pip \
    openjdk-11-jdk \
    curl \
    git \
    && rm -rf /var/lib/apt/lists/*

# Install Docker CLI (optional)
RUN curl -fsSL https://get.docker.com | bash

# Set working directory inside the container
WORKDIR /app

# Install any needed Node.js packages (like for running the backend API)
COPY package.json package-lock.json ./
RUN npm install

# Set up the app in the working directory
COPY . .

# Expose the port the app runs on (e.g., WebSocket on 5000)
EXPOSE 5000

# Default command when the container starts
CMD ["npm", "start"]
