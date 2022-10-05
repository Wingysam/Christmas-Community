FROM node:15-alpine

RUN apk --no-cache add curl

ENV NODE_ENV production
WORKDIR /usr/src/app

COPY ["package.json", "package-lock.json*", "npm-shrinkwrap.json*", "patched-express-response.js", "./"]
RUN npm install --production --silent

COPY . .

ENV PORT 3000
ENV DB_EXPOSE_PORT 8080
EXPOSE 3000

RUN mkdir -p /data/dbs
ENV DB_PREFIX /data/dbs/

ENV SECRET_DIRNAME /data

CMD ./Dockerstart.sh