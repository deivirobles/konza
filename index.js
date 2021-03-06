const http = require("http");
const app = require("./server");
const config = require("./server/config/");
const database = require("./server/database");

database.connect(config.database, {});

const { port } = config.server;

const server = http.createServer(app);

server.listen(port, () => {
  console.log(`El servidor se está ejecutando en ${port}/`);
});
