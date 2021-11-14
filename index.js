// const http = require("http");
// const fs = require("fs").promises;

// const PORT = 8081;
// const requestHandler = async (request, response) => {
//   const manifest = await fs.readFile("./package.json", "utf8");
//   //   response.writeHead(200, { "Content-type": "text/html" });
//   //   response.end("<h1>GOIT</h1>");
//   //   response.writeHead(200, { "Content-type": "text/json" });
//   //   response.end(JSON.stringify({ a: 1, b: [] }));

//   //   if (request.url.indexOf("/home") >= 0) {
//   //     response.writeHead(200, { "Content-type": "text/json" });
//   //     return response.end('{"url": "homepage"}');
//   //   }
//   response.writeHead(200, { "Content-type": "text/json" });
//   return response.end(manifest);
// };

// const server = http.createServer(requestHandler);

// server.listen(PORT, (err) => {
//   if (err) {
//     console.error(" Error at aserver launch: ", err);
//   }
//   console.log(`Server works at port ${PORT}!`);
// });

// то самое но через Express:

const express = require("express");
const morgan = require("morgan");
const app = express();
const PORT = 8081;
app.use(express.json());
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true })); //парсить текст з html
app.use(morgan("tiny"));

// app.use((req, res, next) => {
//   console.log(`${req.method}, ${req.originalUrl}, ${new Date().toISOString()}`);
//   next();
// });
app.post("/home", (req, res) => {
  if (!req.body.GOIT) {
    return res.status(400).json({ status: "goit parameter" });
  }
  console.log(req.body);
  res.json({ javascript: "object", body: req.body });
});

// app.get("/home", (req, res) => {
//   res.status(500).json({ javascript: "object" });
// });

// app.get("/home", (req, res) => {
//   res.send("get request");
// });

// app.post("/home", (req, res) => {
//   res.send("post request");
// });

// app.delete("/home", (req, res) => {
//   res.send("delete request");
// });

// app.use((req, res) => {
//   res.send("middleware request");
// });
app.listen(PORT, (err) => {
  if (err) {
    console.error(" Error at aserver launch: ", err);
  }
  console.log(`Server works at port ${PORT}!`);
});
