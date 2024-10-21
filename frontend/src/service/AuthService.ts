import * as httpService from "./HttpService";
import { NavigateFunction } from "react-router-dom";
import { LoginRequestVm } from "../model/LoginVm";
import * as loggedInUserInfoService from '../service/LoggedInUserInfoService';
import { AppUserVm } from "../model/AppUserVm";

function isLoggedIn(){
    const info = loggedInUserInfoService.getLoggedInUserInfo();
    if(info) return true;
    return false;
}

async function login(email:string, password: string, navigate: NavigateFunction){
    let vm: LoginRequestVm = {
        email:email,
        password:password
    }    
    let response = await httpService.post('https://y34xdwob09.execute-api.us-east-1.amazonaws.com/demo-login',vm);
    if(response.status){
        loggedInUserInfoService.setLoggedInUserInfo(response.loggedInUserInfo as AppUserVm);
    }
    return response;
}

async function logout(navigate: NavigateFunction){
    loggedInUserInfoService.removeLoggedInUserInfo();
    navigate('/login');
}

export const authService  = {
    login: login,
    logout: logout,
    isLoggedIn: isLoggedIn
}