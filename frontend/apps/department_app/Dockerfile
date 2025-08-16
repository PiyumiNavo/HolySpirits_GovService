# Use a Node.js base image
FROM node:18-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy package.json files
COPY package.json ./
COPY packages/ui/package.json ./packages/ui/
COPY apps/department_app/package.json ./apps/department_app/

# Install dependencies
RUN npm install --legacy-peer-deps

# Copy the rest of the application code
COPY . .

# Build the Next.js application
WORKDIR /app/apps/department_app
RUN npm run build

# Expose the port the app runs on
EXPOSE 3002

# Set environment variables
ENV PORT=3002
ENV HOSTNAME="0.0.0.0"
ENV NODE_ENV=production

# Start the Next.js application
CMD ["npm", "start"]
