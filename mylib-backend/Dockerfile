FROM node:latest

WORKDIR /app/

COPY src/ /app/src
COPY package.json /app/
COPY tsconfig.json /app/
COPY scripts/ /app/scripts

RUN npm install
RUN npm run build

CMD ["npm", "start"]