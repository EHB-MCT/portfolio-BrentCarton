FROM node:20.5.0-alpine3.18

WORKDIR  /usr/app

COPY package*.json ./

RUN npm install --quiet

COPY . .

EXPOSE 3000

CMD ["npm","start"]