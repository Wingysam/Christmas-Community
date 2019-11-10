# Christmas Community
Web app for your family's Christmas shopping

## Purpose
To create a simple place for your entire family to use to find gifts that people want, and to avoid double-gifting.

## Docker
```
docker run --detach --name christmas-community -p 80:80 --restart always wingysam/christmas-community
```

## Docker Compose
```yml
---
version: "3"
services:
  christmas-community:
    image: wingysam/christmas-community
    volumes:
      - ./data:/data
    ports:
      - 80:80
    restart: always
```

## Install
```sh
git clone https://gitlab.com/wingysam/christmas-community
cd christmas-community
yarn
```

## Configuration
Add environment variables with a .env. Example:
```env
SITE_TITLE="Christmas Zone"
PORT=80
```

## Startup
```sh
yarn start
```

## Setup
Visit `/` on the HTTP server to add an admin account.