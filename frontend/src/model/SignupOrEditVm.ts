export interface SignupOrEditVm{
    email:string;
    name: string;
    img?:string | FormData | null;
    password?: string | null;
    newPassword?: string | null;
    imgChanged: boolean;
    profileImageType?: string;
    // profileImageName?: string;
    imgFile?: File | Blob | undefined;
}