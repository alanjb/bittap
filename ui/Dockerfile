FROM node:alpine
LABEL Alan Boyce "boyce.alan15@gmail.com"
WORKDIR /app
COPY package.json .
RUN npm install 
COPY . . 
EXPOSE 3000
CMD ["npm", "run", "start"]