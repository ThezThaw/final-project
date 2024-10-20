import { AppUserVm } from "../model/AppUserVm";

export function setLoggedInUserInfo(userInfo?:AppUserVm){
    sessionStorage.setItem('userInfo', JSON.stringify(userInfo));
}

export function getLoggedInUserInfo(): AppUserVm | null {
    const raw = sessionStorage.getItem('userInfo');
    if(raw) return JSON.parse(raw);
    return null;
} 

export function removeLoggedInUserInfo() {
    sessionStorage.removeItem('userInfo');
} 

export function updateLoggedInUserInfo(userInfo?:AppUserVm) {
    removeLoggedInUserInfo();
    setLoggedInUserInfo(userInfo);
} 