FROM node:alpine
MAINTAINER Alan Boyce "boyce.alan15@gmail.com"
WORKDIR '/app'
COPY ./package.json ./
RUN npm install 
COPY . . 
CMD ["npm", "run", "start"]
EXPOSE 3000