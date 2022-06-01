const express = require('express');
const { Socket } = require('socket.io');
const app = express()
const http = require('http').createServer(app);
var peopleCount = 0

const PORT = process.env.PORT || 3000

http.listen(PORT, () =>{
    console.log(`listening on port ${PORT}`)
});

app.use(express.static(__dirname + '/public'))

app.get('/', (req, res) =>{
    res.sendFile(__dirname + '/index.html')
})

//socket

const io = require('socket.io')(http)

io.on('connection', (socket) =>{
        peopleCount++
    
      console.log('a user connected | connections: ' + peopleCount)
    
      socket.on('disconnect', function(){
    
        peopleCount--
    
      console.log('a user disconnected | connections: ' + peopleCount)
    
      });
      socket.on('message', (msg) =>{
          socket.broadcast.emit('message', msg)
    })
})
