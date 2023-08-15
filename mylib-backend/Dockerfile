FROM node:latest

WORKDIR /app/

COPY src/ /app/src
COPY package.json /app/
COPY tsconfig.json /app/

RUN npm install
RUN npm run build

cmd ["npm", "start"]