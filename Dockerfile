FROM golang:latest as build

WORKDIR /app
ENV CGO_ENABLED=0
COPY backend/go.* ./
RUN go mod download

COPY backend/. ./
RUN go build

FROM node:16-alpine as web_build
WORKDIR /app
COPY frontend/package.json .
COPY frontend/yarn.lock .
RUN yarn install
COPY frontend/. ./
RUN yarn build

FROM scratch as runner
WORKDIR /app
COPY --from=build /app/moviehall ./
COPY --from=web_build /app/build/. ./build/
COPY --from=build /app/firebase-config.json .
COPY --from=build /etc/ssl/certs/ca-certificates.crt /etc/ssl/certs/
CMD [ "./moviehall" ]
