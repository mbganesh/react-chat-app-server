import express from "express";
import http from 'http'
import cors from 'cors'
import { Server } from "socket.io";

const app = express()
app.use(cors())


const server = http.createServer(app)
const io = new Server(server , {
    cors:{
        methods:["GET" , "POST"],
        origin:"http://localhost:3000"
    }
})


io.on("connection" , (socket)=>{
    console.log(`Connected Id : ${socket.id}`);


    socket.on('join_room' , (data)=>{
        console.log(`Connected User ID : ${socket.id} , Joined Room ID : ${data}`);
    })

    socket.on('send_msg' , (data)=>{
        console.log(`message recieved from ${data.userDetails.userName} wid ${data.userDetails.roomId} , that msg ${data.message} `);
        socket.to(data.userDetails.roomId).emit("receive_msg" , {lol:data})
    })
  
    socket.on("disconnect" , ()=>{
        console.log(" disconnected  id : " ,  socket.id);
    })
})

server.listen(3001, ()=>{
    console.log("SERVER RUNNING AT PORT : 3001");
})