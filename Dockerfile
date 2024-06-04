# Use the official node image as the base image
FROM node:20

# Set the working directory inside the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install the app dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Set environment variables
ENV NEXT_PUBLIC_API_URL=https://api.zero-company.app/

# Build the Next.js application
RUN npm run build

# Expose the port the app runs on
EXPOSE 3100

# Define the command to run the app
CMD ["npm", "start"]
