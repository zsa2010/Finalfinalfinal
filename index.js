
//Image Guess 
const { response } = require('express');
const express = require('express')
let app = express()
app.use(express.json())
//DB initial code
let Datastore = require('nedb');
let db = new Datastore('response1.db');
db.loadDatabase();

//Socket Code
const http = require('http');
const server = http.createServer(app);
const { Server } = require('socket.io');
const io = new Server(server);


app.use('/', express.static('public'))

app.post('/submission', (req, res) => {
	console.log(req.body)
    //inserting the users responses into the database
    db.insert(response, (err, newDocs)=> {
     console.log(newDocs)
    })
    db.find ({}, (err, docs)=>{
    if (err){
        res.json({task: 'task failed'})
    }else{
            res.json({task: docs})
        }
    })
       
    })
        
        //console.log('new document inserted');
      
        //console.log(docs);
      
//game route 

app.get('/game',(req, res) =>{

} )

const port = process.env.PORT || 3000
server.listen(port, () => {
	console.log('listening at ', port)
})

//Socket Chat Box Code
io.on('connection', (socket) => {
    socket.on('msg', function(data) {
        //Data can be numbers, strings, objects
        console.log("Received a 'msg' event");
        console.log(data);

        //Send a response to all clients, including this one
        io.emit('msg', data);

        //Send a response to all other clients, not including this one
        // socket.broadcast.emit('msg', data);

        //Send a response to just this client
        // socket.emit('msg', data);
    });
    console.log('a user connected');
  });


