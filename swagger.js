const swaggerAutogen = require("swagger-autogen")();

const doc = {
  info: {
    title: "API",
    description: "Week 3-4 Project",
  },
  host: "cse341-3-4.onrender.com",
  schema: ["https"],
};

const outputFile = "./swagger.json";
const routes = ["./routes/index.js"];

swaggerAutogen(outputFile, routes, doc);
