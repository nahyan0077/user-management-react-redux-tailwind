import axios from 'axios'
import {baseURL} from './constants/Constants'

const instance = axios.create({
    baseURL: baseURL,
  });

  export default instance
