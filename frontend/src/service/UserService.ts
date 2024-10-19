import { SignupOrEditVm } from '../model/SignupOrEditVm';
import * as httpService from '../service/HttpService';
import { NavigateFunction } from 'react-router-dom';
import { authService } from './AuthService';

export async function SignUp(vm: SignupOrEditVm, navigate: NavigateFunction){
    const response = await httpService.post(`https://a5lzmspp13.execute-api.us-east-1.amazonaws.com/signup`,vm);
    if(response.status){
        const loginResponse = await authService.login(vm.email, vm.password || '', navigate);
        return loginResponse;
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