FROM node:10
LABEL Alan Boyce "boyce.alan15@gmail.com"
RUN npm install -g nodemon
WORKDIR /app
COPY package.json .
RUN npm install
COPY . .
EXPOSE 8080
CMD [ "npm", "run", "dev"]