import { Client } from "@opensearch-project/opensearch";
import dotenv from "dotenv";
dotenv.config();

const client = new Client({
  node: process.env.OPENSEARCH_NODE || "http://localhost:9200",
});

async function createOrdersIndex() {
  const indexName = "orders";

  const exists = await client.indices.exists({ index: indexName });
  if (exists.body) {
    console.log(`Index "${indexName}" already exists.`);
    return;
  }

  const response = await client.indices.create({
    index: indexName,
    body: {
      mappings: {
        properties: {
          customer: {
            properties: {
              firstName: { type: "text" },
              lastName: { type: "text" },
              address: { type: "text" },
              email: { type: "keyword" },
            },
          },
          items: {
            type: "nested",
            properties: {
              productId: { type: "keyword" },
              name: { type: "text" },
              quantity: { type: "integer" },
            },
          },
          createdAt: { type: "date" },
        },
      },
    },
  });

  console.log(`Index "${indexName}" created successfully`, response.body);
}

createOrdersIndex().catch(console.error);
