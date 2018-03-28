FROM node:9 AS builder

WORKDIR /home/app

COPY package.json package.json
COPY package-lock.json package-lock.json

RUN npm install

COPY tsconfig.json tsconfig.json
COPY tslint.json tslint.json
COPY protractor.conf.js protractor.conf.js
COPY karma.conf.js karma.conf.js
COPY .angular-cli.json .angular-cli.json

COPY resources resources
COPY e2e e2e
COPY src src

RUN npm run build

# ---------------------------------------------------------------------------- #
FROM nginx
WORKDIR /var/app

COPY --from=builder /home/app/dist /usr/share/nginx/html
COPY --from=builder /home/app/dist /usr/share/nginx/html/bp2017w1-frontend

