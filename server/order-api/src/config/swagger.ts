import path from "path";
import YAML from "yamljs";
import express from "express";
import swaggerUi from "swagger-ui-express";

export function setupSwagger(app: express.Express) {
  const categories = YAML.load(path.join(__dirname, "../src/../docs/swagger/categories.yaml"));
  const cart = YAML.load(path.join(__dirname, "../../src/docs/swagger/cart.yaml"));
  const confirm = YAML.load(path.join(__dirname, "../../src/docs/swagger/confirm.yaml"));

  const swaggerDocument = {
    openapi: "3.0.0",
    info: {
      title: "Order API",
      version: "1.0.0",
      description: "Order API documentation"
    },
    paths: {
      ...categories.paths,
      ...cart.paths,
      ...confirm.paths,
    },
    components: {}
  };

  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
}
