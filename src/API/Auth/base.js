import { create } from 'axios';

const instance = create({
    baseURL: 'http://localhost:4001/api/auth'
  });


export default instance