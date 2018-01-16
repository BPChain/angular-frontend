FROM node:8.4

ENV HOME=/home/app
WORKDIR $HOME

COPY package.json package.json
COPY package-lock.json package-lock.json

RUN npm install

COPY tsconfig.json tsconfig.json
COPY tslint.json tslint.json
COPY protractor.conf.js protractor.conf.js
COPY karma.conf.js karma.conf.js
COPY .angular-cli.json .angular-cli.json

COPY e2e e2e
COPY src src

EXPOSE 4200:4200

ENTRYPOINT ["npm", "start", "--"]
