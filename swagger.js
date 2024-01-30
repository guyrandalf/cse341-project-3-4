const swaggerAutogen = require("swagger-autogen")();

const doc = {
  info: {
    title: "API",
    description: "Week 3-4 Project",
  },
  host: "localhost:8080",
  schema: ["http"],
};

const outputFile = "./swagger.json";
const routes = ["./routes/index.js"];

swaggerAutogen(outputFile, routes, doc);
