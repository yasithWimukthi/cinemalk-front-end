import http from "./base";




const SignUp = (data)=>{
    return http.post("/signup",data);
}

const SignIn = (data)=>{
    return http.post("/login",data)
}


const all ={
    SignUp,
    SignIn
}

export default all;