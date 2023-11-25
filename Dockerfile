FROM node:20-alpine

RUN apk --no-cache add curl

ENV NODE_ENV production
WORKDIR /usr/src/app

COPY ["package.json", "package-lock.json*", "npm-shrinkwrap.json*", "./"]
RUN npm install --production --silent

COPY . .

ENV PORT 80
ENV DB_EXPOSE_PORT 8080
EXPOSE 80

RUN mkdir -p /data/dbs
ENV DB_PREFIX /data/dbs/

ENV SECRET_DIRNAME /data

CMD ./Dockerstart.sh
