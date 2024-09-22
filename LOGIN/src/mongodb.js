const mongoose = require("mongoose")

mongoose.connect("mongodb://localhost:27017/UserCredentials")
.then(()=> {
    console.log("MongoDB Connected");
})
.catch(()=>{
    console.log("Failed to Connect");
}) 

const CredentialSchema = new mongoose.Schema({
    username:{
        type:String,
        required:[true, 'Username is required.'],
        trim: true,
     }, 
    email:{
        type: String,
        required: [true, 'Email is required.'],
        unique: true,
        trim: true,
        lowercase: true,
     },
     password:{
        type: String,
        required: [true, 'Password is required.'],
     }
})


    const collection = new mongoose.model("Userdata",CredentialSchema);

    module.exports=collection