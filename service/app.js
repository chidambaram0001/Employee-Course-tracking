import express from 'express';
import mongoose from 'mongoose';
import fs from 'fs';

import users from './models/users.js';
import records from './models/userRecords.js';
const loadJSON = (path) => JSON.parse(fs.readFileSync(new URL(path, import.meta.url)));
// const usersData = loadJSON('../mainUser.json');
// const recordsData = loadJSON('../userDetails.json');

 var app = express();

 app.use(express.json());
 app.listen(3000,()=>{
   mongoose.connect('mongodb://root:root@mongo-vestas:27017/vestas?authSource=admin')
   console.log("service started")
   
})
app.use(function (req, res, next) {

   // Website you wish to allow to connect
   res.setHeader('Access-Control-Allow-Origin', '*');
   res.setHeader(`Access-Control-Allow-Methods`, `GET,PUT,POST,DELETE`);
   res.setHeader(`Access-Control-Allow-Headers`, `Content-Type`);

   next();
});

 mongoose.connection.on('connected',()=>{
    console.log("db connected")
  
var allData = [];
// usersData.root.employee.forEach((user) => {
//     var data = recordsData.root.records.filter(record => record.delegate_id === user.delegate_id)
//     user['recordDetails'] = data
//     allData.push(user)
//    });
   
   //addUser(allData) // for DB restore uncomment this code and start the service, only once! 
 })



 


var c =0;
var currentUsers = new users();
var record = new records();

currentUsers.cretaeModel()
record.createModel()


app.get('/users',(req,res)=>{
   // Retriving data with minimal query due to populate referencing
   //  currentUsers.collectionModel.find({}).populate({path:'userrecords'}).exec().then((data)=>{
   //     res.json(data)
    
   //  })

   currentUsers.collectionModel.aggregate([{
      $lookup:{
         from:'userrecords',
         localField:'delegate_id',
         foreignField:'delegate_id',
         as:'userrecords'
      }
   },
   {$unwind: '$userrecords'},
   {
     $project: {
      employeeId: 1, delegate_id: 1, userrecords:1
     }
   }]).exec().then((data)=>{
          res.json(data)
       
       })
 
})

app.get('/usDetail/:id',(req,res)=>{
   // Retriving data with minimal query due to populate referencing
   currentUsers.collectionModel.findOne({employeeId:req.params.id}).populate({path:'userrecords'}).exec().then((data)=>{
      
      res.json(data)
   
   })
});

app.post('/adduser',(req,res)=>{
   var userData = req.body;
    record.modelAddress.findOne({delegate_id:userData.delegate_id}).then((recordData)=>{
      if(recordData){
         res.json('Emp Id Available')
      }else{
         let recordModel = record.addRecord(userData.userrecords);
      recordModel.save();
      let saveModel = currentUsers.addData({ employeeId: userData.employeeId,
         delegate_id:userData.delegate_id,
         userrecords:recordModel._id
      });

      saveModel.save().then(t=>res.json(t))
      }
      
   })
  
})

app.delete('/deleteUser/:id/:delg_id',(req,res)=>{
   console.log(req.params.id)
   console.log(req.params.delg_id)
   currentUsers.collectionModel.deleteOne({employeeId:req.params.id}).then((data)=>{
      record.modelAddress.deleteOne({delegate_id:req.params.delg_id}).then((recordData)=>{
         res.json(recordData)
      })
   })
});
app.put('/updateUserDetail',(req,res)=>{
   var userData = req.body;
   currentUsers.collectionModel.deleteOne({employeeId:userData.employeeId}).then((data)=>{
      record.modelAddress.findOneAndDelete({delegate_id:userData.delegate_id}).then((recordData)=>{
               let recordModel = record.addRecord(userData.userrecords);
               recordModel.save();
               let saveModel = currentUsers.addData({ employeeId: userData.employeeId,
                  delegate_id:userData.delegate_id,
                  userrecords:recordModel._id
               });

               saveModel.save().then(t=>res.json(t))
            })
   })
   

});

// making entry to DB with user and userrecords usig mongose model reference
 function addUser(data){
   

    if(data.length !=0){
        var curData = data[0];
       


    let recordModel = record.addRecord(curData.recordDetails[0]);
    recordModel.save();


    let saveModel = currentUsers.addData({ employeeId: curData.employee_id,
        delegate_id:curData.delegate_id,
        userrecords:recordModel._id
    });


    saveModel.save().then((t)=>{
       data.shift()
       addUser(data)
    });
    }
    

    
}