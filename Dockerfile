FROM node:alpine AS builder

WORKDIR /app

COPY . .

RUN npm install && \
    npm run build

FROM nginx:alpine

# Check the angular.json file to check the outputPath parameter value
COPY --from=builder /app/dist/friends-app /usr/share/nginx/html