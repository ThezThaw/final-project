import { SignupOrEditVm } from '../model/SignupOrEditVm';
import * as httpService from '../service/HttpService';
import { NavigateFunction } from 'react-router-dom';
import { authService } from './AuthService';
import axios from 'axios';

export async function SignUp(vm: SignupOrEditVm, navigate: NavigateFunction){
    const signup_response = await httpService.post(`https://a5lzmspp13.execute-api.us-east-1.amazonaws.com/signup`,vm);
    if(signup_response.status){

        if(!vm.profileImageType) return await authService.login(vm.email, vm.password || '', navigate);

        await axios.put(`${signup_response.s3PreSignedUrl}`, vm.imgFile, { 
            headers: { 
                'Content-Type': vm.profileImageType
            },
        })
        .then(async s3upload_response => {

            let email = {
                "email": vm.email
            };

            var updateUrl_response = await axios.post(`https://v7qpmyy7ac.execute-api.us-east-1.amazonaws.com/update-profileimageurl`, email);
            if(!updateUrl_response.data.status){
                throw Error(updateUrl_response.data.message);
            }
        })
        .catch(err => {
            signup_response.message = 'Fail to upload profile image to S3.';
            signup_response.showWarning = true;
            return signup_response;
        })
        .finally(async () => {
            await authService.login(vm.email, vm.password || '', navigate);
        });
    }

    return signup_response;


    // return await httpService.post(`https://a5lzmspp13.execute-api.us-east-1.amazonaws.com/signup`,vm)
    // .then(async signup_response => {

    //         await axios.put(`${signup_response.s3PreSignedUrl}`, vm.imgFile, { 
    //             headers: { 
    //                 'Content-Type': vm.profileImageType
    //             },
    //         })
    //         .then(async s3upload_response => {

    //             let email = {
    //                 "email": vm.email
    //             };

    //             await axios.post(`https://v7qpmyy7ac.execute-api.us-east-1.amazonaws.com/update-profileimageurl`, email);

    //             const loginResponse = await authService.login(vm.email, vm.password || '', navigate);
    //             let r = {
    //                 status: loginResponse.status,
    //                 message: loginResponse.message
    //             }
    //             return r;
    //         })
    //         .catch(error => {
    //             throw Error(error);
    //         });
    // })
    // .catch(error => {
    //     let r = {
    //         status: false,
    //         message: error.message
    //     }
    //     return r;
    // });
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