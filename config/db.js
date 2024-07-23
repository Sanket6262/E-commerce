const mongoose = require ("mongoose");


async function connectDB(){
try{
await mongoose.connect("mongodb+srv://omshelar09:Om07@cluster0.1rx1bwy.mongodb.net/E_Commerce");
console.log("Connection succesful");
}catch(error){
console.log("error in connection", error);
}
}
module.exports= {connectDB};