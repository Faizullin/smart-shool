# Stage 1: Build React application
FROM node:14
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .

EXPOSE 5173