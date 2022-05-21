FROM node:16
ENV NODE_ENV development
WORKDIR /usr/app
COPY secrets /usr/app/secrets
COPY package*.json ./
COPY tsconfig.json ./
COPY . .
RUN npm install
ENV NODE_ENV production
RUN npm run build
WORKDIR /usr/app/build

CMD ["node", "index.js"]
