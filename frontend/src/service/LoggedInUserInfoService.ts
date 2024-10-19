import { AppUserVm } from "../model/AppUserVm";

export function setLoggedInUserInfo(userInfo?:AppUserVm){
    sessionStorage.setItem('userInfo', JSON.stringify(userInfo));
}

export function getLoggedInUserInfo(): AppUserVm | null {
    const raw = sessionStorage.getItem('userInfo');
    if(raw) return JSON.parse(raw);
    return null;
} 