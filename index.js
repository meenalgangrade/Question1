const express = require('express');
const app = express();
const schedule = require('node-schedule');
const request = require('request');

schedule.scheduleJob('0 0 0 ? * * *', function(){
    let options = {
        url: 'http://localhost:3000/zendeskAuth',
        auth: {
          user: "username",
          password: "password"
        }
      }
      
      request(options, function (err, res, body) {
        if (err) {
          console.dir(err)
          return
        }
        const token = res.token;  //we have assumed access token to be returning in response object
        request({'url':'http://localhost:3000/zendeskGetTickets','headers':{'authorization' : 'bearer '+  token}}, function(err,res,body){
            let tickets = res.tickets;
            console.log(tickets);
        })
      })
  });

app.get('/zendeskAuth', async(req,res)=>{
    res.send('Token');
});


app.get('/zendeskGetTickets', async(req,res)=>{
    res.send(JSON.stringify({'tickets':['ticket1', 'ticket2']}));
});


app.listen(3000,()=>{
    console.log("Server running on port 3000");
})
