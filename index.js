const http = require("http");
const fs = require("fs");

const myServer = http.createServer((req, res) => {
  let logs = `${Date.now().toLocaleString()} - ${req.url} Request Received \n`;
  fs.appendFile("logs.txt", logs, (error, result) => {
    if (error) {
      console.log(error);
    } else {
      res.end("Happy Hacking!!");
    }
  });
});

myServer.listen(8000, () => {
  console.log(`Server Running http://localhost:8000`);
});
