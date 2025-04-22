const app = require("./app");
const http = require("http");
const server = http.createServer(app);

server.listen(80, '0.0.0.0', () => {
    console.log(`Server running on port localhost`);
});