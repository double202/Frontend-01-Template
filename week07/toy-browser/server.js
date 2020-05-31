const http = require("http");

const server = http.createServer((req, res) => {
    console.log("server started!!!");
    console.log(req.headers);
    res.setHeader("Content-Type", "text/html");
    res.setHeader("X-Foo", "bar");
    res.writeHead(200, { "Content-Type": "text/html" });
    res.end(
`<html maaa=a >
<head>
<style>
.wrapper {
  display: flex;
  width: 800px;
  height: 600px;
  background-color: rgb(255,255,255);
}
.container {
  display: flex;
  width: 500px;
  height: 500px;
  background-color: rgb(255,0,0);
  justify-content: center;
  align-items: center;
}
.item1 {
  display: flex;
  width: 200px;
  height: 200px;
  justify-content: center;
  background-color: rgb(0,255,0);
}
.item2 {
  display: flex;
  width: 200px;
  height: 200px;
  background-color: rgb(0,0,255);
  align-self: flex-end;
}
</style>
</head>
<body>
  <div id="id" class="wrapper">
    <div class="container">
      <div class="item1"></div>
      <div class="item2"></div>
    </div>
    <img id="myid"/>
    <img />
  </div>
</body>
</html>`);
}).listen(8088);

