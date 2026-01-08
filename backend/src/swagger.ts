import { secureHeapUsed } from "crypto";
import swaggerJSDoc from "swagger-jsdoc";

const swaggerDefinition = () => {
  return {
    openapi: "3.0.0",
    info: {
      title: "My API",
      version: "1.0.0",
      description: "API documentation for My API",
    },
    servers: [
      {
        url: "http://localhost:3000",
        description: "Development server",
      },
    ],
    components: {
      securitySchemes: {
        BearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
  };
};

export const swaggerSpec = swaggerJSDoc({
    swaggerDefinition: swaggerDefinition(),
    apis: ['./src/routes/*.ts', './src/controllers/*.ts'], // Path to the API docs
});