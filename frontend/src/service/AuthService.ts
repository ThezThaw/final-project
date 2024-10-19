import * as httpService from "./HttpService";
import { NavigateFunction } from "react-router-dom";
import { LoginRequestVm } from "../model/LoginVm";
import * as loggedInUserInfoService from '../service/LoggedInUserInfoService';
import { AppUserVm } from "../model/AppUserVm";

function isLoggedIn(){
    return true;
}

async function login(email:string, password: string, navigate: NavigateFunction){
    let vm: LoginRequestVm = {
        email:email,
        password:password
    }    
    let response = await httpService.post('https://t9ifvun77l.execute-api.us-east-1.amazonaws.com/login',vm);
    if(response.status){
        loggedInUserInfoService.setLoggedInUserInfo(response.loggedInUserInfo as AppUserVm);
    }
    return response;
}

async function logout(navigate: NavigateFunction){
    navigate('/login');
}

export const authService  = {
    login: login,
    logout: logout,
    isLoggedIn: isLoggedIn
}