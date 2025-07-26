#!/bin/bash
# Start SQL Server in background
/opt/mssql/bin/sqlservr &

# Wait until SQL Server is ready
echo "⏳ Waiting for SQL Server to start..."
until /opt/mssql-tools/bin/sqlcmd -S localhost -U sa -P 'YourStrong!Passw0rd' -Q "SELECT 1" &> /dev/null
do
  sleep 2
done

echo "✅ SQL Server is ready. Creating CatalogDb if not exists..."

# Create the database
/opt/mssql-tools/bin/sqlcmd -S localhost -U sa -P 'YourStrong!Passw0rd' -Q "IF DB_ID('CatalogDb') IS NULL CREATE DATABASE [CatalogDb];"

# Keep the container running
wait
