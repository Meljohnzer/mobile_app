import axios from "axios";
export const axiosRequest = axios.create({
  baseURL : "http://127.0.0.1:8000/"
});

export const server = "http://127.0.0.1:8000/files/"


//change the ipv4 address of your own ip address
