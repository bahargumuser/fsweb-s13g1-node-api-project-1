const server = require("./api/server");

const port = 9000;

console.log("Hello word");
// START YOUR SERVER HERE

server.listen(port, () => {
  console.log("Server is listening on" + port);
});
