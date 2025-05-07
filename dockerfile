# Step 1: Build React app
FROM node:20-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 3000
RUN npm run build


# Step 2: Serve the build with Nginx
FROM nginx:alpine
WORKDIR /usr/share/nginx/html
COPY --from=build /app/build .
# Optional: Replace default Nginx config (optional)
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]

# react, node, kamodo.