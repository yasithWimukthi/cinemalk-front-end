import http from "./base";

/**
 * @description: signup
 * @param {type}
 * @return:
 */
const SignUp = (data)=>{
    return http.post("/signup",data);
}

/*
 * @description: login
 * @param {type}
 */
const SignIn = (data)=>{
    return http.post("/login",data)
}


const all ={
    SignUp,
    SignIn
}

export default all;