const http = require("http");
const fs = require("fs");
const url = require("url");

const myServer = http.createServer((req, res) => {
  let date = new Date().toUTCString();
  const Url = url.parse(req.url, true);

  console.log(Url);

  let logs = `Time : ${date} - request on endpoint ${req.headers.host} ${req.url} \n`;

  if (req.url === "/favicon.ico") return res.end();
  fs.appendFile("logs.txt", logs, (error, result) => {
    if (error) {
      console.log(error);
    } else {
      res.end("Happy Hacking!!");
    }
  });

  switch (Url.pathname) {
    case "/about":
      const username = Url.query.myname;
      res.end(`${username} | Backend Developer`);
      break;
    case "/contact":
      res.end("@codeguyakash | contact ");
      break;
    case "/social":
      res.end("@codeguyakash | social");
      break;
    case "/search":
      const search = Url.query.search_query;
      res.end("Your Search Results " + search);
      break;
    case "/logs":
      const log = fs.readFileSync("logs.txt", "utf-8");
      res.end(log);

      break;
    default:
      res.end("404 | Not Found");
      break;
  }
});

myServer.listen(8000, () => {
  console.log(`Server Running http://localhost:8000`);
});
