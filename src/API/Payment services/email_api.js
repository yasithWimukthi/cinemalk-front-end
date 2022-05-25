import { create } from 'axios';

const instance = create({
    baseURL: 'http://localhost:4040/api'
});


const sendEmail = (data)=>{
    return instance.post("/email",data)
}



const all ={
    sendEmail
}

export default all;