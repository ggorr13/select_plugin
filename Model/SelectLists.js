import pkg from "mongoose";
const {Schema,model} = pkg;

const schema = new Schema({
    label:{type:String,required:true,unique:true}
})

export default model('SelectLists',schema)