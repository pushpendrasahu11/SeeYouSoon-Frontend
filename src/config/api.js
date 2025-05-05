import axios from "axios";

export const API_BASE_URL = "http://localhost:5000";

const jwtToken = localStorage.getItem("jwt");

export const api = axios.create({baseURL:API_BASE_URL,
headers:{
    "Authorization" : `Bearerr ${jwtToken}`,
    "Content-Type":"application/json"
}})