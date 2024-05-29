import mongoose from "mongoose";


export default class users{
     model = {};
     schema;
     collectionModel;
    constructor(){
        this.model = {
            employeeId: String,
            delegate_id: String,
            userrecords: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'userrecords'
            }
        }
        this.registerSchema();
    }

    registerSchema(){
        this.schema = new mongoose.Schema(this.model, {
            strictPopulate: false
        });
        
    }
    cretaeModel(){
       this.collectionModel = mongoose.model('users',this.schema);
    }
    addData(data){
        return new this.collectionModel(data)
    }
}