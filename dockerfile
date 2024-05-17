FROM node:20-alpine
WORKDIR /app
COPY package*.json  yarn.lock ./
RUN yarn install --frozen-lockfile
COPY . .
RUN npx prisma generate
RUN yarn build
EXPOSE 8084
CMD [ "yarn", "start:prod"]
