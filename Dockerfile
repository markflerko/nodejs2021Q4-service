FROM node:16-alpine3.14

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm ci --only-prod

COPY . .

CMD ["npm", "run", "start"]