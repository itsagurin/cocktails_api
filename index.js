// server.js
import http from "http";
import app from "./app.js";

const server = http.createServer(app);

server.listen(4000, () => {
    console.log('server running at http://localhost:4000');
});
