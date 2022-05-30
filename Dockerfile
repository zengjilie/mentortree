FROM node:16-alpine

# Create app directory
WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 5000 

CMD npm start