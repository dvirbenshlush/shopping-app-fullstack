#!/bin/bash

echo "🧠 Checking running containers..."
docker ps

echo ""
echo "📦 Showing dotnet-api logs (press Ctrl+C to exit)..."
docker-compose logs -f dotnet-api &
DOTNET_LOG_PID=$!

sleep 3
echo ""
echo "🧪 Checking if 'CatalogDb' exists in SQL Server..."

# Get the name of the SQL container
SQL_CONTAINER=$(docker ps --filter "ancestor=mcr.microsoft.com/mssql/server:2022-latest" --format "{{.Names}}" | head -n 1)

if [ -z "$SQL_CONTAINER" ]; then
  echo "❌ SQL container not found!"
  kill $DOTNET_LOG_PID
  exit 1
fi

docker exec -i "$SQL_CONTAINER" /opt/mssql-tools/bin/sqlcmd -S localhost -U sa -P 'YourStrong!Passw0rd' -Q "SELECT name FROM sys.databases" | grep -q CatalogDb

if [ $? -eq 0 ]; then
  echo "✅ CatalogDb exists!"
else
  echo "❌ CatalogDb does NOT exist!"
fi

echo ""
echo "👀 Watching dotnet-api logs... (Ctrl+C to stop)"
wait $DOTNET_LOG_PID
