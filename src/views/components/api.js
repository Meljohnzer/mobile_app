import axios from "axios";
export const axiosRequest = axios.create({
  baseURL : "https://hanapp.pythonanywhere.com/"
});

export const server = "https://hanapp.pythonanywhere.com/backend/static/files/"


//change the ipv4 address of your own ip address
