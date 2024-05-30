# Step 1: Use an official Node runtime as a parent image
FROM node:latest

# Step 2: Set the working directory to /app
WORKDIR /app

# Step 3: Copy package.json and package-lock.json
COPY package*.json ./

# Step 4: Install any needed packages specified in package.json
RUN npm install

# Step 5: Copy the rest of the working directory contents into the container at /app
COPY . .

# Step 6: Make port 3000 available to the world outside this container
EXPOSE 3030

# Step 7 (Removed): No need to define environment variable here since we're passing them at runtime with --env-file

# Step 8: Run app when the container launches (Assuming 'npm start' serves your built application)
CMD ["npm", "run","dev"]