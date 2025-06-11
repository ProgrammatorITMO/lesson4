FROM postgres:latest
WORKDIR /postgres
COPY . /postgres
RUN rm -rf /var/lib/postgresql/data/*
COPY init.sql /docker-entrypoint-initdb.d/