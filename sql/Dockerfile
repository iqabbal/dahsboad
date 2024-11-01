FROM postgres:12
EXPOSE 5432
COPY ./scripts/ /tmp/scripts
RUN chmod 755 /tmp/scripts
RUN chmod 755 /tmp/scripts/*
RUN chown -R postgres:postgres /tmp/scripts
COPY ./run.sh /docker-entrypoint-initdb.d
RUN chmod +x /docker-entrypoint-initdb.d/run.sh
