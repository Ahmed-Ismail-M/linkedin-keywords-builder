# frontend/Dockerfile
FROM node:20-alpine@sha256:5e3e6e2e7e2b6e8c3e7b1e2e8e2e6e2e7e2e6e2e7e2e6e2e7e2e6e2e7e2e6e2e7e2e6e2e7e2e6e2e7e2e6e2e7e2e6

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

RUN npm run build

EXPOSE 3050

CMD ["npm", "start"]
