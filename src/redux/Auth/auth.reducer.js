import { LOGIN_FAILURE, LOGIN_REQUEST, LOGIN_SUCCESS,REGISTER_FAILURE,REGISTER_REQUEST,REGISTER_SUCCESS } from "./auth.actionType"


const intialState = {

    jwt:null,
    error:null,
    loading:false
,
}

export const authReducer = (state=intialState,action)=>{
    switch(action.type){
        case LOGIN_REQUEST:
            return {...state,loading:true,error:null}
        case LOGIN_SUCCESS:
            return {...state,jwt:action.payload,loading:false,error:null}
        case LOGIN_FAILURE:
            return {...state,loading:false,error:action.payload}
        case REGISTER_REQUEST:
            return {...state,loading:true,error:null}
        case REGISTER_SUCCESS:
            return {...state,jwt:action.payload,loading:false,error:null}
        case REGISTER_FAILURE:
            return {...state,loading:false,error:action.payload}
        default:
            return state;
    }
}