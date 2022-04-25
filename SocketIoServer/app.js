const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const port = process.env.PORT || 3000;

let context;

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', (socket) => {
  console.log("A USER Connected");

  // socket.send(JSON.stringify({
  //   type: "context",
  //   context: context
  // }));

  socket.on('drawed', draw => {
    context=draw.context;
    io.emit('drawed', draw);
    console.log(draw.canvas);
  });
});

http.listen(port, () => {
  console.log(`Socket.IO server running at http://localhost:${port}/`);
});