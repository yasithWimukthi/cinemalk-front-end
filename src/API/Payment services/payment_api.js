import { create } from 'axios';

const instance = create({
    baseURL: 'http://localhost:8086/api/payment'
});


const payByCard = (data)=>{
    return instance.post("/payC",data)
}

const payByMobile = (data)=>{
    return instance.post("/payM",data)
}


const all ={
    payByCard,
    payByMobile
}

export default all;