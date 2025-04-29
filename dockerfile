# Step 1: Build React app
FROM node:18-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 6000
RUN npm run build
CMD ["npm", "run", "start"]