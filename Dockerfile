FROM golang:1.11.0-alpine3.8

ENV APP_PATH=/usr/local/go/src/nblog2 \
    GOPATH=/usr/local/go/ \
    PORT=3000

WORKDIR ${APP_PATH}

EXPOSE ${PORT}

COPY Gopkg.* *.go *.json ./
COPY wwwroot/  ./wwwroot/
COPY static/ ./static/
COPY router/ ./router/
COPY gql/ ./gql/
COPY config/ ./config

RUN apk update && apk add curl && rm -rf /var/cache/apk/* \
  curl https://raw.githubusercontent.com/golang/dep/master/install.sh | sh \
  dep ensure

RUN yarn install --cwd ./wwwroot && \
  yarn cache clean --force \
  yarn --cwd ./wwwroot run build

CMD ["go", "run", "main.go"]

USER golangapp