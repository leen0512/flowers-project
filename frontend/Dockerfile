# Use an official Node.js image as the base
FROM node:22-alpine 

# Set the working directory inside the container
WORKDIR /frontend

# Copy package.json and package-lock.json before running npm install
COPY package.json package-lock.json ./

# Copy the rest of the application files
COPY . .

# Install dependencies
RUN npm install

# Build the React app
RUN npm run build

# Expose the port the app will run on
EXPOSE 3000

# Start the application
CMD ["npm", "start"]
