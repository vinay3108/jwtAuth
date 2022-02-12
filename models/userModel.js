const mongoose=require('mongoose');
const {isEmail}=require('validator');
const bcrypt=require('bcrypt');

const userSchema=new mongoose.Schema({
    email:{
        type:String,
        required:[true,'please enter email'],
        unique:true,
        lowercase:true,
        validate:[isEmail,"please enter a valid email"]
    },
    password:{
        type:String,
        required:[true,'please enter password'],
        minlength:[6,'password should be greater than 5']
    }
});


userSchema.pre('save',async function(next){
    const salt=await bcrypt.genSalt();
    this.password=await bcrypt.hash(this.password,salt);
    next();
})
// userSchema.post('save',(doc,next)=>{
//     console.log("user saved succesfully in db",doc);
//     next();
// })
//static method to login user
userSchema.statics.login=async(email,password)=>{
    const user=await User.findOne({email});
    if(user)
    {
        const auth=await bcrypt.compare(password,user.password);
        if(auth)
        {
            return user;
        }
        throw Error ("Incorrect Password");
        
    }
    throw Error("Invalid User")

}
const User=mongoose.model("User",userSchema);


module.exports=User;