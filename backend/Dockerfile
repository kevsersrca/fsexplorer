FROM node:18-alpine

RUN sed -i 's/https:\/\/dl-cdn.alpinelinux.org/http:\/\/dl-cdn.alpinelinux.org/g' /etc/apk/repositories \
  && apk update \
  && apk add --no-cache ca-certificates \
  && update-ca-certificates

ENV NODE_TLS_REJECT_UNAUTHORIZED=0

WORKDIR /app
COPY package*.json ./
RUN npm install --production
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["node", "dist/main.js"]
