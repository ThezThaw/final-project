import { SignupOrEditVm } from '../model/SignupOrEditVm';
import * as httpService from '../service/HttpService';
import { NavigateFunction } from 'react-router-dom';
import { authService } from './AuthService';
import axios from 'axios';
import { getLoggedInUserInfo, updateLoggedInUserInfo } from './LoggedInUserInfoService';
import url from '../url.json';

export async function SignUp(vm: SignupOrEditVm, navigate: NavigateFunction){
    const signup_response = await httpService.post(url["signup"],vm);
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

            var updateUrl_response = await axios.post(url["update_profile_imgurl"], email);
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
}

// export async function UploadProfileImageToS3(s3url: string,image: FormData){
//     const response = await httpService.post(`${s3url}`,image);
//     return response;
// }

export async function UpdateProfile(vm: SignupOrEditVm){
    const update_response = await httpService.post(url["update_profile"],vm);
    if(update_response.status){
        let currentLoginUserInfo = getLoggedInUserInfo();
        if(currentLoginUserInfo){
            currentLoginUserInfo.name = vm.name;  
            updateLoggedInUserInfo(currentLoginUserInfo);                 
        }

        if(!vm.imgChanged) return update_response;

        if(vm.imgChanged && !update_response.s3PreSignedUrl) {
            if(currentLoginUserInfo){
                currentLoginUserInfo.img = null;  
                updateLoggedInUserInfo(currentLoginUserInfo);                 
            }
            return update_response;
        }

        await axios.put(`${update_response.s3PreSignedUrl}`, vm.imgFile, { 
            headers: { 
                'Content-Type': vm.profileImageType
            },
        })
        .then(async s3upload_response => {            

            let email = {
                "email": vm.email
            };

            var updateUrl_response = await axios.post(url["update_profile_imgurl"], email);
            if(updateUrl_response.data.status){
                if(currentLoginUserInfo){
                    currentLoginUserInfo.img = updateUrl_response.data.profileImageUrl;  
                    updateLoggedInUserInfo(currentLoginUserInfo);                 
                }
            }else{
                throw Error(updateUrl_response.data.message);
            }
        })
        .catch(err => {
            update_response.message = 'Fail to upload profile image to S3.';
            update_response.showWarning = true;
            return update_response;
        })
        .finally(async () => {
            //await authService.login(vm.email, vm.password || '', navigate);
            
        });
    }

    return update_response;
}