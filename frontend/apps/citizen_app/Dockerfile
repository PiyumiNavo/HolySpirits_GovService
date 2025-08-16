# Use a Node.js base image
FROM node:18-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy package.json files
COPY --chmod=0755 . .

# Build the Next.js application
WORKDIR /app/apps/citizen_app
RUN npm install
RUN npm run dev

# Expose the port the app runs on
EXPOSE 3001

# Set hostname to allow external connections
ENV PORT=3001
ENV HOSTNAME="0.0.0.0"

# Start the Next.js application
CMD ["npm", "start"]
