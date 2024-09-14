# Dockerfile
FROM node:20 as build
LABEL authors="sinke"

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package.json package-lock.json ./

# Install dependencies
RUN npm install

# Copy the rest of your application
COPY . .

# Build the application
RUN npm run build

# Production Stage
FROM node:20

# Install serve
RUN npm install -g serve

# Set the working directory
WORKDIR /app

# Copy built files from the previous stage
COPY --from=build /app/build /app/build

# Expose the port on which the app will run
EXPOSE 3000

# Serve the app
CMD ["serve", "-s", "build", "-l", "3000"]
