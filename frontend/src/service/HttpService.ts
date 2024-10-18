// import { PogHttpStatusCode } from "../Helper/AppEnum";
// import { CommonResponseVm } from "../model/CommonResponseVm";
// import { authService } from "./AuthService";


export async function get<T>(endpoint:string, param:any){
    let baseUrl = process.env.REACT_APP_BASE_URL;
    return await fetch(`${baseUrl}${endpoint}`,{
        method: 'GET',
        // headers: {
        //     'Authorization': `bearer ${authService.getToken()}`
        // }
    })
    .then(async (response) => {
        if(response.ok){
            let result = await response.json();
            return result;// as CommonResponseVm<T>;

        }else{
            throw Error(response.statusText);
        }
    })
    .catch((error) => {
        console.error(error);
        // let r: CommonResponseVm<T> = {
        //     status: false,
        //     message: error,
        //     statuscode: PogHttpStatusCode.SERVER_ERROR
        // }
        // return r;
        return error;
    })
    .finally(() => console.log("reached finally get"))
}

export async function post<T>(endpoint:string, param:any){
    return await fetch(`${endpoint}`,{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(param)
    })
    .then(async (response) => {
        if(response.ok){
            debugger;
            let result = await response.json();
            return result;// as CommonResponseVm<T>;

        }else{
            throw Error(response.statusText);
        }
    })
    .catch((error: TypeError) => {
        console.error('HttpService -> post -> ',error)
        // let r: CommonResponseVm<T> = {
        //     status: false,
        //     message: error.message,
        //     statuscode: PogHttpStatusCode.SERVER_ERROR
        // }
        // return r;
        return error;
    })
}