FROM node:10
MAINTAINER Alan Boyce "boyce.alan15@gmail.com"
RUN npm install -g nodemon
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
COPY . .
CMD [ "npm", "run", "dev"]
EXPOSE 8080