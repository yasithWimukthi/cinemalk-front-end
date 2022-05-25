import { create } from 'axios';

const instance = create({
    baseURL: 'http://localhost:8000/api'
});


const sendSms = (data)=>{
    return instance.post("/sms",data)
}



const all ={
    sendSms
}

export default all;