const swaggerAutogen = require("swagger-autogen")();

const doc = {
  info: {
    title: "REST API",
    description: "Week 3-4 Project",
  },
  host: "cse341-3-4.onrender.com",
  // host: "localhost:8080",
  // schema: ["http"],
  schema: ["https"],
};

const outputFile = "./swagger.json";
const routes = ["./routes/index.js"];

swaggerAutogen(outputFile, routes, doc);
