import { SignupOrEditVm } from '../model/SignupOrEditVm';
import * as httpService from '../service/HttpService';
import { NavigateFunction } from 'react-router-dom';
import { authService } from './AuthService';
import axios from 'axios';

export async function SignUp(vm: SignupOrEditVm, navigate: NavigateFunction){
    const response = await httpService.post(`https://a5lzmspp13.execute-api.us-east-1.amazonaws.com/signup`,vm);
    if(response.status){

        await axios.put(`${response.s3PreSignedUrl}`, vm.imgFile, { 
            headers: { 
                'Content-Type': vm.profileImageType
            },
        })
        .then(async r => {
            const loginResponse = await authService.login(vm.email, vm.password || '', navigate);
            return loginResponse;
        })
        .catch(err => {
            return err;
        });
    }
    return response;
}

export async function UploadProfileImageToS3(s3url: string,image: FormData){
    const response = await httpService.post(`${s3url}`,image);
    return response;
}

export async function UpdateProfile(vm: SignupOrEditVm){
    // const response = await httpService.post<AppUserVm>(`user/update_profile`,vm);
    // if(response.status){
    //     loggedInUserInfoService.setLoggedInUserInfo(response.data);
    // }
    // return response;
}