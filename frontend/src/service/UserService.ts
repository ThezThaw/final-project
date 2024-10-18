import { SignupOrEditVm } from '../model/SignupOrEditVm';
import * as httpService from '../service/HttpService';
import { NavigateFunction } from 'react-router-dom';

// export async function SignUp(vm: SignupOrEditVm, navigate: NavigateFunction){
export async function SignUp(vm: SignupOrEditVm){
    const response = await httpService.post(`https://a5lzmspp13.execute-api.us-east-1.amazonaws.com/signup`,vm);
    if(response.status){
        // const loginResponse = await authService.login(vm.loginId, vm.newPassword || '', navigate);
        // return loginResponse;

        debugger;
    }
    return response;
}

export async function UpdateProfile(vm: SignupOrEditVm){
    // const response = await httpService.post<AppUserVm>(`user/update_profile`,vm);
    // if(response.status){
    //     loggedInUserInfoService.setLoggedInUserInfo(response.data);
    // }
    // return response;
}