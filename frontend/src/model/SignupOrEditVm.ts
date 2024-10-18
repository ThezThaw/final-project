export interface SignupOrEditVm{
    email:string;
    name: string;
    img?:string | null;
    password?: string | null;
    newPassword?: string | null;
    imgChanged: boolean;
}