import http from "http";
import app from "./app.js";
import { initSocket } from "./config/socket.js";

const server = http.createServer(app);

server.listen(process.env.EXPRESS_PORT || 5000, async () => {
  await initSocket(server);
  console.log(`Server running on port ${process.env.EXPRESS_PORT || 5000}`);
});
