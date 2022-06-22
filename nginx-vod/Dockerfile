FROM nginx:stable-alpine AS builder

# Download sources
RUN apk update && \
    apk upgrade && \
    apk add --no-cache --virtual .build-deps git gcc libc-dev make openssl-dev pcre-dev zlib-dev linux-headers curl gnupg libxslt-dev gd-dev geoip-dev curl

RUN git clone https://github.com/kaltura/nginx-vod-module.git && \
    curl "https://nginx.org/download/nginx-${NGINX_VERSION}.tar.gz" -o nginx.tar.gz

# Reuse same cli arguments as the nginx:stable-alpine image used to build
RUN CONFARGS=$(nginx -V 2>&1 | sed -n -e 's/^.*arguments: //p') \
    mkdir /usr/src && \
    tar -zxC /usr/src -f nginx.tar.gz && \
    SFM_DIR="$(pwd)/nginx-vod-module" && \
    cd /usr/src/nginx-$NGINX_VERSION && \
    ./configure --with-compat $CONFARGS --add-dynamic-module=$SFM_DIR && \
    make && make install 

FROM nginx:stable-alpine
# Extract the dynamic module from the builder image
COPY --from=builder /usr/local/nginx/modules/ngx_http_vod_module.so /usr/local/nginx/modules/ngx_http_vod_module.so
COPY nginx.conf /etc/nginx/nginx.conf