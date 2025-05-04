
import { LOGIN_FAILURE, LOGIN_SUCCESS, REGISTER_FAILURE ,REGISTER_REQUEST,REGISTER_SUCCESS,LOGIN_REQUEST} from "./auth.actionType"
import { API_BASE_URL } from "../../config/api"
import axios from "axios"

export const loginUserAction=(loginData)=>async(dispatch)=>{
    try{

        const {data} = await axios.post(`${API_BASE_URL}/auth/signin`,loginData.data)

        console.log(data);

        if(data.jwt){
            localStorage.setItem("jwt",data.jwt)
        }

        console.log("login success")
        dispatch({type : LOGIN_SUCCESS,payload:data.jwt});

    }catch(error){

        console.log("-----------error----------",error);
        dispatch({type:LOGIN_FAILURE,payload:error})

        
    }
}

export const registerUserAction=(registerData)=>async(dispatch)=>{
    try{

        const {data} = await axios.post(`${API_BASE_URL}/auth/signup`,registerData.data)

        if(data.jwt){
            localStorage.setItem("jwt",data.jwt)
        }

        console.log("Register success");
        dispatch({type : REGISTER_SUCCESS,payload:data.jwt});

    }catch(error){

        console.log("-----------error----------",error);
        dispatch({type:REGISTER_FAILURE,payload:error})

        
    }
}