import axios from 'axios';

const instance = axios.create({

  baseURL: 'https://reactjs-my-burger-378ae.firebaseio.com/'
});

export default instance;
