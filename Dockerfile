# Use the official Node.js image with a specific version
FROM node:14

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies
RUN npm install

# Install Expo CLI globally
RUN npm install -g expo-cli@4.12.0

# Copy the rest of the application files
COPY . .

# Expose the necessary ports
EXPOSE 19000

# Set the environment variables
ENV REACT_NATIVE_PACKAGER_HOSTNAME="192.168.10.212"
ENV NODE_ENV=production
ENV PORT=19000

# Start the Expo development server
CMD ["npm", "start"]
