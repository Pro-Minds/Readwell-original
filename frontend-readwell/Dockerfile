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

# Use a lightweight server to serve the app
FROM nginx:alpine

# Copy the build files to the Nginx server
COPY --from=build /app/build /usr/share/nginx/html

# Expose the default port for Nginx
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]