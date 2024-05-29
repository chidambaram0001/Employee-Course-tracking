import mongoose from "mongoose";

export default class addresss{
    model={}
    registeredSchema = {}
    modelRecord = {};
    constructor(){
        this.model = {
            found: String,
            delegate_id: String,
            first_name: String,
            last_name: String,
            records:Array
        }
        this.registerSchema();
    }

    registerSchema(){
        this.registerSchema = new mongoose.Schema(this.model);
    }
    createModel(){
        this.modelAddress = mongoose.model('userrecords',this.registerSchema)
    }

    addRecord(data){
       return  new this.modelAddress(data);
    }
}