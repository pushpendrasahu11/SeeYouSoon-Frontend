
import { LOGIN_FAILURE, LOGIN_SUCCESS, REGISTER_FAILURE ,REGISTER_REQUEST,REGISTER_SUCCESS,LOGIN_REQUEST, GET_PROFILE_SUCCESS, GET_PROFILE_FAILURE, GET_PROFILE_REQUEST, UPDATE_PROFILE_REQUEST, UPDATE_PROFILE_SUCCESS, UPDATE_PROFILE_FAILURE} from "./auth.actionType"
import { api, API_BASE_URL } from "../../config/api"
import axios from "axios"

export const loginUserAction=(loginData)=>async(dispatch)=>{
    dispatch({type:LOGIN_REQUEST})
    try{

        const {data} = await axios.post(`${API_BASE_URL}/auth/signin`,loginData.data)

        console.log(data);

        if(data.token){
            localStorage.setItem("jwt",data.token)
        }

        console.log("login success")
        dispatch({type : LOGIN_SUCCESS,payload:data.token});

    }catch(error){

        console.log("-----------error----------",error);
        dispatch({type:LOGIN_FAILURE,payload:error})

        
    }
}

export const registerUserAction=(registerData)=>async(dispatch)=>{
    dispatch({type:REGISTER_REQUEST})
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

export const getProfileAction=(jwt)=>async(dispatch)=>{
    dispatch({type: GET_PROFILE_REQUEST});
    try{

        const {data} = await axios.get(
            `${API_BASE_URL}/api/users/profile`,
            {
                headers:{
                    "Authorization":`Bearer ${jwt}`
                },
            }
        );

        

        console.log("user profile ", data);
        dispatch({type : GET_PROFILE_SUCCESS,payload:data});

    }catch(error){

        console.log("-----------error----------",error);
        dispatch({type:GET_PROFILE_FAILURE,payload:error})

        
    }
}

export const updateProfileAction=(reqData)=>async(dispatch)=>{
    dispatch({type: UPDATE_PROFILE_REQUEST});
    try{

        const {data} = await api.put(
            `${API_BASE_URL}/api/users`,reqData
        );

        

        console.log("user profile update", data);
        dispatch({type : UPDATE_PROFILE_SUCCESS,payload:data.jwt});

    }catch(error){

        console.log("-----------error----------",error);
        dispatch({type:UPDATE_PROFILE_FAILURE,payload:error})

        
    }
}