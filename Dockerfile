# define from what image we want to build from. Here we will use the latest LTS (long term support) version 10 of node available from the Docker Hub:
FROM node:10

RUN npm install -g nodemon

# create a directory to hold the application code inside the image, this will be the working directory in the application
WORKDIR /usr/src/app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./

RUN npm install
# If you are building your code for production
# RUN npm ci --only=production

# To bundle your app's source code inside the Docker image, use the COPY instruction:
COPY . .

EXPOSE 8080

CMD [ "nodemon", "index.js" ]