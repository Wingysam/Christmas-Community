# Christmas Community
![Docker Pulls](https://img.shields.io/docker/pulls/wingysam/christmas-community?style=for-the-badge)
![Version](https://img.shields.io/badge/dynamic/json?color=orange&label=Version&query=version&url=https%3A%2F%2Fraw.githubusercontent.com%2FWingysam%2FChristmas-Community%2Fmaster%2Fpackage.json&style=for-the-badge)
![Language](https://img.shields.io/badge/Language-JavaScript-DDA000?style=for-the-badge)
![Runtime](https://img.shields.io/badge/Runtime-Node.JS-68A063?style=for-the-badge)

Web app for your family's Christmas shopping

## Purpose
To create a simple place for your entire family to use to find gifts that people want, and to avoid double-gifting.

## Screenshots
![Screenshot](screenshots/main.png)
![Screenshot](screenshots/list.png)
![Screenshot](screenshots/link-not-required.png)
![Screenshot](screenshots/name-from-link.png)

## Amazon Smile
By default, Christmas Community converts www.amazon.com links to smile.amazon.com. If you do not want this, set the environment variable SMILE to false (if you are using Docker Compose, make sure to put "false" in quotes).

## Root Path
If you want put Christmas Community on a subdirectory, such as `/christmas-community`, set `ROOT_PATH` to that path.

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
      # If you want to go to localhost:8080 to access Christmas Community,
      # use - 8080:80 instead of
      - 80:80
    environment:
      # Amazon Smile, set to 'false' to disable www.amazon.com links
      # turning into smile.amazon.com
      SMILE: 'true'
      # Table mode, set to 'false' to revert to box mode
      TABLE: 'true'
      # Single list mode
      # (for weddings, birthdays, etc. only the admin account's list is accessible)
      # Set to 'true' to enable
      SINGLE_LIST: 'false'
      # Some websites (like walmart) send headers that are larger than 8MB in
      # length. If issues are encountered, set the node.js limit to a higher
      # number than 8192
      #NODE_OPTIONS: "--max-http-header-size=32768"
    restart: always
```

## Install

```sh
git clone https://github.com/wingysam/Christmas-Community
cd Christmas-Community
npm install
```

## Configuration
Add environment variables with a .env. Example:
```sh
## Core Settings
# Where to store databases, can be a CouchDB compatible server or directory.
DB_PREFIX=dbs/
# Where to send someone if they need to log in
DEFAULT_FAILURE_REDIRECT=/login
# Port to listen on
PORT=80
# Expose the internal PouchDB with CouchDB API and Fauxton browser. Mostly used for debugging. Leave empty to disable.
DB_EXPOSE_PORT=
# Proxy to send item data requests to. Leave empty to disable.
PROXY_SERVER=
# Secret string to store session cookies with. Automatically generated if not provided.
SECRET=
# How long a user is logged in (milliseconds). Defaults to one week.
SESSION_MAX_AGE=604800000
# The name of the site in the <title> and navigation bar
SITE_TITLE=Christmas Community
# Used when shared to home screen
SHORT_TITLE=Christmas
# The root path for forms, CSS, and a small amount of JS. Useful when proxying.
ROOT_PATH=/
# Where to trust the X-Forwarded-For header from. Defaults to "loopback". Useful for proxying to docker.
TRUST_PROXY=loopback
# Any theme from https://jenil.github.io/bulmaswatch
BULMASWATCH=default
# Set to false to disable update notices
UPDATE_CHECK=true
# Set to false to disable the profile pictures feature
PFP=true
# Language of the interface, options listed in `languages` directory
LANGUAGE=en-US
# Password to enter guest mode,
# e.g. https://wishes.example.com?pw=ReplaceWithYourGuestPassword
# GUEST_PASSWORD=ReplaceWithYourGuestPassword

## Wishlist Settings
# Set to true to not allow users to have their own lists. You may want this for a birthday or wedding.
SINGLE_LIST=false
# Set to false to allow viewing wishlists without logging in
LISTS_PUBLIC=false
# Defaults to true. Set to false for legacy cards view.
TABLE=true
# Convert Amazon links to Amazon Smile links. A percentage of the profit goes to a charity of buyer's choice. Defaults to true.
SMILE=true
# Allow Markdown in item notes. Does not work with TABLE=false. Defaults to false.
MARKDOWN=false

## Custom HTML Snippets
# These are inserted into specific locations in the relevant page
# HTML is not escaped. Don't put untrusted data here.
# CUSTOM_HTML_LOGIN=<p style="margin-top: 1em;">Some custom text for the Login page</p>
# CUSTOM_HTML_WISHLISTS=

# Custom CSS stylesheet
# If you wish to include a custom stylesheet you can add the filename in the variable here.
# Remember to add the stylesheet to the filesystem at `static/css/custom.css`. In docker, mount `/usr/src/app/src/static/css/custom.css`.
# CUSTOM_CSS=custom.css
```

## Default Profile Pictures
To replace the default snowman profile pictures, replace the files in `static/img/default-pfps`. In docker, mount `/usr/src/app/src/static/img/default-pfps`.

## Startup
```sh
npm start
```

## Setup
Visit `/` on the HTTP server to add an admin account.

## Adding Sites
Christmas Community gets data about products automatically with [Wingysam/get-product-data](https://github.com/Wingysam/get-product-data). Please submit pull requests for new sites or fixes for changes to existing sites!

## Groups
Christmas Community does not yet support having multiple families in one instance. This is a planned feature that will, for example, allow you to have one group for your mom's side of the family and one group for your dad's side of the family, where both groups can access your wishlist but not each others' wishlists. A fork of Christmas Community that has this feature does exist, but most likely will not receive all new features added to the main project. It was not merged into this project because the architecture of Christmas Community prevented implementing it in a maintainable way before some refactoring is done.

[Christmas-Community-Groups](https://github.com/jskiddie/Christmas-Community-Groups)

# About Developer
Hi, I'm Wingy. I made this app. My website is [samwing.dev](https://samwing.dev). Please [hire me](https://wingysam.xyz/hire).

[![ko-fi](https://www.ko-fi.com/img/githubbutton_sm.svg)](https://ko-fi.com/C1C2347HB)

## Collaborators

<!-- readme: collaborators -start -->
<table>
<tr>
    <td align="center">
        <a href="https://github.com/Wingysam">
            <img src="https://avatars.githubusercontent.com/u/18403742?v=4" width="100;" alt="Wingysam"/>
            <br />
            <sub><b>Wingysam</b></sub>
        </a>
    </td></tr>
</table>
<!-- readme: collaborators -end -->

## Contributors

<!-- readme: contributors -start -->
<table>
<tr>
    <td align="center">
        <a href="https://github.com/Wingysam">
            <img src="https://avatars.githubusercontent.com/u/18403742?v=4" width="100;" alt="Wingysam"/>
            <br />
            <sub><b>Wingysam</b></sub>
        </a>
    </td>
    <td align="center">
        <a href="https://github.com/PeteS4">
            <img src="https://avatars.githubusercontent.com/u/6705244?v=4" width="100;" alt="PeteS4"/>
            <br />
            <sub><b>PeteS4</b></sub>
        </a>
    </td>
    <td align="center">
        <a href="https://github.com/cj13579">
            <img src="https://avatars.githubusercontent.com/u/1965454?v=4" width="100;" alt="cj13579"/>
            <br />
            <sub><b>cj13579</b></sub>
        </a>
    </td>
    <td align="center">
        <a href="https://github.com/dbarenholz">
            <img src="https://avatars.githubusercontent.com/u/25849034?v=4" width="100;" alt="dbarenholz"/>
            <br />
            <sub><b>dbarenholz</b></sub>
        </a>
    </td>
    <td align="center">
        <a href="https://github.com/Laeborg">
            <img src="https://avatars.githubusercontent.com/u/4494264?v=4" width="100;" alt="Laeborg"/>
            <br />
            <sub><b>Laeborg</b></sub>
        </a>
    </td>
    <td align="center">
        <a href="https://github.com/LarsStegman">
            <img src="https://avatars.githubusercontent.com/u/9332816?v=4" width="100;" alt="LarsStegman"/>
            <br />
            <sub><b>LarsStegman</b></sub>
        </a>
    </td></tr>
<tr>
    <td align="center">
        <a href="https://github.com/BootVirtual">
            <img src="https://avatars.githubusercontent.com/u/64020530?v=4" width="100;" alt="BootVirtual"/>
            <br />
            <sub><b>BootVirtual</b></sub>
        </a>
    </td>
    <td align="center">
        <a href="https://github.com/FlatDudeInVR">
            <img src="https://avatars.githubusercontent.com/u/1240124?v=4" width="100;" alt="FlatDudeInVR"/>
            <br />
            <sub><b>FlatDudeInVR</b></sub>
        </a>
    </td>
    <td align="center">
        <a href="https://github.com/IvySaskia">
            <img src="https://avatars.githubusercontent.com/u/41027286?v=4" width="100;" alt="IvySaskia"/>
            <br />
            <sub><b>IvySaskia</b></sub>
        </a>
    </td>
    <td align="center">
        <a href="https://github.com/mtrunt">
            <img src="https://avatars.githubusercontent.com/u/1170107?v=4" width="100;" alt="mtrunt"/>
            <br />
            <sub><b>mtrunt</b></sub>
        </a>
    </td>
    <td align="center">
        <a href="https://github.com/Na0mir">
            <img src="https://avatars.githubusercontent.com/u/6453724?v=4" width="100;" alt="Na0mir"/>
            <br />
            <sub><b>Na0mir</b></sub>
        </a>
    </td>
    <td align="center">
        <a href="https://github.com/ndlanier">
            <img src="https://avatars.githubusercontent.com/u/14913926?v=4" width="100;" alt="ndlanier"/>
            <br />
            <sub><b>ndlanier</b></sub>
        </a>
    </td></tr>
<tr>
    <td align="center">
        <a href="https://github.com/RestartFU">
            <img src="https://avatars.githubusercontent.com/u/45609733?v=4" width="100;" alt="RestartFU"/>
            <br />
            <sub><b>RestartFU</b></sub>
        </a>
    </td>
    <td align="center">
        <a href="https://github.com/dotromain">
            <img src="https://avatars.githubusercontent.com/u/25564262?v=4" width="100;" alt="dotromain"/>
            <br />
            <sub><b>dotromain</b></sub>
        </a>
    </td>
    <td align="center">
        <a href="https://github.com/RonnyAL">
            <img src="https://avatars.githubusercontent.com/u/26335298?v=4" width="100;" alt="RonnyAL"/>
            <br />
            <sub><b>RonnyAL</b></sub>
        </a>
    </td>
    <td align="center">
        <a href="https://github.com/CantisW">
            <img src="https://avatars.githubusercontent.com/u/57926741?v=4" width="100;" alt="CantisW"/>
            <br />
            <sub><b>CantisW</b></sub>
        </a>
    </td>
    <td align="center">
        <a href="https://github.com/StS82">
            <img src="https://avatars.githubusercontent.com/u/32516183?v=4" width="100;" alt="StS82"/>
            <br />
            <sub><b>StS82</b></sub>
        </a>
    </td>
    <td align="center">
        <a href="https://github.com/jskiddie">
            <img src="https://avatars.githubusercontent.com/u/153759737?v=4" width="100;" alt="jskiddie"/>
            <br />
            <sub><b>jskiddie</b></sub>
        </a>
    </td></tr>
<tr>
    <td align="center">
        <a href="https://github.com/toastie89">
            <img src="https://avatars.githubusercontent.com/u/19393929?v=4" width="100;" alt="toastie89"/>
            <br />
            <sub><b>toastie89</b></sub>
        </a>
    </td>
    <td align="center">
        <a href="https://github.com/zethis">
            <img src="https://avatars.githubusercontent.com/u/20169561?v=4" width="100;" alt="zethis"/>
            <br />
            <sub><b>zethis</b></sub>
        </a>
    </td></tr>
</table>
<!-- readme: contributors -end -->
