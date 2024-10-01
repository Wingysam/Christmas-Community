FROM node:20-alpine

RUN apk --no-cache add curl

ENV NODE_ENV production
ENV PORT 80
ENV DB_EXPOSE_PORT 8080
ENV DB_PREFIX /data/dbs/
ENV DB_LOG_FILE /dev/null

ENV SECRET_DIRNAME /data

WORKDIR /usr/src/app

COPY . .
RUN npm install --production --silent && \
    npm install -g typescript \
    npm run build && \
    mkdir -p /data/dbs 

EXPOSE 80

CMD ./Dockerstart.sh

