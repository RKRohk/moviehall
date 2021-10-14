FROM golang:latest as build

WORKDIR /app
ENV CGO_ENABLED=0
COPY backend/go.* ./
RUN --mount=type=cache,target=/go/pkg/mod \
    go mod download

COPY backend/. ./
RUN go build

FROM node:latest as web_build
WORKDIR /app
COPY frontend/package.json .
COPY frontend/yarn.lock .
RUN yarn install
COPY frontend/. ./
RUN yarn build

FROM scratch as runner
WORKDIR /app
COPY --from=build /app/moviehall ./
COPY --from=web_build /app/build ./
CMD [ "./moviehall" ]