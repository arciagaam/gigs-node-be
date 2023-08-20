FROM node:alpine

WORKDIR /app

COPY package*.json ./

RUN npm ci

EXPOSE 3001

CMD ["npm", "run", "dev"]
