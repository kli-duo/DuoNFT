FROM alpine:3.11

WORKDIR /code

RUN apk update && apk upgrade && apk add --no-cache \
  bash \
  git \
  make \
  nodejs-npm \
  py3-pip

RUN pip3 install --upgrade pip && pip3 install awscli
COPY package.json package.json
COPY package-lock.json package-lock.json
RUN npm install
