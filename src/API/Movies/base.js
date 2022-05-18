import { create } from 'axios';

const instance = create({
    baseURL: 'http://localhost:8090/api/movies'
  });


export default instance