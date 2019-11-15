const http = require('http');
const url = require('url');
const server = http.createServer();

server.listen(3000, () => {
  console.log('The HTTP server is listening at Port 3000.');
});

let messages = [
  { 'id': 1, 'user': 'brittany storoz', 'message': 'hi there!' },
  { 'id': 2, 'user': 'bob loblaw', 'message': 'check out my law blog' },
  { 'id': 3, 'user': 'lorem ipsum', 'message': 'dolor set amet' }
];

server.on("request", (request, response) => {
  if (request.method === "GET") {
    response.writeHead(200, { "Content-Type": "text/plain" });
    response.write(getAllMessages());
  } else if (request.method === "POST") {
    let newMessage = { id: new Date() };

    request.on("data", data => {
      newMessage = Object.assign(newMessage, JSON.parse(data));
    });

    request.on("end", () => {
      addMessage(newMessage, response);
    });
  }
  response.end();
});

const getAllMessages = () => {
  return messages;
};

const addMessage = (newMessage, response) => {
  console.log("response", response);
  return newMessage;
};