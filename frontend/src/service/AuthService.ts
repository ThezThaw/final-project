import * as httpService from "./HttpService";
import { NavigateFunction } from "react-router-dom";
import { LoginRequestVm } from "../model/LoginVm";
import * as loggedInUserInfoService from '../service/LoggedInUserInfoService';
import { AppUserVm } from "../model/AppUserVm";
import url from '../url.json';

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

    let response = await httpService.post(url["login"],vm);
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