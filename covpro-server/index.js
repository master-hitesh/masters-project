const express = require("express"),
  http = require("http"),
  bodyParser = require("body-parser"),
  cors = require("cors");

const hostname = "localhost";
const port = 3000;

const app = express();
const userRoutes = require("./user/user.route");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

app.use("/api/user/", userRoutes);

app.use((req, res, next) => {
  console.log(req.headers);
  res.statusCode = 200;
  res.setHeader("Content-Type", "text/html");
  res.end("<html><body><h1>This is an Express Server</h1></body></html>");
});

const server = http.createServer(app);

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
