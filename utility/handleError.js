exports.handleErrors=(err)=>{
    console.log(err.message,err.code);
    let errors={email:"",password:""};

    //duplicate error code
    if(err.code===11000)
    {
        errors.email="email already exists";
        return errors;
    }
    //validation errors
    if(err.message.includes('User validation failed'))
    {
        Object.values(err.errors).forEach(({properties})=>{
            errors[properties.path]=properties.message;
        });
    }
    return errors;
}