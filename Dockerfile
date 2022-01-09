FROM node:16.13.0

WORKDIR /app

COPY package.json /app

RUN npm install

COPY . .

EXPOSE 4000

VOLUME [/app/src/database, /app/logs]

CMD ["npm", "run", "start"]