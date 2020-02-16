const router = require('express').Router();
var http = require('http').createServer(app);
var io = require('socket.io')(http);
const { DataStreamController } = ("../controllers/DataStreamController");
// import { Time } from '../models/Time';
const io = require('socket.io')(http);

class DataStreamRoute {


}

  public addNewContact (req: Request, res: Response) {                
          // let newContact = new Contact(req.body);
      
          // newContact.save((err, contact) => {
          //     if(err){
          //         res.send(err);
          //     }    
          //     res.json(contact);
          // });
 }
/*** 
GET datastream
***/
  
app.post('/', (req, res) => {
  res.send('Got a POST request:' + req.body.message);
  console.log("this is our post request from console: " + req.body.message);
  res.end();
});
  
  router.get('/', (req, res, next) => {
    console.log('start websockets connection...');
    res.send('Got a POST request:' + req.body.message);
    res.end();
  }) {
  
  

});

router.post('/', (req, res, next) => {
  
}) 



  // let transaction = new Transaction()
  // let date = new Date()
  // date.setHours(new Date().getHours() + 1)
  // transaction.code = 'TEST1234'
  // transaction.expiration = date
  // transaction.valid = true
  // res.json(transaction)
});

module.exports = realTimeRouter;