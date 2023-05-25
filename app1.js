const express = require('express');
const WebSocket = require('ws');
const http = require('http');
const path = require('path');


const app = express();
app.use(express.json());
app.use(express.static('front-end'));

app.get('/group', (req, res) => {
  res.sendFile(path.join(__dirname, 'front-end/index.html'));
});

const port = 3005;
const server = app.listen(port, function () {
  console.log(`server 1 running on port ${port}!`);
});

const wss = new WebSocket.Server({server});

wss.on('connection',(ws)=>{
  ws.on('message',(message)=>{
    let s = JSON.parse(message);
    console.log("received message ",JSON.parse(message));
    wss.clients.forEach((client)=>{
      if(client!=ws&&client.readyState == WebSocket.OPEN){
        client.send(JSON.stringify(s));
      }
    })
  })
})


