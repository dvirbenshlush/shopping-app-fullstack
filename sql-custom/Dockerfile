FROM mcr.microsoft.com/mssql/server:2022-latest

USER root
COPY init-db.sh /init-db.sh
RUN chmod +x /init-db.sh

CMD /init-db.sh
