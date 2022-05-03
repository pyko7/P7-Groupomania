const http = require("http");
const app = require("./app");

const dotenv = require("dotenv");
dotenv.config();
const PORT = process.env.PORT;

app.set("port", PORT);
const server = http.createServer(app);
server.listen(3000);

console.log(`Listening on port ${server.address().port}`);
